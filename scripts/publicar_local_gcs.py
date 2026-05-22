"""
publicar_local_gcs.py — Sobe os dashboards locais para o GCS.
Usa as mesmas credenciais ADC dos outros scripts.
"""
import sys, io, json, os
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

GCS_PROJECT = 'meli-bi-data'
GCS_BUCKET  = 'meli-sandbox'
GCS_PREFIX  = 'CARDSINDICATORSBR/dashboards_TDMP_MLB'

ARQUIVOS = [
    {
        "local": Path(r"C:\Users\jefnogueira\Desktop\Arquivos Claude\projecao-cartao-business-debito.html"),
        "gcs":   "projecao-cartao-business.html",
        "label": "Projeção Cartão Business",
    },
    {
        "local": Path(r"C:\Users\jefnogueira\Desktop\Arquivos Claude\tombamento-legado-abr25.html"),
        "gcs":   "tombamento-legado-abr25.html",
        "label": "Tombamento Legado",
    },
    {
        "local": Path(r"C:\Users\jefnogueira\Desktop\Arquivos Claude\Limite médio\dashboard_limite_medio.html"),
        "gcs":   "limite-medio-micro-tc.html",
        "label": "Limite Médio Micro TC",
    },
    {
        "local": Path(r"C:\Users\jefnogueira\Desktop\Arquivos Claude\visa-copa-dash\index.html"),
        "gcs":   "lance-pra-cartao.html",
        "label": "Lance pra Cartão",
    },
]

BASE_URL = f"https://storage.cloud.google.com/{GCS_BUCKET}/{GCS_PREFIX}"


def get_client():
    from google.cloud import storage
    from google.oauth2.credentials import Credentials
    import google.auth.transport.requests

    creds_path = (
        os.environ.get('GOOGLE_APPLICATION_CREDENTIALS')
        or os.path.expanduser(r'~\AppData\Roaming\gcloud\application_default_credentials.json')
    )
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


def main():
    print("Conectando ao GCS...")
    client = get_client()
    bucket = client.bucket(GCS_BUCKET)

    for arq in ARQUIVOS:
        if not arq["local"].exists():
            print(f"  ⚠️  {arq['label']}: arquivo não encontrado — {arq['local']}")
            continue

        gcs_path = f"{GCS_PREFIX}/{arq['gcs']}"
        dados    = arq["local"].read_bytes()
        blob     = bucket.blob(gcs_path)
        blob.upload_from_string(dados, content_type='text/html; charset=utf-8')

        url = f"{BASE_URL}/{arq['gcs']}"
        print(f"  ✅ {arq['label']}")
        print(f"     {url}")

    print("\nTodos os arquivos publicados!")
    print("\nURLs para o hub:")
    for arq in ARQUIVOS:
        print(f'  {arq["label"]}: {BASE_URL}/{arq["gcs"]}')


if __name__ == '__main__':
    main()
