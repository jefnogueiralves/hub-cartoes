"""
publicar_gcs.py — Pipeline completo: BigQuery → HTML inline → GCS

Uso:
  python scripts/publicar_gcs.py           # BQ + upload GCS
  python scripts/publicar_gcs.py --skip-bq # só gera HTML + upload GCS

Variáveis de ambiente:
  GCS_BUCKET   — bucket (padrão: meli-sandbox)
  GCS_PREFIX   — pasta  (padrão: CARDSINDICATORSBR/dashboards_TDMP_MLB)
  GCS_OBJECT   — arquivo (padrão: cartoes_expirados.html)
  GOOGLE_CLOUD_PROJECT — projeto GCP (padrão: meli-bi-data)
"""
import argparse
import re
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path

BASE_DIR    = Path(__file__).parent.parent
SCRIPTS_DIR = BASE_DIR / "scripts"
OUTPUT_DIR  = BASE_DIR / "output"
HTML_SRC    = BASE_DIR / "index.html"
DATA_JS     = BASE_DIR / "dashboard_data.js"
HTML_OUT    = OUTPUT_DIR / "cartoes_expirados_gcs.html"
LOG_FILE    = Path("C:/Users/jefnogueira/logs/cartoes_expirados.log")

import os
BUCKET  = os.environ.get("GCS_BUCKET",  "meli-sandbox")
PREFIX  = os.environ.get("GCS_PREFIX",  "CARDSINDICATORSBR/dashboards_TDMP_MLB")
OBJECT  = os.environ.get("GCS_OBJECT",  "cartoes_expirados.html")
PROJECT = os.environ.get("GOOGLE_CLOUD_PROJECT", "meli-bi-data")
GCS_URI = f"gs://{BUCKET}/{PREFIX}/{OBJECT}"
GCS_URL = f"https://storage.googleapis.com/{BUCKET}/{PREFIX}/{OBJECT}"

def log(msg):
    ts   = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    line = f"[{ts}] {msg}"
    print(line)
    try:
        LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
        with open(LOG_FILE, "a", encoding="utf-8") as f:
            f.write(line + "\n")
    except Exception:
        pass


def run_bq():
    log("─── ETAPA 1: BigQuery ──────────────────────────────")
    script = SCRIPTS_DIR / "update_data.py"
    if not script.exists():
        log("AVISO: update_data.py não encontrado — usando dados existentes.")
        return False
    r = subprocess.run([sys.executable, str(script)],
                       capture_output=True, text=True, timeout=300, cwd=str(BASE_DIR))
    if r.returncode == 0:
        log("BigQuery: OK")
        for line in (r.stdout or "").strip().splitlines()[-3:]:
            log(f"  BQ: {line}")
        return True
    else:
        log(f"ERRO BigQuery (code {r.returncode})")
        for line in (r.stderr or "").strip().splitlines()[-3:]:
            log(f"  ERR: {line}")
        return False


def build_html():
    log("─── ETAPA 2: Gerar HTML ────────────────────────────")
    if not HTML_SRC.exists():
        log(f"ERRO: {HTML_SRC} não encontrado"); sys.exit(1)
    if not DATA_JS.exists():
        log(f"ERRO: {DATA_JS} não encontrado"); sys.exit(1)

    OUTPUT_DIR.mkdir(exist_ok=True)
    html = HTML_SRC.read_text(encoding="utf-8")
    data = DATA_JS.read_text(encoding="utf-8")

    # Inline dashboard_data.js
    html = html.replace('<script src="dashboard_data.js"></script>',
                        f'<script>\n{data}\n</script>')

    # Cache-busting + timestamp
    ts    = int(time.time())
    agora = datetime.now().strftime("%d/%m/%Y %H:%M")
    bust  = (f'\n  <meta http-equiv="Cache-Control" content="no-cache,no-store,must-revalidate"/>'
             f'\n  <meta http-equiv="Pragma" content="no-cache"/>'
             f'\n  <meta http-equiv="Expires" content="0"/>'
             f'\n  <!-- gcs-ts:{ts} -->')
    html  = html.replace("</head>", bust + "\n</head>", 1)
    html  = re.sub(r'(id="currentDate"[^>]*>)[^<]*(<)', rf'\g<1>{agora}\g<2>', html)

    HTML_OUT.write_text(html, encoding="utf-8")
    log(f"HTML gerado: {HTML_OUT.stat().st_size // 1024} KB → {HTML_OUT.name}")
    return HTML_OUT


def upload_gcs(html_path: Path):
    log("─── ETAPA 3: Upload GCS ────────────────────────────")
    try:
        from google.cloud import storage as gcs
    except ImportError:
        log("ERRO: google-cloud-storage não instalado. Execute: pip install google-cloud-storage")
        sys.exit(1)

    try:
        client = gcs.Client(project=PROJECT)
        bucket = client.bucket(BUCKET)
        blob   = bucket.blob(f"{PREFIX}/{OBJECT}")
        blob.content_type  = "text/html; charset=utf-8"
        blob.cache_control = "no-cache, no-store, must-revalidate"
        blob.metadata      = {"updated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
        blob.upload_from_filename(str(html_path), content_type="text/html; charset=utf-8")
        log(f"Upload OK: {GCS_URI}")
        log(f"URL: {GCS_URL}")

        # Persiste URL para referência
        url_file = BASE_DIR / "output" / "gcs_url.txt"
        url_file.write_text(GCS_URL, encoding="utf-8")
        return GCS_URL

    except Exception as e:
        log(f"ERRO GCS: {e}")
        sys.exit(1)


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--skip-bq",  action="store_true", help="Pula extração BigQuery")
    args = parser.parse_args()

    log("=" * 55)
    log("Cartões Expirados — Publicação GCS")
    log("=" * 55)

    if not args.skip_bq:
        run_bq()

    html_path = build_html()
    url = upload_gcs(html_path)

    log("=" * 55)
    log("SUCESSO!")
    log(f"Dashboard: {url}")
    log("=" * 55)


if __name__ == "__main__":
    main()
