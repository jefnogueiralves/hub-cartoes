"""
atualizar_e_publicar.py — Pipeline completo: BQ → HTML inline → Grid
Executado automaticamente pelo Agendador de Tarefas do Windows.

Uso:
  python atualizar_e_publicar.py              # execucao normal
  python atualizar_e_publicar.py --renew-session  # renovar sessao Okta
"""
import argparse
import re
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path

# ── CAMINHOS ──────────────────────────────────────────────────────────────────
BASE_DIR    = Path(__file__).parent.parent
SCRIPTS_DIR = BASE_DIR / "scripts"
OUTPUT_DIR  = BASE_DIR / "output"
LOG_FILE    = Path("C:/Users/jefnogueira/logs/cartoes_expirados.log")
CREDS_FILE  = BASE_DIR / "grid_credentials.txt"
HTML_SRC    = BASE_DIR / "index.html"
DATA_JS     = BASE_DIR / "dashboard_data.js"
HTML_OUT    = OUTPUT_DIR / "cartoes_expirados_grid.html"

PYTHON      = sys.executable
GRID_BASE   = "https://grid.adminml.com"

# ── LOG ────────────────────────────────────────────────────────────────────────
def log(msg):
    ts   = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    line = f"[{ts}] {msg}"
    print(line.encode(sys.stdout.encoding or "utf-8", errors="replace").decode(sys.stdout.encoding or "utf-8"))
    LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(line + "\n")


# ── CREDENCIAIS ────────────────────────────────────────────────────────────────
def load_creds():
    creds = {}
    if not CREDS_FILE.exists():
        log("ERRO: grid_credentials.txt nao encontrado")
        return "", ""
    for line in CREDS_FILE.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
            creds[k.strip()] = v.strip()
    return creds.get("DOCUMENT_ID", ""), creds.get("SESSION_ID", "")


def save_session(session_id):
    text = CREDS_FILE.read_text(encoding="utf-8")
    text = re.sub(r"SESSION_ID=.*", f"SESSION_ID={session_id}", text)
    CREDS_FILE.write_text(text, encoding="utf-8")
    log(f"SESSION_ID atualizado: {session_id[:25]}...")


# ── ETAPA 1: BIGQUERY ─────────────────────────────────────────────────────────
def run_bq_update():
    log("--- ETAPA 1: Atualizando dados do BigQuery ---")
    update_script = SCRIPTS_DIR / "update_data.py"
    if not update_script.exists():
        log("AVISO: update_data.py nao encontrado. Usando dados existentes.")
        return False

    result = subprocess.run(
        [PYTHON, str(update_script)],
        capture_output=True, text=True,
        timeout=300, cwd=str(BASE_DIR)
    )
    if result.returncode == 0:
        log("BigQuery: OK")
        if result.stdout.strip():
            for line in result.stdout.strip().splitlines()[-5:]:
                log(f"  BQ: {line}")
        return True
    else:
        log(f"ERRO BigQuery (code {result.returncode})")
        for line in (result.stderr or result.stdout or "").splitlines()[-5:]:
            log(f"  ERR: {line}")
        return False


# ── ETAPA 2: GERAR HTML INLINE ────────────────────────────────────────────────
def build_inline_html():
    log("--- ETAPA 2: Gerando HTML auto-contido ---")
    if not HTML_SRC.exists():
        log("ERRO: index.html nao encontrado")
        return False
    if not DATA_JS.exists():
        log("ERRO: dashboard_data.js nao encontrado")
        return False

    OUTPUT_DIR.mkdir(exist_ok=True)
    html  = HTML_SRC.read_text(encoding="utf-8")
    data  = DATA_JS.read_text(encoding="utf-8")

    # Inlinar dashboard_data.js
    html = html.replace('<script src="dashboard_data.js"></script>',
                        f'<script>\n{data}\n</script>')

    # Cache-busting e timestamp
    ts    = int(time.time())
    agora = datetime.now().strftime("%d/%m/%Y %H:%M")
    bust  = (f'\n  <meta http-equiv="Cache-Control" content="no-cache,no-store,must-revalidate"/>'
             f'\n  <meta http-equiv="Pragma" content="no-cache"/>'
             f'\n  <meta http-equiv="Expires" content="0"/>'
             f'\n  <!-- grid-ts:{ts} -->')
    html = html.replace("</head>", bust + "\n</head>", 1)
    html = re.sub(r'(id="currentDate"[^>]*>)[^<]*(<)', rf'\g<1>{agora}\g<2>', html)

    HTML_OUT.write_text(html, encoding="utf-8")
    size_kb = HTML_OUT.stat().st_size // 1024
    log(f"HTML gerado: {size_kb} KB -> {HTML_OUT.name}")

    # Verificar que nao tem src externo
    if 'src="dashboard_data.js"' in html:
        log("ERRO: dashboard_data.js ainda referenciado como externo!")
        return False
    return True


# ── ETAPA 3: UPLOAD PARA O GRID ───────────────────────────────────────────────
def upload_to_grid(doc_id, session_id, renew=False):
    log("--- ETAPA 3: Publicando no Grid ---")
    if not doc_id:
        log("ERRO: DOCUMENT_ID nao configurado")
        return False

    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        log("ERRO: playwright nao instalado")
        return False

    profile_dir = str(BASE_DIR / ".playwright_profile")

    # Renovar sessao interativamente
    if renew or not session_id:
        return _renew_and_upload(doc_id, profile_dir)

    # Upload headless com perfil existente
    return _headless_upload(doc_id, profile_dir)


def _headless_upload(doc_id, profile_dir):
    """
    Upload via fetch() DENTRO do Playwright — o browser gerencia CSRF automaticamente.
    O perfil autenticado (.playwright_profile) tem cookies e sessao validos.
    """
    from playwright.sync_api import sync_playwright
    import base64

    log("  Upload via fetch() no contexto do browser (CSRF automatico)...")

    html_bytes  = HTML_OUT.read_bytes()
    html_b64    = base64.b64encode(html_bytes).decode()
    filename    = HTML_OUT.name
    upload_url  = f"/api/v1/documents/{doc_id}/versions"

    # Script que faz o upload via fetch dentro do browser
    js_upload = f"""
    async () => {{
        try {{
            // Decodifica base64 para Uint8Array
            const b64 = "{html_b64}";
            const bin = atob(b64);
            const arr = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
            const blob = new Blob([arr], {{type: 'application/octet-stream'}});

            const fd = new FormData();
            fd.append('file', blob, '{filename}');

            const resp = await fetch('{upload_url}', {{
                method: 'POST',
                body: fd,
                credentials: 'include'
            }});
            const text = await resp.text();
            return {{status: resp.status, body: text.slice(0, 300)}};
        }} catch(e) {{
            return {{status: 0, body: String(e)}};
        }}
    }}
    """

    with sync_playwright() as p:
        ctx = p.chromium.launch_persistent_context(
            profile_dir, headless=True,
            args=["--no-sandbox", "--disable-blink-features=AutomationControlled"],
        )
        page = ctx.new_page()

        # Navegar para o documento (garante que cookies e CSRF estao ativos)
        page.goto(f"{GRID_BASE}/d/{doc_id}/view", timeout=30000)
        page.wait_for_load_state("networkidle", timeout=20000)

        if any(x in page.url.lower() for x in ("login", "okta", "accounts.google", "signin")):
            ctx.close()
            log("SESSAO_GRID_EXPIRADA")
            log("Execute: publicar_grid_renew.bat")
            return None

        log(f"  Pagina carregada: {page.url}")

        # Executar o fetch dentro do browser
        log("  Executando fetch() dentro do browser...")
        result = page.evaluate(js_upload)
        ctx.close()

    log(f"  Resultado: status={result.get('status')} body={result.get('body','')[:200]}")
    status = result.get("status", 0)
    if status in (200, 201):
        log("  Upload OK! Nova versao publicada no Grid.")
        return True
    elif status == 401:
        log("  401 - sessao expirada")
        return None
    elif status == 403:
        log("  403 - verifique permissoes ou sessao")
        return None
    else:
        log(f"  Falha (status {status})")
        return False


def _playwright_ui_upload(doc_id, profile_dir):
    """Fallback: usa o botao Upload do Grid via Playwright headless."""
    from playwright.sync_api import sync_playwright
    import re as _re

    log("  Fallback: upload via UI do Grid...")
    new_doc_id = [None]

    with sync_playwright() as p:
        ctx = p.chromium.launch_persistent_context(
            profile_dir, headless=True,
            args=["--no-sandbox"],
        )
        page = ctx.new_page()

        # Monitorar nova URL de documento
        def on_nav(frame):
            if frame == page.main_frame:
                m = _re.search(r"/d/([A-Z0-9]{26})/view", frame.url)
                if m:
                    new_doc_id[0] = m.group(1)

        page.on("framenavigated", on_nav)

        page.goto(f"{GRID_BASE}/my", timeout=20000)
        page.wait_for_load_state("networkidle", timeout=15000)

        if "login" in page.url.lower():
            ctx.close()
            return None

        # Abrir dialog de upload
        page.locator("button[title='Upload']").click()
        page.wait_for_selector("text='Upload to Grid'", timeout=8000)

        # Titulo e arquivo
        page.locator("input[placeholder='Document title']").fill(
            f"Cartoes Expirados - Controle de Renovacoes"
        )
        with page.expect_file_chooser(timeout=10000) as fc_info:
            page.locator("button:has-text('Select file')").click()
        fc_info.value.set_files(str(HTML_OUT))
        page.wait_for_timeout(2000)

        # Upload
        page.locator("#upload-submit-btn").click(force=True)
        page.wait_for_timeout(8000)
        page.wait_for_load_state("networkidle", timeout=20000)

        # Verificar nova aba
        for pg in ctx.pages:
            m = _re.search(r"/d/([A-Z0-9]{26})/view", pg.url)
            if m:
                new_doc_id[0] = m.group(1)
                break

        ctx.close()

    if new_doc_id[0]:
        log(f"  Upload OK! Novo doc: {new_doc_id[0]}")
        # Atualizar credenciais com novo ID
        text = CREDS_FILE.read_text(encoding="utf-8")
        text = _re.sub(r"DOCUMENT_ID=.*", f"DOCUMENT_ID={new_doc_id[0]}", text)
        CREDS_FILE.write_text(text, encoding="utf-8")
        log(f"  DOCUMENT_ID atualizado: {new_doc_id[0]}")
        return True

    log("  Upload via UI falhou")
    return False


def _renew_and_upload(doc_id, profile_dir):
    """Abre browser para login Okta e faz upload DIRETO no mesmo browser."""
    from playwright.sync_api import sync_playwright
    import base64 as _b64

    log("Abrindo browser para renovar sessao Okta...")
    log("Faca login normalmente. O Chrome fecha automaticamente apos detectar a sessao.")

    html_bytes = HTML_OUT.read_bytes()
    html_b64   = _b64.b64encode(html_bytes).decode()
    filename   = HTML_OUT.name

    js_upload = f"""async () => {{
        try {{
            const bin = atob("{html_b64}");
            const arr = new Uint8Array(bin.length);
            for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
            const blob = new Blob([arr], {{type: 'application/octet-stream'}});
            const fd = new FormData();
            fd.append('file', blob, '{filename}');
            const resp = await fetch('/api/v1/documents/{doc_id}/versions', {{
                method: 'POST', body: fd, credentials: 'include'
            }});
            const text = await resp.text();
            return {{status: resp.status, body: text.slice(0,300)}};
        }} catch(e) {{ return {{status:0, body:String(e)}}; }}
    }}"""

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False, args=["--no-sandbox"], slow_mo=200)
        ctx     = browser.new_context(ignore_https_errors=True)
        page    = ctx.new_page()
        page.goto(f"{GRID_BASE}/d/{doc_id}/view", timeout=60000)

        log("Aguardando login... (ate 3 minutos)")
        log("Faca login via Okta. O Chrome detecta a sessao automaticamente.")
        deadline    = time.time() + 180
        session_id  = ""
        logged_in   = False
        all_cookies = []

        while time.time() < deadline:
            try:
                cookies = ctx.cookies()
                found   = next(
                    (c["value"] for c in cookies
                     if c["name"] == "session_id" and len(c["value"]) > 20), ""
                )
                if found and found != session_id:
                    session_id = found
                    all_cookies = ctx.cookies()  # salva para sincronizar depois
                    log(f"  Sessao capturada: {found[:25]}...")

                    # Navegar para o documento e fazer upload no mesmo browser
                    current_url = page.url
                    if f"/d/{doc_id}" not in current_url:
                        page.goto(f"{GRID_BASE}/d/{doc_id}/view", timeout=30000)
                        page.wait_for_load_state("networkidle", timeout=20000)
                    log("  Executando upload via fetch()...")
                    result = page.evaluate(js_upload)
                    status = result.get("status", 0)
                    body   = result.get("body", "")
                    log(f"  status={status} | {body[:150]}")
                    if status in (200, 201):
                        import re as _re
                        m = _re.search(r'"version":(\d+)', body)
                        log(f"  Upload OK! Versao {m.group(1) if m else '?'} publicada.")
                        logged_in = True
                    else:
                        log(f"  Upload falhou (status {status})")
                    break
            except Exception:
                pass
            time.sleep(2)

        try:
            ctx.close()
            browser.close()
        except Exception:
            pass

    if session_id:
        save_session(session_id)
        # ── Sincronizar cookies para o perfil persistente (contexto separado) ─
        # Evita re-autenticacao nas proximas execucoes automaticas agendadas
        try:
            grid_cookies = [
                {**c, "sameSite": c.get("sameSite", "Lax")}
                for c in all_cookies
                if "adminml.com" in c.get("domain", "")
            ]
            if grid_cookies:
                with sync_playwright() as p2:
                    persistent = p2.chromium.launch_persistent_context(
                        profile_dir, headless=True, args=["--no-sandbox"]
                    )
                    persistent.add_cookies(grid_cookies)
                    persistent.close()
                log(f"  {len(grid_cookies)} cookies sincronizados → perfil persistente atualizado")
                log("  Proximas execucoes automaticas nao precisarao de novo login")
        except Exception as e:
            log(f"  Aviso: sincronizacao de cookies falhou ({e})")

    if logged_in:
        return True
    elif session_id:
        log("Sessao salva mas upload falhou. Tentando via perfil persistente...")
        return _headless_upload(doc_id, profile_dir)
    else:
        log("ERRO: login nao detectado. Verifique se voce fez login no Chrome que abriu.")
        return False


# ── MAIN ───────────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--renew-session", action="store_true")
    parser.add_argument("--skip-bq",       action="store_true", help="Pula atualizacao BQ")
    args = parser.parse_args()

    log("=" * 60)
    log(f"INICIO - Cartoes Expirados Dashboard")
    log("=" * 60)

    doc_id, session_id = load_creds()
    log(f"Doc ID  : {doc_id}")
    log(f"Session : {session_id[:20]}..." if session_id else "Session : (nao configurado)")

    erros = []

    # Etapa 1: BigQuery
    if not args.skip_bq:
        bq_ok = run_bq_update()
        if not bq_ok:
            erros.append("BigQuery")
            log("AVISO: BQ falhou, continuando com dados existentes")
    else:
        log("ETAPA 1 ignorada (--skip-bq)")

    # Etapa 2: HTML
    html_ok = build_inline_html()
    if not html_ok:
        log("ERRO FATAL: nao foi possivel gerar o HTML")
        sys.exit(1)

    # Etapa 3: Grid
    result = upload_to_grid(doc_id, session_id, renew=args.renew_session)

    if result is True:
        log("=" * 60)
        log("SUCESSO!")
        log(f"Dashboard: {GRID_BASE}/d/{doc_id}/view")
        if erros:
            log(f"AVISO: falhas parciais em: {', '.join(erros)}")
        log("=" * 60)
    elif result is None:
        log("=" * 60)
        log("SESSAO_GRID_EXPIRADA")
        log("ACAO NECESSARIA: execute publicar_grid_renew.bat")
        log("=" * 60)
        sys.exit(2)
    else:
        log("=" * 60)
        log("FALHA no upload para o Grid")
        log("=" * 60)
        sys.exit(1)


if __name__ == "__main__":
    main()
