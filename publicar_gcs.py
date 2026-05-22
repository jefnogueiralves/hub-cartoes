#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
publicar_gcs.py — Publica o dashboard Cartoes Expirados no Google Cloud Storage
Bucket: meli-sandbox / CARDSINDICATORSBR/dashboards_TDMP_MLB/
Auth: Application Default Credentials pessoais

Uso:
    python publicar_gcs.py          # gera bundle HTML e publica
    python publicar_gcs.py --url    # so imprime a URL
"""

import os, sys, io, json, re, logging, argparse
from pathlib import Path
from datetime import datetime

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

BASE_DIR  = Path(__file__).parent
LOG_FILE  = BASE_DIR / 'gcs_publish.log'

GCS_PROJECT = 'meli-bi-data'
GCS_BUCKET  = 'meli-sandbox'
GCS_PREFIX  = 'CARDSINDICATORSBR/dashboards_TDMP_MLB'
GCS_FILE    = 'cartoes_expirados.html'
GCS_OBJECT  = f'{GCS_PREFIX}/{GCS_FILE}'
GCS_URL     = f'https://storage.googleapis.com/{GCS_BUCKET}/{GCS_OBJECT}'

logging.basicConfig(filename=str(LOG_FILE), level=logging.INFO,
    format='%(asctime)s %(levelname)s %(message)s')
log = logging.getLogger(__name__)


def build_html():
    html = (BASE_DIR / 'index.html').read_text(encoding='utf-8')
    data = (BASE_DIR / 'dashboard_data.js').read_text(encoding='utf-8')

    # Inline dashboard_data.js
    pat = r'<script\s+src=["\']dashboard_data\.js["\'][^>]*>\s*</script>'
    if re.search(pat, html, flags=re.IGNORECASE):
        html = re.sub(pat, f'<script>\n{data}\n</script>', html, flags=re.IGNORECASE)
    else:
        html = html.replace('<script src="dashboard_data.js"></script>',
                            f'<script>\n{data}\n</script>')

    # Cache-busting
    ts = datetime.now().strftime('%Y%m%d%H%M%S')
    html = html.replace('</head>', f'<meta name="cache-ts" content="{ts}">\n</head>', 1)
    return html


def get_client():
    from google.cloud import storage
    from google.oauth2.credentials import Credentials
    import google.auth.transport.requests

    # Tenta ADC padrao (~/.config/gcloud ou AppData\Roaming\gcloud)
    for creds_path in [
        os.path.expanduser('~/.config/gcloud/application_default_credentials.json'),
        os.path.expanduser(r'~\AppData\Roaming\gcloud\application_default_credentials.json'),
    ]:
        if os.path.exists(creds_path):
            with open(creds_path) as f:
                cd = json.load(f)
            c = Credentials(
                token=None,
                refresh_token=cd['refresh_token'],
                token_uri='https://oauth2.googleapis.com/token',
                client_id=cd['client_id'],
                client_secret=cd['client_secret'],
                quota_project_id=cd.get('quota_project_id'),
            )
            c.refresh(google.auth.transport.requests.Request())
            return storage.Client(project=GCS_PROJECT, credentials=c)

    raise FileNotFoundError('ADC credentials nao encontradas. Execute: gcloud auth application-default login')


def publicar():
    print('Gerando bundle HTML...')
    html  = build_html()
    dados = html.encode('utf-8')
    print(f'  Tamanho: {len(dados)//1024} KB')

    print('Publicando no GCS...')
    client = get_client()
    blob   = client.bucket(GCS_BUCKET).blob(GCS_OBJECT)
    blob.upload_from_string(dados, content_type='text/html; charset=utf-8')
    blob.cache_control = 'no-cache, max-age=0'
    blob.patch()

    log.info(f'GCS publicado: {GCS_URL}')
    print(f'\nPublicado: {GCS_URL}')
    return GCS_URL


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--url', action='store_true', help='So imprime a URL')
    args = parser.parse_args()
    if args.url:
        print(GCS_URL)
    else:
        publicar()
