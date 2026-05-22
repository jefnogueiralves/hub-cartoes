#!/usr/bin/env python3
"""
publicar_gcs.py — Publica Cartões Expirados no GCS como HTML auto-contido
"""
import os, sys, json, re
from pathlib import Path
from datetime import datetime

BASE_DIR   = Path(__file__).resolve().parent
GCS_BUCKET = 'meli-sandbox'
GCS_OBJECT = 'CARDSINDICATORSBR/dashboards_TDMP_MLB/cartoes_expirados.html'
GCS_URL    = f'https://storage.googleapis.com/{GCS_BUCKET}/{GCS_OBJECT}'


def get_gcs_client():
    import google.auth.transport.requests
    from google.oauth2.credentials import Credentials
    from google.cloud import storage

    creds_path = (
        os.environ.get('GOOGLE_APPLICATION_CREDENTIALS')
        or os.path.expanduser(
            r'~\AppData\Roaming\gcloud\application_default_credentials.json'
            if sys.platform == 'win32'
            else '~/.config/gcloud/application_default_credentials.json'
        )
    )
    with open(creds_path) as f:
        cd = json.load(f)
    creds = Credentials(
        token=None,
        refresh_token=cd['refresh_token'],
        token_uri='https://oauth2.googleapis.com/token',
        client_id=cd['client_id'],
        client_secret=cd['client_secret'],
        quota_project_id=cd.get('quota_project_id'),
    )
    creds.refresh(google.auth.transport.requests.Request())
    return storage.Client(project='meli-bi-data', credentials=creds)


def build_html():
    html = (BASE_DIR / 'index.html').read_text(encoding='utf-8')
    data_js_path = BASE_DIR / 'dashboard_data.js'
    if data_js_path.exists():
        data_js = data_js_path.read_text(encoding='utf-8')
        html = html.replace(
            '<script src="dashboard_data.js"></script>',
            f'<script>\n{data_js}\n</script>'
        )
    ts = datetime.now().strftime('%Y%m%d%H%M%S')
    html = html.replace('</head>', f'<meta name="cache-ts" content="{ts}">\n</head>', 1)
    return html


def publicar():
    print('Gerando HTML auto-contido...')
    html  = build_html()
    dados = html.encode('utf-8')
    print(f'  Tamanho: {len(dados) // 1024} KB')

    print('Publicando no GCS...')
    client = get_gcs_client()
    blob   = client.bucket(GCS_BUCKET).blob(GCS_OBJECT)
    blob.upload_from_string(dados, content_type='text/html; charset=utf-8')
    blob.cache_control = 'no-cache, max-age=0'
    blob.patch()
    print(f'Publicado: {GCS_URL}')
    return GCS_URL


if __name__ == '__main__':
    publicar()
