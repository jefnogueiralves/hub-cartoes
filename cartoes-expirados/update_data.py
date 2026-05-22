#!/usr/bin/env python3
"""
update_data.py — Extrai dados do BigQuery e gera dashboard_data.js
Executado pelo GitHub Actions no hub-cartoes repo.
"""
import json, os, sys
from datetime import datetime, date
from pathlib import Path

BASE_DIR  = Path(__file__).resolve().parent
OUTPUT_JS = BASE_DIR / "dashboard_data.js"

ANL_TABLE  = "meli-bi-data.SBOX_CREDITSTC.CARTAO_EXPIRADO_ANL_IA"
CUBO_TABLE = "meli-bi-data.SBOX_CREDITSTC.CARTAO_EXPIRADO_CUBO_IA"
PROJECT    = "meli-bi-data"


def log(msg):
    print(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] {msg}", flush=True)


def get_bq_client():
    creds_path = (
        os.environ.get('GOOGLE_APPLICATION_CREDENTIALS')
        or os.path.expanduser(
            r'~\AppData\Roaming\gcloud\application_default_credentials.json'
            if sys.platform == 'win32'
            else '~/.config/gcloud/application_default_credentials.json'
        )
    )
    import google.auth.transport.requests
    from google.oauth2.credentials import Credentials
    from google.cloud import bigquery

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


def query(client, sql):
    return list(client.query(sql).result())


Q_MONTHLY = f"""
SELECT
  EXPIRATION_DATE                                              AS safra,
  FORMAT_DATE('%b/%y', DATE(CONCAT(EXPIRATION_DATE, '-01'))) AS mes,
  SUM(QTDE_RENOVADOS)   AS ren,
  SUM(QTDE_REEMITIDOS)  AS rei,
  SUM(QTDE_ENTREGUE)    AS ent,
  AVG(DIAS_ENTREGA_V2)  AS dm,
  SUM(QTDE_TOTAL)       AS tel
FROM `{ANL_TABLE}`
WHERE FLAG_GRUPO = 'GRUPO1'
GROUP BY 1, 2
ORDER BY 1
"""

Q_FUNIL = f"""
SELECT
  EXPIRATION_DATE AS safra,
  SUM(BASE_RENOVACAO)   AS base,
  SUM(QTDE_ENTREGUE)    AS entregue,
  SUM(ATIVADOS_TC)      AS atv_tc,
  SUM(ATIVOS_TC)        AS ativ_tc,
  SUM(ATIVOS_TD)        AS ativ_td,
  SUM(ATIVOS_FISICO)    AS ativ_fis,
  SUM(TPV_TC)           AS tpv_tc,
  SUM(TPV_TD)           AS tpv_td
FROM `{CUBO_TABLE}`
WHERE FLAG_GRUPO = 'GRUPO1'
GROUP BY 1
ORDER BY 1
"""


def main():
    log("Iniciando extração BQ — Cartões Expirados")
    client = get_bq_client()
    log("BigQuery client OK")

    log("Executando Q_MONTHLY...")
    monthly = [dict(r) for r in query(client, Q_MONTHLY)]
    log(f"  {len(monthly)} linhas")

    log("Executando Q_FUNIL...")
    funil = [dict(r) for r in query(client, Q_FUNIL)]
    log(f"  {len(funil)} linhas")

    def serial(v):
        if isinstance(v, (date, datetime)):
            return str(v)
        if hasattr(v, 'isoformat'):
            return v.isoformat()
        return v

    data = {
        "monthly": [{k: serial(vv) for k, vv in row.items()} for row in monthly],
        "funil":   [{k: serial(vv) for k, vv in row.items()} for row in funil],
        "updated": datetime.now().strftime("%d/%m/%Y %H:%M"),
    }

    js = f"const CARTOES_DATA = {json.dumps(data, ensure_ascii=False, default=str)};\n"
    OUTPUT_JS.write_text(js, encoding='utf-8')
    log(f"dashboard_data.js gerado ({OUTPUT_JS.stat().st_size // 1024} KB)")


if __name__ == '__main__':
    main()
