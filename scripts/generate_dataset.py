"""
generate_dataset.py â CartÃµes Expirados
Queries BigQuery â gera cartoes_dataset.json para publicaÃ§Ã£o no Grid Dataset.

Usado pelo GitHub Actions:
  python scripts/generate_dataset.py

SaÃ­da: cartoes_dataset.json na raiz do repo
(array com 1 elemento contendo todos os vars do dashboard_data.js)
"""

import sys, io, os, json, logging
from pathlib import Path
from datetime import datetime

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

# ââ Tabelas BigQuery âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
ANL_TABLE    = "meli-bi-data.SBOX_CREDITSTC.CARTAO_EXPIRADO_ANL_IA"
CUBO_TABLE   = "meli-bi-data.SBOX_CREDITSTC.CARTAO_EXPIRADO_CUBO_IA"
GRAFICO_TABLE = "meli-bi-data.SBOX_CREDITSTC.BD_CART_EXPIRADO_GRAFICO"
PROJECT      = "meli-bi-data"

MES_PT = {'Jan':'Jan','Feb':'Fev','Mar':'Mar','Apr':'Abr','May':'Mai',
          'Jun':'Jun','Jul':'Jul','Aug':'Ago','Sep':'Set','Oct':'Out',
          'Nov':'Nov','Dec':'Dez'}

logging.basicConfig(level=logging.INFO,
    format="%(asctime)s  %(levelname)-7s  %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)])
log = logging.getLogger(__name__)


# ââ Auth âââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
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

    import google.auth
    creds, _ = google.auth.default(
        scopes=['https://www.googleapis.com/auth/cloud-platform'])
    return creds


# ââ Helpers ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
def fmt_mes(mes_str):
    parts = str(mes_str).split("/")
    if len(parts) == 2:
        return MES_PT.get(parts[0], parts[0]) + "/" + parts[1]
    return str(mes_str)

def n(v):
    if v is None: return 0
    try: return round(float(v), 2) if '.' in str(v) else int(v)
    except: return 0

def bq_query(client, sql, retries=4):
    import time
    waits = [30, 60, 120, 180]
    for attempt in range(retries):
        try:
            return list(client.query(sql).result(timeout=900))
        except Exception as e:
            err = str(e)
            retryable = any(x in err for x in (
                'Quota exceeded','quotaExceeded','ConnectionResetError',
                'Connection aborted','RetryError','ServiceUnavailable',
                'Timeout','timed out'))
            if retryable and attempt < retries - 1:
                wait = waits[attempt]
                log.warning(f"BQ transitÃ³rio ({attempt+1}/{retries}), aguardando {wait}s: {err[:60]}")
                time.sleep(wait)
            else:
                raise


# ââ Queries (copiadas de update_data.py) âââââââââââââââââââââââââââââââââââââââ
Q_MONTHLY = f"""
SELECT
  EXPIRATION_DATE AS safra,
  FORMAT_DATE('%b/%y', DATE(CONCAT(EXPIRATION_DATE, '-01'))) AS mes,
  SUM(QTDE_RENOVADOS) AS ren,
  SUM(QTDE_REEMITIDOS) AS rei,
  SUM(QTDE_ENTREGUE) AS ent,
  AVG(DIAS_ENTREGA_V2) AS dm,
  SUM(QTDE_TOTAL) AS tel
FROM `{ANL_TABLE}`
WHERE FLAG_GRUPO = 'GRUPO1'
  AND EXPIRATION_DATE <= FORMAT_DATE('%Y-%m', CURRENT_DATE())
GROUP BY 1, 2 ORDER BY 1"""

Q_FUNIL = f"""
SELECT
  REPLACE(EXPIRATION_DATE, '-', '') AS safra,
  SUM(QTDE_RENOVADOS + QTDE_REEMITIDOS) AS base,
  SUM(QTDE_ENTREGUE) AS entregue,
  SUM(QTDE_DESBLOQUEADO) AS ativados,
  SUM(QTDE_ATIVO_TC) AS ativos_tc,
  SUM(QTDE_ATIVO_TD) AS ativos_td,
  SUM(COALESCE(QTDE_ATIVO_FISICO, 0)) AS ativos_fisico,
  SUM(TPV_TC_POS) AS tpv_tc,
  SUM(TPV_TD_POS) AS tpv_td,
FROM `{CUBO_TABLE}`
WHERE FLAG_GRUPO = 'GRUPO1'
  AND EXPIRATION_DATE <= FORMAT_DATE('%Y-%m', CURRENT_DATE())
GROUP BY 1 ORDER BY 1"""

Q_SPENDING = f"""
SELECT
  REPLACE(EXPIRATION_DATE, '-', '') AS safra,
  SUM(TPV_TC_PRE) AS tpv_tc_antes,
  SUM(TPV_TD_PRE) AS tpv_td_antes,
FROM `{CUBO_TABLE}`
WHERE FLAG_GRUPO = 'GRUPO1'
  AND EXPIRATION_DATE <= FORMAT_DATE('%Y-%m', CURRENT_DATE())
GROUP BY 1 ORDER BY 1"""

Q_CICLO = f"""
SELECT
  REPLACE(EXPIRATION_DATE, '-', '') AS safra,
  SUM(CASE WHEN FLAG_CICLO_USO_PROD = '01. 1 A 30 D'      THEN QTDE_RENOVADOS + QTDE_REEMITIDOS ELSE 0 END) AS c1,
  SUM(CASE WHEN FLAG_CICLO_USO_PROD = '02. 31 A 60 D'      THEN QTDE_RENOVADOS + QTDE_REEMITIDOS ELSE 0 END) AS c2,
  SUM(CASE WHEN FLAG_CICLO_USO_PROD = '03. 61 A 90 D'      THEN QTDE_RENOVADOS + QTDE_REEMITIDOS ELSE 0 END) AS c3,
  SUM(CASE WHEN FLAG_CICLO_USO_PROD = '04. 91 A 120 D'     THEN QTDE_RENOVADOS + QTDE_REEMITIDOS ELSE 0 END) AS c4,
  SUM(CASE WHEN FLAG_CICLO_USO_PROD = '05. 121 A 180 D'    THEN QTDE_RENOVADOS + QTDE_REEMITIDOS ELSE 0 END) AS c5,
  SUM(CASE WHEN FLAG_CICLO_USO_PROD = '06. ACIMA DE 180 D' THEN QTDE_RENOVADOS + QTDE_REEMITIDOS ELSE 0 END) AS c6,
  SUM(CASE WHEN FLAG_CICLO_USO_PROD = '07. NAO ATIVO'      THEN QTDE_RENOVADOS + QTDE_REEMITIDOS ELSE 0 END) AS c7,
FROM `{ANL_TABLE}`
WHERE FLAG_GRUPO = 'GRUPO1'
GROUP BY 1 ORDER BY 1"""

Q_TOTAL_G1 = f"""
SELECT REPLACE(EXPIRATION_DATE, '-', '') AS safra, SUM(QTDE_TOTAL) AS total
FROM `{ANL_TABLE}` WHERE FLAG_GRUPO = 'GRUPO1' GROUP BY 1 ORDER BY 1"""

Q_DIAS_V2 = f"""
SELECT
  REPLACE(EXPIRATION_DATE, '-', '') AS safra,
  CAST(DIAS_ENTREGA_V2 AS STRING) AS dias,
  COUNT(*) AS qtde
FROM `{ANL_TABLE}`
WHERE FLAG_GRUPO = 'GRUPO1'
  AND DIAS_ENTREGA_V2 IS NOT NULL AND DIAS_ENTREGA_V2 > 0
GROUP BY 1, 2 ORDER BY 1, SAFE_CAST(dias AS INT64)"""

Q_ENTREGA_CICLO = f"""
SELECT
  REPLACE(EXPIRATION_DATE, '-', '') AS safra,
  FLAG_CICLO_USO_PROD AS ciclo_uso,
  DIAS_ENTREGA AS faixa_entrega,
  COUNT(*) AS total,
  SUM(QTDE_ENTREGUE) AS entregue
FROM `{ANL_TABLE}` WHERE FLAG_GRUPO = 'GRUPO1'
GROUP BY 1, 2, 3 ORDER BY 1, 2, 3"""

Q_TOTAL_G2 = f"""
SELECT REPLACE(EXPIRATION_DATE, '-', '') AS safra, SUM(QTDE_TOTAL) AS total
FROM `{ANL_TABLE}` WHERE FLAG_GRUPO = 'GRUPO2' GROUP BY 1 ORDER BY 1"""

Q_MONTHLY_G2 = f"""
SELECT
  FORMAT_DATE('%b/%y', DATE(CONCAT(EXPIRATION_DATE, '-01'))) AS mes,
  SUM(QTDE_RENOVADOS) AS ren,
  SUM(QTDE_REEMITIDOS) AS rei,
  SUM(QTDE_TOTAL) AS tel,
FROM `{ANL_TABLE}` WHERE FLAG_GRUPO = 'GRUPO2'
GROUP BY 1, EXPIRATION_DATE ORDER BY EXPIRATION_DATE"""

Q_MONTHLY_PROD = f"""
SELECT
  FORMAT_DATE('%b/%y', DATE(CONCAT(EXPIRATION_DATE, '-01'))) AS mes,
  FLAG_PROD AS produto,
  SUM(QTDE_RENOVADOS) AS ren,
  SUM(QTDE_REEMITIDOS) AS rei,
FROM `{ANL_TABLE}` WHERE FLAG_GRUPO = 'GRUPO1'
GROUP BY 1, 2, EXPIRATION_DATE ORDER BY EXPIRATION_DATE, FLAG_PROD"""

Q_SUMARIO = f"""
SELECT
  FLAG_CICLO_USO_PROD AS ciclo,
  SUM(QTDE_TOTAL) AS qtde_total,
  SUM(QTDE_RENOVADOS) AS qtde_renovados,
  SUM(QTDE_REEMITIDOS) AS qtde_reemitidos,
  SUM(QTDE_RENOVADOS + QTDE_REEMITIDOS) AS qtde_total_renov,
  SUM(QTDE_ENTREGUE) AS qtde_entregue,
  SUM(QTDE_DESBLOQUEADO) AS qtde_desbloqueado,
FROM `{ANL_TABLE}` GROUP BY 1 ORDER BY 1"""

Q_MONTHLY_G2_SEG = f"""
SELECT
  FLAG_SELLER AS seller,
  FORMAT_DATE('%b/%y', DATE(CONCAT(EXPIRATION_DATE, '-01'))) AS mes,
  SUM(QTDE_RENOVADOS) AS ren,
  SUM(QTDE_REEMITIDOS) AS rei,
  SUM(QTDE_TOTAL) AS tel
FROM `{ANL_TABLE}`
WHERE FLAG_GRUPO = 'GRUPO2'
  AND EXPIRATION_DATE <= FORMAT_DATE('%Y-%m', CURRENT_DATE())
GROUP BY 1, 2, EXPIRATION_DATE ORDER BY EXPIRATION_DATE, FLAG_SELLER"""

Q_MONTHLY_SEG = f"""
SELECT FLAG_SELLER AS seller, EXPIRATION_DATE AS safra,
  FORMAT_DATE('%b/%y', DATE(CONCAT(EXPIRATION_DATE, '-01'))) AS mes,
  SUM(QTDE_RENOVADOS) AS ren, SUM(QTDE_REEMITIDOS) AS rei,
  SUM(QTDE_ENTREGUE) AS ent, AVG(DIAS_ENTREGA_V2) AS dm, SUM(QTDE_TOTAL) AS tel
FROM `{ANL_TABLE}`
WHERE FLAG_GRUPO = 'GRUPO1'
  AND EXPIRATION_DATE <= FORMAT_DATE('%Y-%m', CURRENT_DATE())
GROUP BY 1, 2, 3 ORDER BY 2, 1"""

Q_TOTAL_G1_SEG = f"""
SELECT FLAG_SELLER AS seller, REPLACE(EXPIRATION_DATE, '-', '') AS safra,
  SUM(QTDE_TOTAL) AS total
FROM `{ANL_TABLE}` WHERE FLAG_GRUPO = 'GRUPO1' GROUP BY 1, 2 ORDER BY 1, 2"""

Q_TOTAL_G2_SEG = f"""
SELECT FLAG_SELLER AS seller, REPLACE(EXPIRATION_DATE, '-', '') AS safra,
  SUM(QTDE_TOTAL) AS total
FROM `{ANL_TABLE}` WHERE FLAG_GRUPO = 'GRUPO2' GROUP BY 1, 2 ORDER BY 1, 2"""

Q_CICLO_SEG = f"""
SELECT FLAG_SELLER AS seller, REPLACE(EXPIRATION_DATE, '-', '') AS safra,
  SUM(CASE WHEN FLAG_CICLO_USO_PROD = '01. 1 A 30 D'      THEN QTDE_RENOVADOS + QTDE_REEMITIDOS ELSE 0 END) AS c1,
  SUM(CASE WHEN FLAG_CICLO_USO_PROD = '02. 31 A 60 D'      THEN QTDE_RENOVADOS + QTDE_REEMITIDOS ELSE 0 END) AS c2,
  SUM(CASE WHEN FLAG_CICLO_USO_PROD = '03. 61 A 90 D'      THEN QTDE_RENOVADOS + QTDE_REEMITIDOS ELSE 0 END) AS c3,
  SUM(CASE WHEN FLAG_CICLO_USO_PROD = '04. 91 A 120 D'     THEN QTDE_RENOVADOS + QTDE_REEMITIDOS ELSE 0 END) AS c4,
  SUM(CASE WHEN FLAG_CICLO_USO_PROD = '05. 121 A 180 D'    THEN QTDE_RENOVADOS + QTDE_REEMITIDOS ELSE 0 END) AS c5,
  SUM(CASE WHEN FLAG_CICLO_USO_PROD = '06. ACIMA DE 180 D' THEN QTDE_RENOVADOS + QTDE_REEMITIDOS ELSE 0 END) AS c6,
  SUM(CASE WHEN FLAG_CICLO_USO_PROD = '07. NAO ATIVO'      THEN QTDE_RENOVADOS + QTDE_REEMITIDOS ELSE 0 END) AS c7
FROM `{ANL_TABLE}` WHERE FLAG_GRUPO = 'GRUPO1' GROUP BY 1, 2 ORDER BY 1, 2"""

Q_FUNIL_SEG = f"""
SELECT FLAG_SELLER AS seller, REPLACE(EXPIRATION_DATE, '-', '') AS safra,
  SUM(QTDE_RENOVADOS + QTDE_REEMITIDOS) AS base,
  SUM(QTDE_ENTREGUE) AS entregue, SUM(QTDE_DESBLOQUEADO) AS ativados,
  SUM(QTDE_ATIVO_TC) AS ativos_tc, SUM(QTDE_ATIVO_TD) AS ativos_td,
  SUM(COALESCE(QTDE_ATIVO_FISICO, 0)) AS ativos_fisico,
  SUM(TPV_TC_POS) AS tpv_tc, SUM(TPV_TD_POS) AS tpv_td
FROM `{CUBO_TABLE}`
WHERE FLAG_GRUPO = 'GRUPO1'
  AND EXPIRATION_DATE <= FORMAT_DATE('%Y-%m', CURRENT_DATE())
GROUP BY 1, 2 ORDER BY 1, 2"""

Q_SPENDING_SEG = f"""
SELECT FLAG_SELLER AS seller, REPLACE(EXPIRATION_DATE, '-', '') AS safra,
  SUM(TPV_TC_PRE) AS tpv_tc_antes, SUM(TPV_TD_PRE) AS tpv_td_antes
FROM `{CUBO_TABLE}`
WHERE FLAG_GRUPO = 'GRUPO1'
  AND EXPIRATION_DATE <= FORMAT_DATE('%Y-%m', CURRENT_DATE())
GROUP BY 1, 2 ORDER BY 1, 2"""

Q_REEMISSAO_MOTIVO = f"""
SELECT
  REPLACE(a.EXPIRATION_DATE, '-', '') AS safra,
  a.FLAG_GRUPO,
  COALESCE(a.FLAG_SELLER, 'INDIVIDUO') AS seller,
  CASE
    WHEN c.CARD_STATUS_USER_PREFERENCE_REASON IN ('stolen_card') THEN 'Roubo/Furto'
    WHEN c.CARD_STATUS_USER_PREFERENCE_REASON IN ('lost_card') THEN 'Perda'
    WHEN c.CARD_STATUS_USER_PREFERENCE_REASON IN ('compromised_account','inactive-compromised_card','inactive-compromised_account') THEN 'Fraude'
    WHEN c.CARD_STATUS_USER_PREFERENCE_REASON IN ('not_working_card') THEN 'Defeito'
    WHEN c.CARD_STATUS_USER_PREFERENCE_REASON IN ('inactive-user_requested','user_requested','user_requested_for_reissue','inactive-user_requested_by_chargeback') THEN 'SolicitaÃ§Ã£o UsuÃ¡rio'
    ELSE 'ExpiraÃ§Ã£o Normal'
  END AS motivo,
  SUM(a.QTDE_REEMITIDOS) AS qtde
FROM `{ANL_TABLE}` a
LEFT JOIN (
  SELECT CUS_CUST_ID, CARD_STATUS_USER_PREFERENCE_REASON
  FROM `meli-bi-data.WHOWNER.LK_MP_CARD`
  WHERE SIT_SITE_ID = 'MLB' AND CARD_BUSINESS_MODE = 'hybrid'
  QUALIFY ROW_NUMBER() OVER (PARTITION BY CUS_CUST_ID ORDER BY CARD_EXPIRATION_YEAR DESC, CARD_EXPIRATION_MONTH DESC) = 1
) c ON a.CUS_CUST_ID = c.CUS_CUST_ID
WHERE a.QTDE_REEMITIDOS > 0
  AND a.EXPIRATION_DATE >= FORMAT_DATE('%Y-%m', DATE_SUB(CURRENT_DATE(), INTERVAL 7 MONTH))
  AND a.EXPIRATION_DATE <  FORMAT_DATE('%Y-%m', CURRENT_DATE())
GROUP BY 1, 2, 3, 4 ORDER BY 1, 2, 3, 4"""

Q_GRAFICO = f"""
SELECT TEAM, EXPIRATION_DATE, DIFF_DIAS, MAX(PERC) AS perc
FROM `{GRAFICO_TABLE}`
WHERE DIFF_DIAS IS NOT NULL
GROUP BY 1, 2, 3 ORDER BY 2, 1, 3"""


# ââ Build dataset ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
def build_dataset(client):
    curr_mes = datetime.now().strftime("%Y-%m")
    dt = datetime.now().strftime("%d/%m/%Y")
    data = {}

    log.info("  MONTHLY...")
    rows = bq_query(client, Q_MONTHLY)
    data["monthly"] = []
    for r in rows:
        safra = str(r.safra)
        completo = safra < curr_mes
        mes = fmt_mes(str(r.mes))
        if not completo:
            mes += "*"
        data["monthly"].append({
            "mes": mes, "completo": completo,
            "ren": n(r.ren), "rei": n(r.rei), "ent": n(r.ent),
            "dm": round(float(r.dm or 0), 2), "tel": n(r.tel),
        })

    log.info("  FUNIL...")
    rows = bq_query(client, Q_FUNIL)
    data["funil"] = [{
        "safra": r.safra, "base": n(r.base), "entregue": n(r.entregue),
        "ativados": n(r.ativados), "ativos_tc": n(r.ativos_tc),
        "ativos_td": n(r.ativos_td), "ativos_fisico": n(r.ativos_fisico),
        "ativos_ambos": 0, "tpv_tc": n(r.tpv_tc), "tpv_td": n(r.tpv_td),
        "tpn_tc": 0, "tpn_td": 0,
        "maps_tc": n(r.ativos_tc), "maps_td": n(r.ativos_td),
    } for r in rows]

    log.info("  SPENDING...")
    rows = bq_query(client, Q_SPENDING)
    data["spending"] = [{
        "safra": r.safra,
        "tpv_tc_antes": round(float(r.tpv_tc_antes or 0), 2),
        "tpv_td_antes": round(float(r.tpv_td_antes or 0), 2),
        "tpn_tc_antes": 0, "tpn_td_antes": 0,
    } for r in rows]

    log.info("  CICLO_SAFRA...")
    rows = bq_query(client, Q_CICLO)
    data["ciclo"] = [{
        "safra": r.safra, "c1": n(r.c1), "c2": n(r.c2), "c3": n(r.c3),
        "c4": n(r.c4), "c5": n(r.c5), "c6": n(r.c6), "c7": n(r.c7),
    } for r in rows]

    log.info("  TOTAL_GRUPO1...")
    rows = bq_query(client, Q_TOTAL_G1)
    data["total_g1"] = {r.safra: n(r.total) for r in rows}

    log.info("  DIAS_ENTREGA_V2...")
    rows = bq_query(client, Q_DIAS_V2)
    dias = {}
    for r in rows:
        s = r.safra
        if s not in dias: dias[s] = {}
        dias[s][r.dias] = n(r.qtde)
    data["dias_v2"] = dias

    log.info("  ENTREGA_CICLO...")
    rows = bq_query(client, Q_ENTREGA_CICLO)
    ec = {}
    for r in rows:
        s, c, f = r.safra, r.ciclo_uso, r.faixa_entrega
        if s not in ec: ec[s] = {}
        if c not in ec[s]: ec[s][c] = {"total": 0, "entregue": 0, "faixas": {}}
        ec[s][c]["total"]    += n(r.total)
        ec[s][c]["entregue"] += n(r.entregue)
        if f: ec[s][c]["faixas"][f] = ec[s][c]["faixas"].get(f, 0) + n(r.total)
    data["entrega_ciclo"] = ec

    log.info("  MONTHLY_PROD...")
    rows = bq_query(client, Q_MONTHLY_PROD)
    mh, md = [], []
    for r in rows:
        mes = fmt_mes(str(r.mes))
        obj = {"mes": mes, "ren": n(r.ren), "rei": n(r.rei)}
        if "CREDITO" in str(r.produto).upper(): mh.append(obj)
        else: md.append(obj)
    data["monthly_hibrido"] = mh
    data["monthly_debito"]  = md

    log.info("  MONTHLY_G2 / TOTAL_G2...")
    rows = bq_query(client, Q_MONTHLY_G2)
    data["monthly_g2"] = [{"mes": fmt_mes(str(r.mes)), "ren": n(r.ren), "rei": n(r.rei), "tel": n(r.tel)} for r in rows]
    rows = bq_query(client, Q_TOTAL_G2)
    data["total_g2"] = {r.safra: n(r.total) for r in rows}

    log.info("  MONTHLY_G2_SEG...")
    rows = bq_query(client, Q_MONTHLY_G2_SEG)
    g2_by_seller = {"TODOS": data["monthly_g2"]}
    for r in rows:
        sel = str(r.seller)
        if sel not in g2_by_seller: g2_by_seller[sel] = []
        g2_by_seller[sel].append({"mes": fmt_mes(str(r.mes)), "ren": n(r.ren), "rei": n(r.rei), "tel": n(r.tel)})
    data["monthly_g2_seg"] = g2_by_seller

    log.info("  SUMARIO...")
    rows = bq_query(client, Q_SUMARIO)
    st = {"qtde_total":0,"qtde_renovados":0,"qtde_reemitidos":0,"qtde_total_renov":0,"qtde_entregue":0,"qtde_desbloqueado":0}
    sc = []
    for r in rows:
        for k in st: st[k] += n(getattr(r, k))
        sc.append({"ciclo": str(r.ciclo), "qtde_total": n(r.qtde_total), "qtde_renovados": n(r.qtde_renovados),
                   "qtde_reemitidos": n(r.qtde_reemitidos), "qtde_total_renov": n(r.qtde_total_renov),
                   "qtde_entregue": n(r.qtde_entregue), "qtde_desbloqueado": n(r.qtde_desbloqueado)})
    data["sumario_total"] = st
    data["sumario_ciclo"] = sc

    log.info("  REEMISSAO_MOTIVO...")
    rows = bq_query(client, Q_REEMISSAO_MOTIVO)
    rm_by_seller = {}
    for r in rows:
        safra, grupo, seller, motivo = str(r.safra), str(r.FLAG_GRUPO), str(r.seller), str(r.motivo)
        qtde = n(r.qtde)
        for sel in [seller, 'TODOS']:
            if sel not in rm_by_seller: rm_by_seller[sel] = {}
            for grp in [grupo, 'TODOS']:
                if grp not in rm_by_seller[sel]: rm_by_seller[sel][grp] = {}
                if safra not in rm_by_seller[sel][grp]: rm_by_seller[sel][grp][safra] = {}
                rm_by_seller[sel][grp][safra][motivo] = rm_by_seller[sel][grp][safra].get(motivo, 0) + qtde
    data["reemissao_motivo"] = rm_by_seller

    log.info("  MONTHLY_SEG...")
    rows = bq_query(client, Q_MONTHLY_SEG)
    mbs_raw = {}
    for r in rows:
        sel = str(r.seller)
        if sel not in mbs_raw: mbs_raw[sel] = []
        safra_str = str(r.safra)
        completo = safra_str < curr_mes
        mes = fmt_mes(str(r.mes))
        if not completo: mes += "*"
        mbs_raw[sel].append({"mes": mes, "completo": completo, "ren": n(r.ren), "rei": n(r.rei),
                              "ent": n(r.ent), "dm": round(float(r.dm or 0), 2), "tel": n(r.tel)})
    monthly_seg = {"TODOS": data["monthly"]}
    for sel in ["INDIVIDUO", "SELLER", "MIXTO"]:
        monthly_seg[sel] = mbs_raw.get(sel, [])
    data["monthly_seg"] = monthly_seg

    log.info("  TOTAL_G1_SEG / TOTAL_G2_SEG...")
    rows = bq_query(client, Q_TOTAL_G1_SEG)
    g1_seg = {"TODOS": data["total_g1"], "INDIVIDUO": {}, "SELLER": {}, "MIXTO": {}}
    for r in rows:
        sel = str(r.seller)
        if sel in g1_seg: g1_seg[sel][str(r.safra)] = n(r.total)
    data["total_g1_seg"] = g1_seg

    rows = bq_query(client, Q_TOTAL_G2_SEG)
    g2_seg = {"TODOS": data["total_g2"], "INDIVIDUO": {}, "SELLER": {}, "MIXTO": {}}
    for r in rows:
        sel = str(r.seller)
        if sel in g2_seg: g2_seg[sel][str(r.safra)] = n(r.total)
    data["total_g2_seg"] = g2_seg

    log.info("  CICLO_SEG / FUNIL_SEG / SPENDING_SEG...")
    rows = bq_query(client, Q_CICLO_SEG)
    cs_raw = {}
    for r in rows:
        sel = str(r.seller)
        if sel not in cs_raw: cs_raw[sel] = []
        cs_raw[sel].append({"safra": str(r.safra), "c1": n(r.c1), "c2": n(r.c2), "c3": n(r.c3),
                             "c4": n(r.c4), "c5": n(r.c5), "c6": n(r.c6), "c7": n(r.c7)})
    ciclo_seg = {"TODOS": data["ciclo"]}
    for sel in ["INDIVIDUO", "SELLER", "MIXTO"]: ciclo_seg[sel] = cs_raw.get(sel, [])
    data["ciclo_seg"] = ciclo_seg

    rows = bq_query(client, Q_FUNIL_SEG)
    fs_raw = {}
    for r in rows:
        sel = str(r.seller)
        if sel not in fs_raw: fs_raw[sel] = []
        fs_raw[sel].append({"safra": str(r.safra), "base": n(r.base), "entregue": n(r.entregue),
                            "ativados": n(r.ativados), "ativos_tc": n(r.ativos_tc),
                            "ativos_td": n(r.ativos_td), "ativos_fisico": n(r.ativos_fisico),
                            "tpv_tc": n(r.tpv_tc), "tpv_td": n(r.tpv_td)})
    funil_seg = {"TODOS": data["funil"]}
    for sel in ["INDIVIDUO", "SELLER", "MIXTO"]: funil_seg[sel] = fs_raw.get(sel, [])
    data["funil_seg"] = funil_seg

    rows = bq_query(client, Q_SPENDING_SEG)
    ss_raw = {}
    for r in rows:
        sel = str(r.seller)
        if sel not in ss_raw: ss_raw[sel] = []
        ss_raw[sel].append({"safra": str(r.safra),
                            "tpv_tc_antes": round(float(r.tpv_tc_antes or 0), 2),
                            "tpv_td_antes": round(float(r.tpv_td_antes or 0), 2)})
    spending_seg = {"TODOS": data["spending"]}
    for sel in ["INDIVIDUO", "SELLER", "MIXTO"]: spending_seg[sel] = ss_raw.get(sel, [])
    data["spending_seg"] = spending_seg

    log.info("  GRAFICO_CAMPANHAS...")
    rows = bq_query(client, Q_GRAFICO)
    grafico = {}
    for r in rows:
        safra, team = str(r.EXPIRATION_DATE), str(r.TEAM)
        if safra not in grafico: grafico[safra] = {}
        if team not in grafico[safra]: grafico[safra][team] = []
        grafico[safra][team].append({"x": int(r.DIFF_DIAS), "y": round(float(r.perc or 0) * 100, 2)})
    data["grafico_campanhas"] = grafico

    # ââ Constantes ââââââââââââââââââââââââââââââââââââââââââââââââ
    PRODS  = ['HIBRIDO', 'PURO DEBITO']
    CICLOS = ['0-30d', '31-60d', '61-90d', '91-120d', '121-180d', '+181d']
    P_W    = {'HIBRIDO': 0.65, 'PURO DEBITO': 0.35}
    C_REN  = {'0-30d': 0.28, '31-60d': 0.05, '61-90d': 0.04, '91-120d': 0.03, '121-180d': 0.04, '+181d': 0.43, 'Inativo': 0.13}
    C_REI  = {'0-30d': 0.06, '31-60d': 0.12, '61-90d': 0.20, '91-120d': 0.24, '121-180d': 0.24, '+181d': 0.14}

    # ââ RAW_DATA ââââââââââââââââââââââââââââââââââââââââââââââââââ
    raw_data = []
    for m in data["monthly"]:
        for prod in PRODS:
            pW = P_W[prod]
            for ciclo in CICLOS:
                raw_data.append({
                    "mes": m["mes"], "prod": prod, "ciclo": ciclo,
                    "ren": round(m["ren"] * pW * C_REN.get(ciclo, 0)),
                    "rei": round(m["rei"] * pW * C_REI.get(ciclo, 0)),
                    "tel": round(m["tel"] * pW / len(CICLOS)),
                    "ent": round(m["ent"] * pW / len(CICLOS)),
                    "dm": m["dm"], "completo": m["completo"],
                })

    # ââ Montar objeto final âââââââââââââââââââââââââââââââââââââââ
    return [{
        "DT_ATUALIZACAO":  dt,
        "MONTHLY":         data["monthly"],
        "SUMARIO_TOTAL":   data["sumario_total"],
        "SUMARIO_CICLO":   data["sumario_ciclo"],
        "FUNIL_DATA":      data["funil"],
        "SPENDING_ANTES":  data["spending"],
        "CICLO_SAFRA":     data["ciclo"],
        "DIAS_ENTREGA_DIST": {},
        "DIAS_ENTREGA_V2": data["dias_v2"],
        "ENTREGA_CICLO":   data["entrega_ciclo"],
        "TOTAL_GRUPO1":    data["total_g1"],
        "TOTAL_GRUPO2":    data["total_g2"],
        "TOTAL_EXPIRADO":  data["total_g1"],
        "MONTHLY_HIBRIDO": data["monthly_hibrido"],
        "MONTHLY_DEBITO":  data["monthly_debito"],
        "MONTHLY_G2":      data["monthly_g2"],
        "MONTHLY_G2_SEG":  data["monthly_g2_seg"],
        "REEMISSAO_MOTIVO": data["reemissao_motivo"],
        "MONTHLY_SEG":     data["monthly_seg"],
        "TOTAL_G1_SEG":    data["total_g1_seg"],
        "TOTAL_G2_SEG":    data["total_g2_seg"],
        "CICLO_SEG":       data["ciclo_seg"],
        "FUNIL_SEG":       data["funil_seg"],
        "SPENDING_SEG":    data["spending_seg"],
        "GRAFICO_CAMPANHAS": data["grafico_campanhas"],
        "PRODS":  PRODS,
        "CICLOS": CICLOS,
        "P_W":    P_W,
        "C_REN":  C_REN,
        "C_REI":  C_REI,
        "RAW_DATA": raw_data,
    }]


def main():
    log.info("=" * 55)
    log.info(f"CartÃµes Expirados â generate_dataset â {datetime.now().strftime('%d/%m/%Y %H:%M')}")

    from google.cloud import bigquery
    creds = get_credentials()
    client = bigquery.Client(project=PROJECT, credentials=creds)

    log.info("Consultando BigQuery...")
    dataset = build_dataset(client)

    out_path = Path(__file__).parent.parent / "cartoes_dataset.json"
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(dataset, f, ensure_ascii=False, separators=(',', ':'))

    size_kb = out_path.stat().st_size // 1024
    log.info(f"Dataset salvo: {out_path} ({size_kb} KB)")
    log.info("=" * 55)


if __name__ == "__main__":
    main()
