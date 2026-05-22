"""
check_status.py — Verifica se os dashboards rodaram hoje e publica status.json no GitHub.

Lê os logs de cada dashboard, determina o status do dia e faz git push.
Deve rodar às 09:30 e 11:30 (após os scripts de 09h e 11h).

Uso: python check_status.py
"""
import json, re, sys, io, subprocess, logging
from pathlib import Path
from datetime import datetime, date

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

HUB_DIR    = Path(r"C:\Users\jefnogueira\Desktop\Arquivos Claude\hub-cartoes")
STATUS_FILE = HUB_DIR / "status.json"
LOG_FILE   = Path(r"C:\Users\jefnogueira\logs\hub_cartoes.log")

LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(message)s",
    handlers=[
        logging.FileHandler(LOG_FILE, encoding="utf-8"),
        logging.StreamHandler(sys.stdout),
    ],
)
log = logging.getLogger(__name__)

TODAY = date.today().isoformat()  # "2026-05-22"

# ── Configuração dos dashboards monitorados ─────────────────────────────────
DASHBOARDS = [
    {
        "id": "td_indicadores",
        "name": "TD Indicadores",
        "log": Path(r"C:\Users\jefnogueira\Desktop\Arquivos Claude\td-indicadores-dash\gcs_publish.log"),
        "ok_pattern":  r"(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}).*?(Publicacao concluida|GCS publicado)",
        "warn_pattern": r"(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}).*?(Grid nao atualizado|AVISO)",
        "err_pattern":  r"(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}).*?(ERRO|ERROR|FATAL)",
    },
    {
        "id": "cartoes_expirados",
        "name": "Cartões Expirados",
        "log": Path(r"C:\Users\jefnogueira\logs\cartoes_expirados.log"),
        "ok_pattern":  r"\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] SUCESSO",
        "warn_pattern": r"\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] SESSAO_GRID_EXPIRADA",
        "err_pattern":  r"\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] ERRO",
    },
    {
        "id": "controle_plastico",
        "name": "Controle de Plástico",
        "log": Path(r"C:\Users\jefnogueira\logs\controle_plastico.log"),
        "ok_pattern":  r"(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}).*?Publicação concluída",
        "warn_pattern": r"(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}).*?SESSAO_GRID_EXPIRADA",
        "err_pattern":  r"(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}).*?(ERROR|ERRO FATAL)",
    },
]


def parse_log(cfg: dict) -> dict:
    """Lê o log e retorna o status mais recente de hoje."""
    log_path = cfg["log"]
    result = {"status": "missed", "last_run": None, "message": "Não rodou hoje"}

    if not log_path.exists():
        result["message"] = "Log não encontrado"
        return result

    text = log_path.read_text(encoding="utf-8", errors="replace")
    lines_today = [l for l in text.splitlines() if TODAY in l]

    if not lines_today:
        result["message"] = "Não rodou hoje"
        return result

    # Verifica status na ordem: ok > warn > err (pega o mais recente de cada)
    last_ok   = _last_match(lines_today, cfg["ok_pattern"])
    last_warn = _last_match(lines_today, cfg["warn_pattern"])
    last_err  = _last_match(lines_today, cfg["err_pattern"])

    # Determina o status final com base nos matches encontrados hoje
    if last_ok:
        result["status"]   = "ok"
        result["last_run"] = last_ok["ts"]
        result["message"]  = last_ok["excerpt"]
        # Mas se depois do OK teve um erro, downgrade
        if last_err and last_err["ts"] > last_ok["ts"]:
            result["status"]  = "error"
            result["last_run"] = last_err["ts"]
            result["message"] = last_err["excerpt"]
    elif last_warn:
        result["status"]   = "warning"
        result["last_run"] = last_warn["ts"]
        result["message"]  = "Sessão Grid expirada · BQ/GCS ok"
    elif last_err:
        result["status"]   = "error"
        result["last_run"] = last_err["ts"]
        result["message"]  = last_err["excerpt"]

    return result


def _last_match(lines: list[str], pattern: str) -> dict | None:
    """Retorna o último match do padrão nas linhas, com timestamp e trecho."""
    found = None
    for line in lines:
        m = re.search(pattern, line)
        if m:
            ts_str = m.group(1)
            try:
                ts = datetime.strptime(ts_str, "%Y-%m-%d %H:%M:%S").strftime("%H:%M")
            except ValueError:
                ts = ts_str[11:16]
            found = {"ts": ts, "excerpt": line.strip()[-80:]}
    return found


def build_status() -> dict:
    dashboards = {}
    for cfg in DASHBOARDS:
        log.info(f"Verificando {cfg['name']}...")
        dashboards[cfg["id"]] = {
            "name": cfg["name"],
            **parse_log(cfg),
        }
    return {
        "date": TODAY,
        "generated_at": datetime.now().strftime("%Y-%m-%dT%H:%M:%S"),
        "dashboards": dashboards,
    }


def git_push(status: dict):
    STATUS_FILE.write_text(json.dumps(status, ensure_ascii=False, indent=2), encoding="utf-8")
    log.info(f"status.json gerado: {STATUS_FILE}")

    # Conta quantos estão ok
    oks = sum(1 for d in status["dashboards"].values() if d["status"] == "ok")
    total = len(status["dashboards"])

    try:
        subprocess.run(["git", "-C", str(HUB_DIR), "add", "status.json"], check=True)
        result = subprocess.run(
            ["git", "-C", str(HUB_DIR), "diff", "--cached", "--stat"],
            capture_output=True, text=True
        )
        if "status.json" not in result.stdout:
            log.info("status.json sem mudanças desde o último push — nada a commitar.")
            return

        msg = f"status: {TODAY} — {oks}/{total} ok"
        subprocess.run(["git", "-C", str(HUB_DIR), "commit", "-m", msg], check=True)
        subprocess.run(["git", "-C", str(HUB_DIR), "pull", "--rebase", "origin", "main"],
                       check=True, capture_output=True)
        subprocess.run(["git", "-C", str(HUB_DIR), "push"], check=True)
        log.info(f"Push OK: {msg}")
    except subprocess.CalledProcessError as e:
        log.error(f"Erro no git: {e}")


if __name__ == "__main__":
    log.info("=" * 50)
    log.info(f"check_status.py — {datetime.now().strftime('%d/%m/%Y %H:%M')}")
    status = build_status()
    for dash_id, d in status["dashboards"].items():
        icon = {"ok": "✅", "warning": "⚠️", "error": "❌", "missed": "🔴"}.get(d["status"], "❓")
        log.info(f"  {icon} {d['name']}: {d['status']} — {d['message']}")
    git_push(status)
    log.info("=" * 50)
