"""
sincronizar_grid_gcs.py
Baixa o HTML atual de cada documento do Grid e sobe no GCS.
Uso: python sincronizar_grid_gcs.py
"""
import sys, io, json, os, time
from pathlib import Path

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

GCS_BUCKET = 'meli-sandbox'
GCS_PREFIX = 'CARDSINDICATORSBR/dashboards_TDMP_MLB'
GCS_PROJECT = 'meli-bi-data'
GRID_HOST  = 'https://grid.adminml.com'

# session_id compartilhada (mesma conta, mesmo Okta)
CREDS_FILE = Path(r"C:\Users\jefnogueira\Desktop\Arquivos Claude\controle-plastico-dash\grid_credentials.txt")

LOCAL_DASH = Path(r"C:\Users\jefnogueira\Desktop\Arquivos Claude\Dash MTC\dashboard_micro_tc_mlb.html")

DASHBOARDS = [
    {"label": "TD Indicadores",        "doc_id": "01KPYFDX3NW80KGF0S0PWPDK1V", "gcs": "td_indicadores.html"},
    {"label": "Cartões Expirados",     "doc_id": "01KPZTMZJT17437KWRNKDGE0AQ", "gcs": "cartoes_expirados.html"},
    {"label": "Controle de Plástico",  "doc_id": "01KRPZ2TK8FA0Q9MJK2SRZBW2C", "gcs": "controle_plastico.html"},
    {"label": "Melhorias Fluxo Listado","doc_id":"01KS5XWDPHGD4SJ2GSPD5EYQNQ", "gcs": "melhorias-fluxo-listado.html"},
    {"label": "Micro TC MLB",          "doc_id": None,                           "gcs": "dashboard_micro_tc_mlb.html", "local": LOCAL_DASH},
    {"label": "Projeção Business",     "doc_id": "01KQ083TZAS4CKP309R99BN9DC", "gcs": "projecao-cartao-business.html"},
    {"label": "Limite Médio",          "doc_id": "01KQFDWVKJ0T6G3ZG99SQPWP1C", "gcs": "limite-medio-micro-tc.html"},
]


def load_session():
    # GitHub Actions: lê da variável de ambiente
    env_sid = os.environ.get('GRID_SESSION_ID', '').strip()
    if env_sid:
        return env_sid
    # Local: lê do arquivo de credenciais
    creds = {}
    for line in CREDS_FILE.read_text(encoding='utf-8').splitlines():
        line = line.strip()
        if line and not line.startswith('#') and '=' in line:
            k, v = line.split('=', 1)
            creds[k.strip()] = v.strip()
    return creds.get('session_id', '')


def get_gcs_client():
    from google.cloud import storage
    from google.oauth2.credentials import Credentials
    import google.auth.transport.requests

    path = (os.environ.get('GOOGLE_APPLICATION_CREDENTIALS')
            or os.path.expanduser(r'~\AppData\Roaming\gcloud\application_default_credentials.json'))
    with open(path) as f:
        cd = json.load(f)
    c = Credentials(token=None, refresh_token=cd['refresh_token'],
                    token_uri='https://oauth2.googleapis.com/token',
                    client_id=cd['client_id'], client_secret=cd['client_secret'],
                    quota_project_id=cd.get('quota_project_id'))
    c.refresh(google.auth.transport.requests.Request())
    return storage.Client(project=GCS_PROJECT, credentials=c)


def upload_gcs(client, gcs_filename, html_bytes):
    blob = client.bucket(GCS_BUCKET).blob(f'{GCS_PREFIX}/{gcs_filename}')
    blob.cache_control = 'no-cache, max-age=0'
    blob.upload_from_string(html_bytes, content_type='text/html; charset=utf-8')
    blob.patch()
    return f'https://storage.cloud.google.com/{GCS_BUCKET}/{GCS_PREFIX}/{gcs_filename}'


def download_from_grid(page, doc_id):
    """
    Intercepta a resposta HTML real do dashboard enquanto o Grid carrega.
    O Grid faz fetch do HTML do dashboard durante a renderização da view.
    """
    captured = {'html': None}

    def on_response(response):
        if captured['html']:
            return
        try:
            ct = response.headers.get('content-type', '')
            # Pega respostas HTML grandes (o dashboard tem centenas de KB)
            if 'text/html' in ct and response.status == 200:
                url = response.url
                # Ignora o shell do Grid e páginas de auth
                if any(x in url for x in ['grid.adminml.com/d/', 'okta', 'login', '__cf']):
                    return
                body = response.body()
                if len(body) > 50_000:  # dashboard real tem >> 50 KB
                    html = body.decode('utf-8', errors='replace')
                    if '<!DOCTYPE' in html or '<html' in html:
                        captured['html'] = html
                        print(f'    interceptado: {url[:80]} ({len(body)//1024} KB)')
        except Exception:
            pass

    page.on('response', on_response)
    page.goto(f'{GRID_HOST}/d/{doc_id}/view', timeout=45_000, wait_until='networkidle')
    time.sleep(3)
    page.remove_listener('response', on_response)

    if captured['html']:
        return captured['html']

    # Fallback: tenta via frames
    for f in page.frames:
        if f.url and f != page.main_frame and len(f.url) > 10:
            print(f'    frame: {f.url[:80]}')
            try:
                content = f.content()
                if len(content) > 50_000:
                    return content
            except Exception:
                pass

    # Último recurso: API fetch do documento
    result = page.evaluate("""
        async (docId) => {
            const endpoints = [
                `/api/v1/documents/${docId}/versions/latest/file`,
                `/api/v1/documents/${docId}/download`,
                `/api/v1/documents/${docId}/versions/latest`,
            ];
            for (const ep of endpoints) {
                try {
                    const r = await fetch(ep, {credentials: 'include'});
                    if (!r.ok) continue;
                    const ct = r.headers.get('content-type') || '';
                    if (ct.includes('html')) return await r.text();
                    const text = await r.text();
                    try {
                        const j = JSON.parse(text);
                        // procura campo com URL do arquivo
                        const url = j.file_url || j.url || j.download_url || j.html_url;
                        if (url) {
                            const r2 = await fetch(url, {credentials: 'include'});
                            if (r2.ok) return await r2.text();
                        }
                    } catch {}
                } catch {}
            }
            return null;
        }
    """, doc_id)

    return result


def main():
    session_id = load_session()
    if not session_id:
        print('❌ session_id não encontrado')
        return

    print('Conectando ao GCS...')
    gcs = get_gcs_client()

    from playwright.sync_api import sync_playwright, TimeoutError as PWTimeout

    with sync_playwright() as pw:
        browser = pw.chromium.launch(headless=True)
        ctx = browser.new_context(viewport={'width': 1280, 'height': 800})
        ctx.add_cookies([{
            'name': 'session_id', 'value': session_id,
            'domain': 'grid.adminml.com', 'path': '/', 'secure': True,
        }])
        page = ctx.new_page()

        # Verifica sessão
        page.goto(f'{GRID_HOST}/', timeout=30_000, wait_until='domcontentloaded')
        if 'login' in page.url.lower() or 'okta' in page.url.lower():
            print('❌ Sessão Grid expirada. Execute --renew-session em qualquer publicar_grid.py')
            browser.close()
            return
        print('✅ Sessão Grid válida\n')

        for dash in DASHBOARDS:
            label = dash['label']
            gcs_name = dash['gcs']

            # Arquivo local (Micro TC MLB)
            if dash.get('local'):
                local_path = dash['local']
                if not local_path.exists():
                    print(f'  ⚠️  {label}: arquivo local não encontrado — {local_path}')
                    continue
                html_bytes = local_path.read_bytes()
                url = upload_gcs(gcs, gcs_name, html_bytes)
                print(f'  ✅ {label} (local → GCS)')
                print(f'     {url}')
                continue

            # Documento Grid
            doc_id = dash['doc_id']
            print(f'  📥 {label} (Grid {doc_id[:8]}...)')

            try:
                html = download_from_grid(page, doc_id)

                if not html or len(html) < 500:
                    print(f'  ⚠️  {label}: HTML muito curto ({len(html)} chars) — pulando')
                    continue

                url = upload_gcs(gcs, gcs_name, html.encode('utf-8'))
                print(f'  ✅ {label} ({len(html)//1024} KB → GCS)')
                print(f'     {url}')

            except PWTimeout:
                print(f'  ❌ {label}: timeout')
            except Exception as e:
                print(f'  ❌ {label}: {e}')

        browser.close()

    print('\nSincronização concluída!')


if __name__ == '__main__':
    main()
