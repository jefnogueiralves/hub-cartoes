"""
update_gcs.py — Atualiza Dashboard Micro TC MLB no GCS.
Usado pelo GitHub Actions (daily 09h BRT) e localmente.

Requisitos:
  pip install google-cloud-bigquery google-cloud-storage google-auth pyarrow

Uso:
  # GitHub Actions (SA key via GOOGLE_APPLICATION_CREDENTIALS):
  python update_gcs.py

  # Local (usa OAuth2 ADC):
  python update_gcs.py
"""
import os, sys, json, gzip, time, re, base64, logging, argparse
from pathlib import Path
from datetime import datetime, timedelta
from collections import defaultdict

logging.basicConfig(
    level=logging.INFO,
    format='[%(asctime)s] %(levelname)s %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S',
    handlers=[logging.StreamHandler()]
)
log = logging.getLogger(__name__)

# ── Paths ─────────────────────────────────────────────────────────────────────
SCRIPT_DIR = Path(__file__).parent
HTML_SRC   = SCRIPT_DIR / 'dashboard_micro_tc_mlb.html'  # template fonte
OUTPUT_DIR = Path(os.environ.get('OUTPUT_DIR', '/tmp/dash_mtc'))
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
HTML_OUT   = OUTPUT_DIR / 'dashboard_micro_tc_mlb.html'

# ── GCS ───────────────────────────────────────────────────────────────────────
GCS_BUCKET = 'meli-sandbox'
GCS_BLOB   = 'CARDSINDICATORSBR/dashboards_TDMP_MLB/dashboard_micro_tc_mlb.html'
GCS_URL    = f'https://storage.googleapis.com/{GCS_BUCKET}/{GCS_BLOB}'

# ── BQ SQLs ───────────────────────────────────────────────────────────────────
MAIN_DIMS = ["safra_encendido","safra_convertido","FLAG_CONVERSAO","FLAG_REENCENDIDO",
             "GRUPO_ESPECIAL","FLAG_NISE","FLAG_CANAL","FLAG_APP_ATIVO","FLAG_PERFIL_USUARIO",
             "FLAG_PROP_CC_MICRO","FLAG_CANAL_AQUISICAO","FLAG_SELLERS","FX_PROPOSTA_ENC",
             "alcance_limite_tc_vs_limite_scr","origem_canal","repeats_status",
             "flag_cc_new_activation","limite_tarjeta","rating_char_V6","rating_mtc_xyz"]
MAIN_METRICS = ["qtd_encendidos","qtd_convertidos"]
_dims = ", ".join(MAIN_DIMS)
_sums = ", ".join(f"SUM({m}) AS {m}" for m in MAIN_METRICS)
SQL_PRINCIPAL = f"SELECT {_dims}, {_sums} FROM `meli-bi-data.SBOX_CREDITSTC.DASHBOARD_MICRO_TC_MLB` WHERE FLAG_FILTRO = 1 GROUP BY {_dims}"
SQL_COHORT    = "SELECT * FROM `meli-bi-data.SBOX_CREDITSTC.BD_MICRO_TC_COHORT_ANL_GRAD_CUBO` WHERE SAFRA_AQUISICAO >= '202501'"
SQL_CROSSCC   = "SELECT * FROM `meli-bi-data.SBOX_CREDITSTC.BD_MICRO_TC_CROSS_CC_COHORT_CROSS_CC` WHERE SAFRA_AQUISICAO3 >= '202501'"
SQL_TS_ENC    = "SELECT CAST(DT_ENCENDIDO AS STRING) AS dt, SUM(qtd_encendidos) AS qtd FROM `meli-bi-data.SBOX_CREDITSTC.DASHBOARD_MICRO_TC_MLB` WHERE FLAG_FILTRO=1 AND DT_ENCENDIDO >= DATE_SUB(CURRENT_DATE(), INTERVAL 180 DAY) GROUP BY dt ORDER BY dt"
SQL_TS_CONV   = "SELECT CAST(DT_CONV AS STRING) AS dt, SUM(qtd_convertidos) AS qtd FROM `meli-bi-data.SBOX_CREDITSTC.DASHBOARD_MICRO_TC_MLB` WHERE FLAG_FILTRO=1 AND FLAG_CONVERSAO='1. Convertido' AND DT_CONV >= DATE_SUB(CURRENT_DATE(), INTERVAL 180 DAY) GROUP BY dt ORDER BY dt"

QUERIES = [
    ('main',    SQL_PRINCIPAL),
    ('cohort',  SQL_COHORT),
    ('crosscc', SQL_CROSSCC),
    ('tsenc',   SQL_TS_ENC),
    ('tsconv',  SQL_TS_CONV),
]


def get_credentials():
    import google.auth.transport.requests as req

    # Verifica se há um arquivo de credenciais explícito
    cred_path = os.environ.get('GOOGLE_APPLICATION_CREDENTIALS')
    if cred_path and Path(cred_path).exists():
        with open(cred_path) as f:
            cd = json.load(f)
        cred_type = cd.get('type', '')

        if cred_type == 'service_account':
            from google.oauth2 import service_account
            log.info('Credenciais: service account')
            return service_account.Credentials.from_service_account_file(
                cred_path, scopes=['https://www.googleapis.com/auth/cloud-platform'])

        if cred_type == 'authorized_user':
            from google.oauth2.credentials import Credentials
            log.info('Credenciais: authorized_user (OAuth2)')
            creds = Credentials(
                token=None,
                refresh_token=cd['refresh_token'],
                token_uri='https://oauth2.googleapis.com/token',
                client_id=cd['client_id'],
                client_secret=cd['client_secret'],
                quota_project_id=cd.get('quota_project_id'),
            )
            creds.refresh(req.Request())
            return creds

    # Fallback: ADC padrão do gcloud
    import google.auth
    try:
        creds, _ = google.auth.default(scopes=['https://www.googleapis.com/auth/cloud-platform'])
        creds.refresh(req.Request())
        log.info('Credenciais: ADC padrão')
        return creds
    except Exception as e:
        raise RuntimeError(f'Nenhuma credencial disponível: {e}')


def run_query(client, sql, label):
    from google.cloud import bigquery
    log.info(f'BQ [{label}] iniciando...')
    t0 = time.time()
    job = client.query(sql)
    result = job.result(timeout=600)
    schema = result.schema
    cols = [f.name for f in schema]
    rows = []
    for row in result:
        r = []
        for f in schema:
            v = row[f.name]
            if v is None: r.append(None)
            elif f.field_type in ('INTEGER','INT64'): r.append(int(v))
            elif f.field_type in ('FLOAT','FLOAT64','NUMERIC','BIGNUMERIC'): r.append(float(v))
            else: r.append(str(v))
        rows.append(r)
    log.info(f'BQ [{label}] OK — {len(rows):,} linhas em {time.time()-t0:.1f}s')
    return {'cols': cols, 'rows': rows}


def compact_cohort(cohort_cols, cohort_rows):
    ci = {c:i for i,c in enumerate(cohort_cols)}
    GROUP_DIMS = ['DT_ATUALIZACAO','SAFRA_AQUISICAO','SAFRA_MES','MOB',
                  'FX_LIMITE_MOB','FX_LIMITE_ATU','FLAG_MARABERTO']
    METRICS    = ['QTDE','MAPS','TPV_TC','TPN_TC','QTDE_CART_LIQUIDA','QTDE_CHURN',
                  'FLAG_100','FLAG_200','FLAG_300','FLAG_400','FLAG_500']
    gd_idx  = [(d, ci[d]) for d in GROUP_DIMS if d in ci]
    met_idx = [(m, ci[m]) for m in METRICS if m in ci]
    new_cols = [d for d,_ in gd_idx] + [m for m,_ in met_idx]
    agg = defaultdict(lambda: [0]*len(met_idx))
    for r in cohort_rows:
        key = tuple(r[i] for _,i in gd_idx)
        a = agg[key]
        for j,(_,i) in enumerate(met_idx):
            a[j] += r[i] or 0
    new_rows = [list(k)+v for k,v in agg.items()]
    log.info(f'Cohort compacto: {len(cohort_rows):,}→{len(new_rows):,} linhas')
    return {'cols': new_cols, 'rows': new_rows}


def compact_cohort_grad(cohort_cols, cohort_rows):
    ci = {c:i for i,c in enumerate(cohort_cols)}
    GROUP_DIMS = ['SAFRA_AQUISICAO','MOB','FLAG_100','FLAG_200','FLAG_300','FLAG_400','FLAG_500','FLAG_CANAL_AQUISICAO']
    METRICS    = ['QTDE']
    gd_idx  = [(d, ci[d]) for d in GROUP_DIMS if d in ci]
    met_idx = [(m, ci[m]) for m in METRICS if m in ci]
    new_cols = [d for d,_ in gd_idx] + [m for m,_ in met_idx]
    agg = defaultdict(lambda: [0]*len(met_idx))
    for r in cohort_rows:
        key = tuple(r[i] for _,i in gd_idx)
        a = agg[key]
        for j,(_,i) in enumerate(met_idx):
            a[j] += r[i] or 0
    new_rows = [list(k)+v for k,v in agg.items()]
    log.info(f'Cohort grad compacto: {len(cohort_rows):,}→{len(new_rows):,} linhas')
    return {'cols': new_cols, 'rows': new_rows}


def compact_crosscc(cc_cols, cc_rows):
    ci = {c:i for i,c in enumerate(cc_cols)}
    GROUP_DIMS = ['SAFRA_AQUISICAO3','MOB_USO_3','FLAG_BASE_3','PROP_CC_ENC_3','FX_LIMITE_ATU']
    METRICS    = ['QTDE_3','SALDO_CC_TC_3']
    gd_idx  = [(d, ci[d]) for d in GROUP_DIMS if d in ci]
    met_idx = [(m, ci[m]) for m in METRICS if m in ci]
    new_cols = [d for d,_ in gd_idx] + [m for m,_ in met_idx]
    agg = defaultdict(lambda: [0]*len(met_idx))
    for r in cc_rows:
        key = tuple(r[i] for _,i in gd_idx)
        a = agg[key]
        for j,(_,i) in enumerate(met_idx):
            a[j] += r[i] or 0
    new_rows = [list(k)+v for k,v in agg.items()]
    log.info(f'CrossCC compacto: {len(cc_rows):,}→{len(new_rows):,} linhas')
    return {'cols': new_cols, 'rows': new_rows}


def generate_html(data: dict, cutoff: str) -> Path:
    """Gera HTML com 13 meses de dados embutidos."""
    cutoff_dt = datetime.strptime(cutoff, '%Y-%m-%d')
    min_safra = (cutoff_dt - timedelta(days=395)).strftime('%Y%m')

    # Monta payload
    DROP_COLS = {'limite_scr', 'FLAG_CANAL_AQUISICAO_SIMP'}
    essential = {}

    # Main (13 meses, todas as linhas)
    if 'main' in data:
        cols = data['main']['cols']
        keep = [i for i,c in enumerate(cols) if c not in DROP_COLS]
        new_cols = [cols[i] for i in keep]
        idx_se = cols.index('safra_encendido') if 'safra_encendido' in cols else -1
        idx_sc = cols.index('safra_convertido') if 'safra_convertido' in cols else -1
        rows = [[r[i] for i in keep] for r in data['main']['rows']
                if (str(r[idx_se] or '') >= min_safra or str(r[idx_sc] or '') >= min_safra)]
        essential['main'] = {'cols': new_cols, 'rows': rows}
        log.info(f'Main: {len(data["main"]["rows"]):,}→{len(rows):,} linhas (>={min_safra})')

    if 'cohort' in data:
        ch = data['cohort']
        essential['cohort']      = compact_cohort(ch['cols'], ch['rows'])
        essential['cohort_grad'] = compact_cohort_grad(ch['cols'], ch['rows'])
    if 'crosscc' in data:
        cc = data['crosscc']
        essential['crosscc'] = compact_crosscc(cc['cols'], cc['rows'])
    for k in ('tsenc','tsconv','overemit'):
        if k in data:
            essential[k] = data[k]

    payload    = json.dumps(essential, ensure_ascii=False, separators=(',',':'), default=str).encode('utf-8')
    compressed = gzip.compress(payload, compresslevel=9)
    b64_data   = base64.b64encode(compressed).decode('ascii')
    log.info(f'Dados: {len(payload)//1024:,} KB raw → {len(compressed)//1024:,} KB gzip → {len(b64_data)//1024:,} KB b64')

    ts_label = cutoff_dt.strftime('%d/%m/%Y')
    embed = (
        f'<!-- Dados embutidos -->\n'
        f'<div id="__mldash_b64__" style="display:none;visibility:hidden">{b64_data}</div>\n'
        f'<div id="__mldash_ts__"  style="display:none;visibility:hidden">{ts_label}</div>\n'
        '<script id="static-data-loader">\n'
        'window.__STATIC_B64__ = (document.getElementById("__mldash_b64__")||{}).textContent || "";\n'
        'window.__STATIC_TS__  = (document.getElementById("__mldash_ts__") ||{}).textContent || "";\n'
        '</script>'
    )

    src = HTML_SRC.read_text(encoding='utf-8')
    # Patches
    src = src.replace('<script src="https://accounts.google.com/gsi/client" async defer></script>', '')
    src = re.sub(r'function isLocalProxy\(\)\s*\{[^}]+\}', 'function isLocalProxy() { return true; }', src)
    src = re.sub(
        r'// Janela rolante de 13 meses[^\n]*\nconst SAFRA_MIN\s*=\s*\(\(\).*?\)\(\);',
        f"const SAFRA_MIN = '{min_safra}';",
        src, flags=re.DOTALL
    )
    src = src.replace('id="login-overlay" style="display:none;', 'id="login-overlay" style="display:none !important;')
    src = src.replace(
        'async function loadAllFromBQ(forceRefresh) {',
        '''async function loadAllFromBQ(forceRefresh) {
  if (!window.__STATIC_B64__) {
    var _el = document.getElementById('__mldash_b64__');
    if (_el && _el.textContent.length > 100) window.__STATIC_B64__ = _el.textContent.trim();
    var _te = document.getElementById('__mldash_ts__');
    if (_te) window.__STATIC_TS__ = _te.textContent.trim();
  }
  if (window.__STATIC_B64__) {
    showLoading(true);
    try {
      var _bytes = Uint8Array.from(atob(window.__STATIC_B64__), c => c.charCodeAt(0));
      var _ds = new DecompressionStream('gzip');
      var _w = _ds.writable.getWriter(); _w.write(_bytes); _w.close();
      var _d = await new Response(_ds.readable).json();
      loadData(_d); addRefreshButton(Date.now()); return;
    } catch(e) { console.error('[STATIC] Erro:', e); }
  }'''
    )
    badge = (f'<div style="position:fixed;bottom:8px;right:12px;background:rgba(0,0,0,.6);'
             f'color:#fff;font-size:.7rem;padding:3px 8px;border-radius:4px;z-index:9999;">'
             f'GCS · {ts_label}</div>')
    html = src.replace('</body>', embed + '\n' + badge + '\n</body>', 1)
    HTML_OUT.write_text(html, encoding='utf-8')
    kb = HTML_OUT.stat().st_size // 1024
    log.info(f'HTML gerado: {HTML_OUT.name} ({kb:,} KB)')
    return HTML_OUT


def upload_gcs(local_path: Path, creds) -> str:
    from google.cloud import storage
    client = storage.Client(credentials=creds, project='meli-bi-data')
    blob = client.bucket(GCS_BUCKET).blob(GCS_BLOB)
    blob.upload_from_filename(str(local_path), content_type='text/html')
    log.info(f'Upload GCS OK: {GCS_URL}')
    return GCS_URL


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--cutoff', help='YYYY-MM-DD (padrão: D-1)')
    args = parser.parse_args()

    cutoff = args.cutoff or (datetime.now() - timedelta(days=1)).strftime('%Y-%m-%d')
    log.info(f'=== Update Micro TC MLB | cutoff: {cutoff} ===')

    creds = get_credentials()

    # ── BQ Queries ──
    from google.cloud import bigquery
    client = bigquery.Client(project='meli-bi-data', credentials=creds)
    data = {}
    for lbl, sql in QUERIES:
        r = run_query(client, sql, lbl)
        if r:
            data[lbl] = r
        if lbl != QUERIES[-1][0]:
            log.info('Aguardando 15s...')
            time.sleep(15)

    if 'main' not in data:
        log.error('Query principal falhou. Abortando.')
        sys.exit(1)

    # ── Gera HTML ──
    html_path = generate_html(data, cutoff)

    # ── Upload GCS ──
    url = upload_gcs(html_path, creds)
    log.info(f'=== Concluído | {html_path.stat().st_size//1024:,} KB | {url} ===')


if __name__ == '__main__':
    main()
