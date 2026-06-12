"""
Versão CI/CD do script de atualização.
Roda no GitHub Actions: BQ → HTML → GCS → Grid.
Variáveis de ambiente: GCP_CREDENTIALS (obrigatório), GRID_SESSION_ID (opcional).
Grid: session expira ~7 dias — atualizar secret GRID_SESSION_ID quando expirar.
"""
import sys, io, os, json, logging
from pathlib import Path
from datetime import datetime

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

PROJECT    = 'meli-bi-data'
GCS_BUCKET = 'meli-sandbox'
GCS_PATH   = 'CARDSINDICATORSBR/dashboards_TDMP_MLB/controle_plastico.html'
GRID_DOC_ID = '01KRPZ2TK8FA0Q9MJK2SRZBW2C'
TABLES = {
    'deb':       'meli-bi-data.SBOX_CREDITSTC.BD_CNTR_PLASTICO_DEB',
    'cred':      'meli-bi-data.SBOX_CREDITSTC.BD_CNTR_PLASTICO_CRED',
    'reemissao': 'meli-bi-data.SBOX_CREDITSTC.BD_CNTR_PLASTICO_REEMISSAO',
}
MONTHS_PT = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-7s  %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)],
)
log = logging.getLogger(__name__)


def get_credentials():
    """Suporta service account JSON ou user credentials."""
    from google.oauth2 import service_account
    from google.oauth2.credentials import Credentials
    import google.auth.transport.requests

    # 1. Tenta variável de ambiente GCP_CREDENTIALS (GitHub Actions)
    creds_json = os.environ.get('GCP_CREDENTIALS')
    if creds_json:
        cd = json.loads(creds_json)
        if cd.get('type') == 'service_account':
            log.info("Auth: service account via GCP_CREDENTIALS")
            return service_account.Credentials.from_service_account_info(
                cd, scopes=['https://www.googleapis.com/auth/cloud-platform']
            )
        else:
            log.info("Auth: user credentials via GCP_CREDENTIALS")
            creds = Credentials(
                token=None, refresh_token=cd['refresh_token'],
                token_uri='https://oauth2.googleapis.com/token',
                client_id=cd['client_id'], client_secret=cd['client_secret'],
                quota_project_id=cd.get('quota_project_id'),
            )
            creds.refresh(google.auth.transport.requests.Request())
            return creds

    # 2. Fallback: ADC local (quando roda no computador)
    creds_path = os.path.expanduser(r'~\AppData\Roaming\gcloud\application_default_credentials.json')
    if not os.path.exists(creds_path):
        creds_path = os.path.expanduser('~/.config/gcloud/application_default_credentials.json')
    with open(creds_path) as f:
        cd = json.load(f)
    log.info("Auth: ADC local")
    creds = Credentials(
        token=None, refresh_token=cd['refresh_token'],
        token_uri='https://oauth2.googleapis.com/token',
        client_id=cd['client_id'], client_secret=cd['client_secret'],
        quota_project_id=cd.get('quota_project_id'),
    )
    creds.refresh(google.auth.transport.requests.Request())
    return creds


def fetch_bq(creds):
    from google.cloud import bigquery
    client = bigquery.Client(project=PROJECT, credentials=creds)
    log.info("Buscando dados no BigQuery...")

    deb_rows   = list(client.query(f"SELECT * FROM `{TABLES['deb']}`   ORDER BY SAFRA_AQUISICAO").result())
    cred_rows  = list(client.query(f"SELECT * FROM `{TABLES['cred']}`  ORDER BY SAFRA_AQUISICAO").result())
    reemi_rows = list(client.query(f"SELECT * FROM `{TABLES['reemissao']}` ORDER BY SAFRA_AQUISICAO").result())
    log.info(f"DEB:{len(deb_rows)} CRED:{len(cred_rows)} REEMISSAO:{len(reemi_rows)} safras")

    cred_map  = {r['SAFRA_AQUISICAO']: r for r in cred_rows}
    reemi_map = {r['SAFRA_AQUISICAO']: r for r in reemi_rows}
    current   = datetime.now().strftime("%Y%m")

    rows = []
    for r in deb_rows:
        s = r['SAFRA_AQUISICAO']
        c = cred_map.get(s, {})
        e = reemi_map.get(s, {})
        rows.append({
            'safra': s,
            'label': f"{MONTHS_PT[int(s[4:6])-1]}/{s[2:4]}",
            'emissaoTD':     int(r.get('EMT_TD_DEBT_FIRST') or 0),
            'emissaoTC':     int(c.get('EMIT_TC_CRED_FIRST') or 0),
            'reemissaoTotal':int(e.get('QTDE_REEMISSAO_TOT') or 0),
            'reemissaoTD':   int(e.get('QTDE_REEMI_DEBT') or 0),
            'reemissaoTC':   int(e.get('QTDE_REEMI_CREDIT') or 0),
            'tdCreditFirst': int(r.get('EMT_TD_CRED_FIRST') or 0),
            'tcDebitFirst':  int(c.get('EMIT_TC_DEBT_FIRST') or 0),
            'partial': s == current,
        })
    return rows


def build_html(rows, update_date):
    """Lê o template HTML e injeta os dados."""
    script_dir = Path(__file__).parent
    # scripts/ → controle-plastico/ → root do repo (quando roda no GitHub Actions)
    for candidate in [
        script_dir.parent / "index.html",
        Path(os.environ.get('DASH_DIR', 'controle-plastico')) / "index.html",
        Path("controle-plastico/index.html"),
    ]:
        if candidate.exists():
            html_template = candidate
            break
    else:
        raise FileNotFoundError("index.html não encontrado")
    html = html_template.read_text(encoding='utf-8')

    # Monta bloco de dados
    lines = [f'// Auto-gerado em {update_date}', 'const PLASTICO_DATA = {',
             f'  updateDate: "{update_date}",', '  rows: [']
    for r in rows:
        p = ',partial:true' if r['partial'] else ''
        lines.append(
            f'    {{safra:"{r["safra"]}",label:"{r["label"]}",'
            f'emissaoTD:{r["emissaoTD"]},emissaoTC:{r["emissaoTC"]},'
            f'reemissaoTotal:{r["reemissaoTotal"]},reemissaoTD:{r["reemissaoTD"]},'
            f'reemissaoTC:{r["reemissaoTC"]},'
            f'tdCreditFirst:{r["tdCreditFirst"]},tcDebitFirst:{r["tcDebitFirst"]}{p}}},'
        )
    lines += ['  ]', '};']
    js_block = '\n'.join(lines)

    START, END = '<!--DATA_BEGIN-->', '<!--DATA_END-->'
    i_start = html.find(START)
    i_end   = html.find(END)
    if i_start == -1 or i_end == -1:
        raise ValueError("Marcadores DATA_BEGIN/DATA_END não encontrados no HTML")

    return html[:i_start] + f"{START}\n<script>\n{js_block}\n</script>\n{END}" + html[i_end + len(END):]


def upload_gcs(creds, html_content):
    from google.cloud import storage
    client = storage.Client(project=PROJECT, credentials=creds)
    blob = client.bucket(GCS_BUCKET).blob(GCS_PATH)
    blob.upload_from_string(
        html_content.encode('utf-8'),
        content_type='text/html; charset=utf-8'
    )
    log.info(f"GCS atualizado: gs://{GCS_BUCKET}/{GCS_PATH}")
    return f"https://storage.googleapis.com/{GCS_BUCKET}/{GCS_PATH}"


def publish_grid(html_content: str, session_id: str) -> bool:
    """Publica HTML no Grid. Retorna False sem lançar exceção se falhar."""
    import requests, re
    base = "https://grid.adminml.com"
    try:
        # Passo 1: pega _csrf cookie + CSRF token da página
        r1 = requests.get(
            f"{base}/d/{GRID_DOC_ID}/view",
            cookies={'session_id': session_id},
            timeout=15,
        )
        if r1.status_code == 401:
            log.warning("Grid: sessão expirada — atualize o secret GRID_SESSION_ID no GitHub")
            return False
        if r1.status_code != 200:
            log.warning(f"Grid: erro ao obter página ({r1.status_code})")
            return False

        csrf_cookie = r1.cookies.get('_csrf')
        m = re.search(r'csrf-token"\s+content="([^"]+)"', r1.text)
        if not csrf_cookie or not m:
            log.warning("Grid: não encontrou CSRF token na página")
            return False
        csrf_token = m.group(1)

        # Passo 2: faz upload do HTML
        r2 = requests.post(
            f"{base}/api/v1/documents/{GRID_DOC_ID}/versions",
            cookies={'session_id': session_id, '_csrf': csrf_cookie},
            headers={'X-CSRF-Token': csrf_token},
            files={'file': ('index.html', html_content.encode('utf-8'), 'text/html')},
            timeout=30,
        )
        if r2.status_code == 201:
            v = r2.json().get('version', '?')
            log.info(f"Grid atualizado: versão {v} — {base}/d/{GRID_DOC_ID}/view")
            return True
        else:
            log.warning(f"Grid: upload falhou ({r2.status_code}): {r2.text[:200]}")
            return False
    except Exception as exc:
        log.warning(f"Grid: erro inesperado — {exc}")
        return False


if __name__ == "__main__":
    log.info("=" * 55)
    log.info(f"Atualização CI — {datetime.now().strftime('%d/%m/%Y %H:%M')}")

    creds       = get_credentials()
    rows        = fetch_bq(creds)
    update_date = datetime.now().strftime("%d/%m/%Y")
    html        = build_html(rows, update_date)

    # Salva HTML local também (para uso no computador)
    local_html = Path(__file__).parent.parent / "index.html"
    local_html.write_text(html, encoding='utf-8')
    log.info(f"HTML local atualizado: {local_html}")

    url = upload_gcs(creds, html)
    log.info(f"GCS disponível em: {url}")

    grid_session = os.environ.get('GRID_SESSION_ID')
    if grid_session:
        publish_grid(html, grid_session)
    else:
        log.info("GRID_SESSION_ID não configurado — pulando Grid")

    log.info("Atualização concluída!")
    log.info("=" * 55)
