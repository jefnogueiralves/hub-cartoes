"""
upload_gcs.py — Faz upload do dashboard HTML para o GCS e retorna a URL.

Uso local (credenciais pessoais ADC):
    python scripts/upload_gcs.py

Uso no GitHub Actions (service account via GOOGLE_APPLICATION_CREDENTIALS):
    python scripts/upload_gcs.py

Variáveis de ambiente opcionais:
    GCS_BUCKET  — bucket (padrão: meli-sandbox)
    GCS_PREFIX  — prefixo/pasta (padrão: CARDSINDICATORSBR/dashboards_TDMP_MLB)
    GCS_OBJECT  — nome do arquivo (padrão: cartoes_expirados.html)
"""
import os
import sys
import time
from datetime import datetime
from pathlib import Path

# ── Configuração ───────────────────────────────────────────────────────────────
BASE_DIR    = Path(__file__).parent.parent
HTML_SRC    = BASE_DIR / "output" / "cartoes_expirados_grid.html"
LOG_FILE    = Path("C:/Users/jefnogueira/logs/cartoes_expirados.log")

BUCKET  = os.environ.get("GCS_BUCKET",  "meli-sandbox")
PREFIX  = os.environ.get("GCS_PREFIX",  "CARDSINDICATORSBR/dashboards_TDMP_MLB")
OBJECT  = os.environ.get("GCS_OBJECT",  "cartoes_expirados.html")
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


def upload():
    if not HTML_SRC.exists():
        log(f"ERRO: arquivo não encontrado: {HTML_SRC}")
        sys.exit(1)

    size_kb = HTML_SRC.stat().st_size // 1024
    log(f"Iniciando upload GCS: {size_kb} KB → {GCS_URI}")

    try:
        from google.cloud import storage as gcs
        from google.api_core.exceptions import GoogleAPIError
    except ImportError:
        log("ERRO: google-cloud-storage não instalado. Execute: pip install google-cloud-storage")
        sys.exit(1)

    try:
        client = gcs.Client()
        bucket = client.bucket(BUCKET)
        blob   = bucket.blob(f"{PREFIX}/{OBJECT}")

        blob.content_type   = "text/html; charset=utf-8"
        blob.cache_control  = "no-cache, no-store, must-revalidate"
        blob.metadata       = {
            "updated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        }

        blob.upload_from_filename(str(HTML_SRC), content_type="text/html; charset=utf-8")
        log(f"Upload OK: {GCS_URI}")
        log(f"URL GCS: {GCS_URL}")

        # Escreve a URL num arquivo local para outros scripts lerem
        url_file = BASE_DIR / "output" / "gcs_url.txt"
        url_file.write_text(GCS_URL, encoding="utf-8")
        log(f"URL salva em: {url_file}")

        return GCS_URL

    except GoogleAPIError as e:
        log(f"ERRO GCS: {e}")
        sys.exit(1)
    except Exception as e:
        log(f"ERRO inesperado: {e}")
        sys.exit(1)


if __name__ == "__main__":
    url = upload()
    print(f"\nDashboard disponível em:\n  {url}\n")
