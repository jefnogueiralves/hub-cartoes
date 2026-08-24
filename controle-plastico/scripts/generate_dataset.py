"""
generate_dataset.py — Controle Plástico
Queries BigQuery — gera plastico_dataset.json para publicação no Grid Dataset.

Usado pelo GitHub Actions:
  python scripts/generate_dataset.py

Saída: plastico_dataset.json na raiz do repo
"""

import sys, io, os, json, logging, time
from pathlib import Path
from datetime import datetime

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

PROJECT = 'meli-bi-data'
TABLES = {
    'deb':       'meli-bi-data.SBOX_CREDITSTC.BD_CNTR_PLASTICO_DEB',
    'cred':      'meli-bi-data.SBOX_CREDITSTC.BD_CNTR_PLASTICO_CRED',
    'reemissao': 'meli-bi-data.SBOX_CREDITSTC.BD_CNTR_PLASTICO_REEMISSAO',
}
MONTHS_PT = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']

logging.basicConfig(level=logging.INFO,
    format="%(asctime)s  %(levelname)-7s  %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)])
log = logging.getLogger(__name__)


def get_credentials():
    from google.oauth2 import service_account
    from google.oauth2.credentials import Credentials
    import google.auth.transport.requests

    creds_json = os.environ.get('GCP_CREDENTIALS')
    if creds_json:
        cd = json.loads(creds_json)
        if cd.get('type') == 'service_account':
            log.info("Auth: service account via GCP_CREDENTIALS")
            return service_account.Credentials.from_service_account_info(
                cd, scopes=['https://www.googleapis.com/auth/cloud-platform'])
        else:
            creds = Credentials(
                token=None, refresh_token=cd['refresh_token'],
                token_uri='https://oauth2.googleapis.com/token',
                client_id=cd['client_id'], client_secret=cd['client_secret'])
            creds.refresh(google.auth.transport.requests.Request())
            return creds

    # ADC local (com VPN)
    import google.auth
    creds, _ = google.auth.default(
        scopes=['https://www.googleapis.com/auth/cloud-platform'])
    return creds


def bq_query(client, sql, retries=4):
    """Retry com backoff para erros transitorios do BigQuery (ex.: quota de jobs em fila)."""
    waits = [30, 60, 120, 180]
    for attempt in range(retries):
        try:
            return list(client.query(sql).result(timeout=900))
        except Exception as e:
            err = str(e)
            retryable = any(x in err for x in (
                'Quota exceeded', 'quotaExceeded', 'ConnectionResetError',
                'Connection aborted', 'RetryError', 'ServiceUnavailable',
                'Timeout', 'timed out'))
            if retryable and attempt < retries - 1:
                wait = waits[attempt]
                log.warning(f"BQ transitório ({attempt+1}/{retries}), aguardando {wait}s: {err[:60]}")
                time.sleep(wait)
            else:
                raise


def fetch_bq(creds):
    from google.cloud import bigquery
    client = bigquery.Client(project=PROJECT, credentials=creds)
    log.info("Buscando dados no BigQuery...")

    deb_rows   = bq_query(client, f"SELECT * FROM `{TABLES['deb']}`   ORDER BY SAFRA_AQUISICAO")
    cred_rows  = bq_query(client, f"SELECT * FROM `{TABLES['cred']}`  ORDER BY SAFRA_AQUISICAO")
    reemi_rows = bq_query(client, f"SELECT * FROM `{TABLES['reemissao']}` ORDER BY SAFRA_AQUISICAO")
    log.info(f"DEB:{len(deb_rows)} CRED:{len(cred_rows)} REEMISSAO:{len(reemi_rows)} safras")

    cred_map  = {r['SAFRA_AQUISICAO']: r for r in cred_rows}
    reemi_map = {r['SAFRA_AQUISICAO']: r for r in reemi_rows}
    current   = datetime.now().strftime("%Y%m")
    update_date = datetime.now().strftime("%d/%m/%Y")

    rows = []
    for r in deb_rows:
        s = r['SAFRA_AQUISICAO']
        c = cred_map.get(s, {})
        e = reemi_map.get(s, {})
        rows.append({
            'safra':         s,
            'label':         f"{MONTHS_PT[int(s[4:6])-1]}/{s[2:4]}",
            'emissaoTD':     int(r.get('EMT_TD_DEBT_FIRST') or 0),
            'emissaoTC':     int(c.get('EMIT_TC_CRED_FIRST_TOT') or c.get('EMIT_TC_CRED_FIRST') or 0),
            'emissaoTCMicro':int(c.get('EMIT_TC_CRED_FIRST_MICRO') or 0),
            'emissaoTCFull': int(c.get('EMIT_TC_CRED_FIRST_FULL') or 0),
            'reemissaoTotal':int(e.get('QTDE_REEMISSAO_TOT') or 0),
            'reemissaoTD':   int(e.get('QTDE_REEMI_DEBT') or 0),
            'reemissaoTC':   int(e.get('QTDE_REEMI_CREDIT') or 0),
            'tdCreditFirst': int(r.get('EMT_TD_CRED_FIRST') or 0),
            'tcDebitFirst':  int(c.get('EMIT_TC_DEBT_FIRST') or 0),
            'partial':       s == current,
        })
    return rows, update_date


def main():
    log.info("=" * 55)
    log.info(f"Controle Plástico — generate_dataset — {datetime.now().strftime('%d/%m/%Y %H:%M')}")

    creds = get_credentials()
    rows, update_date = fetch_bq(creds)

    # Formato consumido pelo front-end via Grid.dataset('plastico_data').load():
    # ds[0] == {updateDate, rows}, igual ao PLASTICO_DATA inline no index.html.
    dataset = [{"updateDate": update_date, "rows": rows}]

    out_path = Path(__file__).parent.parent / "plastico_dataset.json"
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(dataset, f, ensure_ascii=False, separators=(',', ':'))

    log.info(f"Dataset salvo: {out_path} ({len(rows)} safras, {out_path.stat().st_size} bytes)")
    log.info("=" * 55)


if __name__ == "__main__":
    main()
