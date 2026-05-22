#!/usr/bin/env python3
"""
gerar_estatico.py — Gera HTML estático do Dash MTC com dados BQ embutidos e publica no GCS.
Substitui o servidor local (dash_server.py + localhost:8080).
"""
import json, os, sys, time
from pathlib import Path
from datetime import datetime

BASE_DIR   = Path(__file__).resolve().parent
TEMPLATE   = BASE_DIR / 'dashboard_micro_tc_mlb.html'
GCS_BUCKET = 'meli-sandbox'
GCS_OBJECT = 'CARDSINDICATORSBR/dashboards_TDMP_MLB/micro_tc_mlb.html'
GCS_URL    = f'https://storage.googleapis.com/{GCS_BUCKET}/{GCS_OBJECT}'
PROJECT    = 'meli-bi-data'


# ── SQL (copiado de dash_server.py) ───────────────────────────────────────────

MAIN_DIMS = [
    "safra_encendido", "safra_convertido",
    "FLAG_CONVERSAO", "FLAG_REENCENDIDO",
    "GRUPO_ESPECIAL", "FLAG_NISE", "FLAG_CANAL", "FLAG_APP_ATIVO",
    "FLAG_PERFIL_USUARIO", "FLAG_PROP_CC_MICRO",
    "FLAG_CANAL_AQUISICAO", "FLAG_CANAL_AQUISICAO_SIMP",
    "FLAG_SELLERS", "FX_PROPOSTA_ENC",
    "alcance_limite_tc_vs_limite_scr", "origem_canal",
    "repeats_status", "flag_cc_new_activation",
    "limite_tarjeta",
    "rating_char_V6", "rating_mtc_xyz",
]
MAIN_METRICS = ["qtd_encendidos", "qtd_convertidos", "limite_scr"]
_dim_list  = ", ".join(MAIN_DIMS)
_sum_list  = ", ".join(f"SUM({m}) AS {m}" for m in MAIN_METRICS)
SQL_PRINCIPAL = (
    f"SELECT {_dim_list}, {_sum_list} "
    f"FROM `meli-bi-data.SBOX_CREDITSTC.DASHBOARD_MICRO_TC_MLB` "
    f"WHERE FLAG_FILTRO = 1 "
    f"GROUP BY {_dim_list}"
)

SQL_COHORT = (
    "SELECT * FROM `meli-bi-data.SBOX_CREDITSTC.BD_MICRO_TC_COHORT_ANL_GRAD_CUBO`"
    " WHERE SAFRA_AQUISICAO >= '202501'"
)

SQL_TS_ENC = (
    "SELECT CAST(DT_ENCENDIDO AS STRING) AS dt, SUM(qtd_encendidos) AS qtd "
    "FROM `meli-bi-data.SBOX_CREDITSTC.DASHBOARD_MICRO_TC_MLB` "
    "WHERE FLAG_FILTRO = 1 "
    "  AND DT_ENCENDIDO >= DATE_SUB(CURRENT_DATE(), INTERVAL 180 DAY) "
    "GROUP BY dt ORDER BY dt"
)

SQL_TS_CONV = (
    "SELECT CAST(DT_CONV AS STRING) AS dt, SUM(qtd_convertidos) AS qtd "
    "FROM `meli-bi-data.SBOX_CREDITSTC.DASHBOARD_MICRO_TC_MLB` "
    "WHERE FLAG_FILTRO = 1 "
    "  AND FLAG_CONVERSAO = '1. Convertido' "
    "  AND DT_CONV >= DATE_SUB(CURRENT_DATE(), INTERVAL 180 DAY) "
    "GROUP BY dt ORDER BY dt"
)

SQL_CROSSCC = (
    "SELECT * FROM `meli-bi-data.SBOX_CREDITSTC.BD_MICRO_TC_CROSS_CC_COHORT_CROSS_CC`"
    " WHERE SAFRA_AQUISICAO3 >= '202501'"
)

_prim_cols = (
    ["SAFRA_AQUISICAO_3", "FILTRO_SAFRA_USO_ADQ3",
     "FLAG_MARABERTO", "FLAG_CANAL_AQUISICAO", "FX_LIMITE_ATU",
     "FLAG_PROP_CC", "NISE", "FLAG_IU", "FLAG_SOLICITACAO_FISICO",
     "FLAG_PERFIL_USUARIO", "FLAG_FISICO", "QTDE_MOB_ATV3",
     "NUNCA_ATIVO3", "V_NUNCA_ATIVO3", "F_NUNCA_ATIVO3", "N_NUNCA_ATIVO3"]
    + [f"PRIM_USO_MOB{i}" for i in range(13)]
    + [f"V_PRIM_USO_MOB{i}" for i in range(13)]
    + [f"F_PRIM_USO_MOB{i}" for i in range(13)]
    + [f"N_PRIM_USO_MOB{i}" for i in range(13)]
)
SQL_PRIMUSO = (
    "SELECT " + ", ".join(f"`{c}`" for c in _prim_cols) +
    " FROM `meli-bi-data.SBOX_CREDITSTC.BD_MICRO_TC_MOB_PRIM_USO`"
    " WHERE SAFRA_AQUISICAO_3 >= '202501'"
)

SQL_OVER_EMIT = """
SELECT
  FORMAT_DATE('%Y%m', A.DT_CONV) AS SAFRA_CONVERTIDO,
  CASE
    WHEN char_tc.rating_tc LIKE '%A%' OR char_tc.rating_tc LIKE '%B%' THEN 'A - B'
    WHEN char_tc.rating_tc LIKE '%C%' THEN 'C'
    WHEN char_tc.rating_tc LIKE '%D%' THEN 'D'
    WHEN char_tc.rating_tc LIKE '%J%' THEN 'J1'
    WHEN char_tc.rating_tc IS NULL    THEN 'SEM RTG'
    ELSE 'OUTROS'
  END AS RATING_CHAR,
  COUNT(DISTINCT A.CUS_CUST_ID)           AS QTDE_CONVERTIDOS,
  SUM(IFNULL(DEUDA.DEUDA_OVER30_MOB3, 0)) AS DEUDA_OVER30_MOB3,
  SUM(IFNULL(DEUDA.DEUDA_OVER6_MOB1,  0)) AS DEUDA_OVER6_MOB1,
  SUM(IFNULL(DEUDA.DEUDA_OVER15_MOB2, 0)) AS DEUDA_OVER15_MOB2,
  SUM(IFNULL(DEUDA.DEUDA_MOB1, 0))        AS DEUDA_MOB1,
  SUM(IFNULL(DEUDA.DEUDA_MOB2, 0))        AS DEUDA_MOB2,
  SUM(IFNULL(DEUDA.DEUDA_MOB3, 0))        AS DEUDA_MOB3
FROM `meli-bi-data.SBOX_CARDSINDICATORSBR.PROPOSAL_TC_MLB` AS A
LEFT JOIN (
  SELECT CUS_CUST_ID,
    SUM(DEUDA_OVER6_MOB1)  AS DEUDA_OVER6_MOB1,
    SUM(DEUDA_MOB1)        AS DEUDA_MOB1,
    SUM(DEUDA_OVER15_MOB2) AS DEUDA_OVER15_MOB2,
    SUM(DEUDA_MOB2)        AS DEUDA_MOB2,
    SUM(DEUDA_OVER30_MOB3) AS DEUDA_OVER30_MOB3,
    SUM(DEUDA_MOB3)        AS DEUDA_MOB3
  FROM `meli-bi-data.SBOX_CREDITS_SB.RBA_TC_MLB_OVER_MENSUAL`
  GROUP BY 1
) AS DEUDA ON A.CUS_CUST_ID = DEUDA.CUS_CUST_ID
LEFT JOIN `meli-bi-data.SBOX_CARDSINDICATORSBR.RTG_CHAR_TC_MLB` AS char_tc
  ON char_tc.CUS_CUST_ID  = A.CUS_CUST_ID
 AND A.DT_ENCENDIDO       >= char_tc.fecha_rating
 AND A.DT_ENCENDIDO        < char_tc.prox_fecha_rating
WHERE FORMAT_DATE('%Y%m', A.DT_CONV) >= FORMAT_DATE('%Y%m', DATE_SUB(CURRENT_DATE(), INTERVAL 14 MONTH))
  AND A.FLAG_CONVERSAO = '1. Convertido'
  AND A.FLAG_TC        = '2. Micro TC'
GROUP BY 1, 2
"""

# Mapeamento label BQ → chave JS (mesmo de dash_server.py LABEL_TO_KEY)
LABEL_TO_KEY = {
    "Principal": "main",
    "Cohort":    "cohort",
    "Cross CC":  "crosscc",
    "1º Uso":    "primuso",
    "TS Enc":    "tsenc",
    "TS Conv":   "tsconv",
    "Over Emit": "overemit",
}

SQL_MAP = {
    "Principal": SQL_PRINCIPAL,
    "Cohort":    SQL_COHORT,
    "Cross CC":  SQL_CROSSCC,
    "1º Uso":    SQL_PRIMUSO,
    "TS Enc":    SQL_TS_ENC,
    "TS Conv":   SQL_TS_CONV,
    "Over Emit": SQL_OVER_EMIT,
}


# ── BQ Client ─────────────────────────────────────────────────────────────────

def get_bq_client():
    import google.auth.transport.requests
    from google.oauth2.credentials import Credentials
    from google.cloud import bigquery

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
    return bigquery.Client(project=PROJECT, credentials=creds)


def run_query(client, label, sql):
    t0 = time.time()
    print(f'  [{label}] iniciando...', flush=True)
    try:
        job    = client.query(sql)
        result = job.result(timeout=600)
        cols   = [f.name for f in result.schema]
        rows   = []
        for row in result:
            rows.append([
                v.isoformat() if hasattr(v, 'isoformat') else v
                for v in [row[c] for c in cols]
            ])
        print(f'  [{label}] OK — {len(rows):,} linhas em {time.time()-t0:.1f}s', flush=True)
        return {'cols': cols, 'rows': rows}
    except Exception as e:
        print(f'  [{label}] ERRO: {e}', flush=True)
        return None


# ── Build HTML ────────────────────────────────────────────────────────────────

STATIC_CHECK_JS = """\
  // ── Dados pré-computados (GCS estático) ─────────────────────────────────
  if (window.MTC_STATIC_DATA && !forceRefresh) {
    updateMsg('Carregando dados pré-computados… (' + (window.MTC_STATIC_DATE || '') + ')');
    loadData(window.MTC_STATIC_DATA);
    addRefreshButton(Date.now());
    return;
  }

"""

CACHE_MARKER = "  // ── Verificar cache ──"


def build_html(data):
    html  = TEMPLATE.read_text(encoding='utf-8')
    ts    = int(time.time())
    date_str = datetime.now().strftime('%d/%m/%Y %H:%M')

    # Injeta verificação de dados estáticos antes do cache check
    if CACHE_MARKER in html:
        html = html.replace(CACHE_MARKER, STATIC_CHECK_JS + CACHE_MARKER, 1)
    else:
        print('AVISO: marcador de cache não encontrado — dados serão injetados mas check não garante prioridade')

    # Injeta dados antes de </body>
    data_json = json.dumps(data, ensure_ascii=False, default=str)
    inject = (
        f'<script>\n'
        f'window.MTC_STATIC_DATA = {data_json};\n'
        f'window.MTC_STATIC_DATE = "{date_str}";\n'
        f'</script>\n'
    )
    html = html.replace('</body>', inject + '</body>', 1)

    # Cache-busting
    html = html.replace('</head>', f'<meta name="cache-ts" content="{ts}">\n</head>', 1)
    return html


# ── GCS publish ───────────────────────────────────────────────────────────────

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
    return storage.Client(project=PROJECT, credentials=creds)


def publish(html):
    dados = html.encode('utf-8')
    print(f'Publicando no GCS ({len(dados)//1024} KB)...', flush=True)
    client = get_gcs_client()
    blob   = client.bucket(GCS_BUCKET).blob(GCS_OBJECT)
    blob.upload_from_string(dados, content_type='text/html; charset=utf-8')
    blob.cache_control = 'no-cache, max-age=0'
    blob.patch()
    print(f'Publicado: {GCS_URL}', flush=True)


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    print('=== MTC → GCS Estático ===', flush=True)
    client = get_bq_client()
    print('BigQuery client OK', flush=True)

    data = {}
    for label, sql in SQL_MAP.items():
        result = run_query(client, label, sql)
        if result:
            key = LABEL_TO_KEY[label]
            data[key] = result

    print(f'\nQueries concluídas: {list(data.keys())}', flush=True)

    if 'main' not in data:
        print('ERRO FATAL: query Principal falhou — abortando', flush=True)
        sys.exit(1)

    html = build_html(data)
    publish(html)
    print('Concluído.', flush=True)


if __name__ == '__main__':
    main()
