"""
update_data.py — Extrai dados do BigQuery e gera dashboard_data.js
Executado por atualizar_e_publicar.py antes do upload para o Grid.
"""
import json
import os
import sys
from datetime import datetime, date
from pathlib import Path

# ── CONFIGURACAO ─────────────────────────────────────────────────────────────
BASE_DIR    = Path(__file__).parent.parent
OUTPUT_JS   = BASE_DIR / "dashboard_data.js"
LOG_FILE    = Path("C:/Users/jefnogueira/logs/cartoes_expirados.log")

# Tabelas BigQuery
ANL_TABLE  = "meli-bi-data.SBOX_CREDITSTC.CARTAO_EXPIRADO_ANL_IA"
CUBO_TABLE = "meli-bi-data.SBOX_CREDITSTC.CARTAO_EXPIRADO_CUBO_IA"
PROJECT    = "meli-bi-data"

# Credenciais ADC — carregadas via arquivo JSON
ADC_PATH = os.environ.get(
    "GOOGLE_APPLICATION_CREDENTIALS",
    os.path.expanduser("~/.config/gcloud/application_default_credentials.json")
)

# ── LOG ────────────────────────────────────────────────────────────────────────
def log(msg):
    ts   = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    line = f"[{ts}] {msg}"
    print(line)
    LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(line + "\n")


# ── BIGQUERY CLIENT ────────────────────────────────────────────────────────────
def get_bq_client():
    from google.auth import default as _gad
    from google.cloud import bigquery
    creds, _ = _gad()
    return bigquery.Client(project=PROJECT, credentials=creds)


def query(client, sql):
    return list(client.query(sql).result())


# ── QUERIES ────────────────────────────────────────────────────────────────────
Q_MONTHLY = f"""
SELECT
  EXPIRATION_DATE                                              AS safra,
  FORMAT_DATE('%b/%y', DATE(CONCAT(EXPIRATION_DATE, '-01'))) AS mes,
  SUM(QTDE_RENOVADOS)                         AS ren,
  SUM(QTDE_REEMITIDOS)                        AS rei,
  SUM(QTDE_ENTREGUE)                          AS ent,
  AVG(DIAS_ENTREGA_V2)                        AS dm,
  SUM(QTDE_TOTAL)                             AS tel
FROM `{ANL_TABLE}`
WHERE FLAG_GRUPO = 'GRUPO1'
  AND EXPIRATION_DATE <= FORMAT_DATE('%Y-%m', CURRENT_DATE())
GROUP BY 1, 2
ORDER BY 1
"""

Q_FUNIL = f"""
SELECT
  REPLACE(EXPIRATION_DATE, '-', '') AS safra,
  SUM(QTDE_RENOVADOS + QTDE_REEMITIDOS)  AS base,
  SUM(QTDE_ENTREGUE)                     AS entregue,
  SUM(QTDE_DESBLOQUEADO)                 AS ativados,
  SUM(QTDE_ATIVO_TC)                     AS ativos_tc,
  SUM(QTDE_ATIVO_TD)                     AS ativos_td,
  SUM(COALESCE(QTDE_ATIVO_FISICO, 0))    AS ativos_fisico,
  SUM(TPV_TC_POS)                        AS tpv_tc,
  SUM(TPV_TD_POS)                        AS tpv_td,
FROM `{CUBO_TABLE}`
WHERE FLAG_GRUPO = 'GRUPO1'
  AND EXPIRATION_DATE <= FORMAT_DATE('%Y-%m', CURRENT_DATE())
GROUP BY 1 ORDER BY 1
"""

Q_SPENDING = f"""
SELECT
  REPLACE(EXPIRATION_DATE, '-', '') AS safra,
  SUM(TPV_TC_PRE)  AS tpv_tc_antes,
  SUM(TPV_TD_PRE)  AS tpv_td_antes,
FROM `{CUBO_TABLE}`
WHERE FLAG_GRUPO = 'GRUPO1'
  AND EXPIRATION_DATE <= FORMAT_DATE('%Y-%m', CURRENT_DATE())
GROUP BY 1 ORDER BY 1
"""

Q_CICLO = f"""
SELECT
  REPLACE(EXPIRATION_DATE, '-', '') AS safra,
  SUM(CASE WHEN FLAG_CICLO_USO_PROD = '01. 1 A 30 D'       THEN QTDE_RENOVADOS + QTDE_REEMITIDOS ELSE 0 END) AS c1,
  SUM(CASE WHEN FLAG_CICLO_USO_PROD = '02. 31 A 60 D'       THEN QTDE_RENOVADOS + QTDE_REEMITIDOS ELSE 0 END) AS c2,
  SUM(CASE WHEN FLAG_CICLO_USO_PROD = '03. 61 A 90 D'       THEN QTDE_RENOVADOS + QTDE_REEMITIDOS ELSE 0 END) AS c3,
  SUM(CASE WHEN FLAG_CICLO_USO_PROD = '04. 91 A 120 D'      THEN QTDE_RENOVADOS + QTDE_REEMITIDOS ELSE 0 END) AS c4,
  SUM(CASE WHEN FLAG_CICLO_USO_PROD = '05. 121 A 180 D'     THEN QTDE_RENOVADOS + QTDE_REEMITIDOS ELSE 0 END) AS c5,
  SUM(CASE WHEN FLAG_CICLO_USO_PROD = '06. ACIMA DE 180 D'  THEN QTDE_RENOVADOS + QTDE_REEMITIDOS ELSE 0 END) AS c6,
  SUM(CASE WHEN FLAG_CICLO_USO_PROD = '07. NAO ATIVO'       THEN QTDE_RENOVADOS + QTDE_REEMITIDOS ELSE 0 END) AS c7,
FROM `{ANL_TABLE}`
WHERE FLAG_GRUPO = 'GRUPO1'
GROUP BY 1 ORDER BY 1
"""

Q_TOTAL_G1 = f"""
SELECT
  REPLACE(EXPIRATION_DATE, '-', '') AS safra,
  SUM(QTDE_TOTAL) AS total
FROM `{ANL_TABLE}`
WHERE FLAG_GRUPO = 'GRUPO1'
GROUP BY 1 ORDER BY 1
"""

Q_MONTHLY_PROD = f"""
SELECT
  FORMAT_DATE('%b/%y', DATE(CONCAT(EXPIRATION_DATE, '-01'))) AS mes,
  FLAG_PROD AS produto,
  SUM(QTDE_RENOVADOS)  AS ren,
  SUM(QTDE_REEMITIDOS) AS rei,
FROM `{ANL_TABLE}`
WHERE FLAG_GRUPO = 'GRUPO1'
GROUP BY 1, 2, EXPIRATION_DATE
ORDER BY EXPIRATION_DATE, FLAG_PROD
"""

Q_DIAS_V2 = f"""
SELECT
  REPLACE(EXPIRATION_DATE, '-', '') AS safra,
  CAST(DIAS_ENTREGA_V2 AS STRING)   AS dias,
  COUNT(*)                           AS qtde
FROM `{ANL_TABLE}`
WHERE FLAG_GRUPO = 'GRUPO1'
  AND DIAS_ENTREGA_V2 IS NOT NULL AND DIAS_ENTREGA_V2 > 0
GROUP BY 1, 2 ORDER BY 1, SAFE_CAST(dias AS INT64)
"""

Q_ENTREGA_CICLO = f"""
SELECT
  REPLACE(EXPIRATION_DATE, '-', '') AS safra,
  FLAG_CICLO_USO_PROD               AS ciclo_uso,
  DIAS_ENTREGA                      AS faixa_entrega,
  COUNT(*)                          AS total,
  SUM(QTDE_ENTREGUE)                AS entregue
FROM `{ANL_TABLE}`
WHERE FLAG_GRUPO = 'GRUPO1'
GROUP BY 1, 2, 3 ORDER BY 1, 2, 3
"""

Q_TOTAL_G2 = f"""
SELECT
  REPLACE(EXPIRATION_DATE, '-', '') AS safra,
  SUM(QTDE_TOTAL) AS total
FROM `{ANL_TABLE}`
WHERE FLAG_GRUPO = 'GRUPO2'
GROUP BY 1 ORDER BY 1
"""

Q_MONTHLY_G2 = f"""
SELECT
  FORMAT_DATE('%b/%y', DATE(CONCAT(EXPIRATION_DATE, '-01'))) AS mes,
  SUM(QTDE_RENOVADOS)  AS ren,
  SUM(QTDE_REEMITIDOS) AS rei,
  SUM(QTDE_TOTAL)      AS tel,
FROM `{ANL_TABLE}`
WHERE FLAG_GRUPO = 'GRUPO2'
GROUP BY 1, EXPIRATION_DATE
ORDER BY EXPIRATION_DATE
"""

Q_SUMARIO = f"""
SELECT
  FLAG_CICLO_USO_PROD                     AS ciclo,
  SUM(QTDE_TOTAL)                         AS qtde_total,
  SUM(QTDE_RENOVADOS)                     AS qtde_renovados,
  SUM(QTDE_REEMITIDOS)                    AS qtde_reemitidos,
  SUM(QTDE_RENOVADOS + QTDE_REEMITIDOS)   AS qtde_total_renov,
  SUM(QTDE_ENTREGUE)                      AS qtde_entregue,
  SUM(QTDE_DESBLOQUEADO)                  AS qtde_desbloqueado,
FROM `{ANL_TABLE}`
WHERE FLAG_GRUPO = 'GRUPO1'
GROUP BY 1 ORDER BY 1
"""

GRAFICO_TABLE = "meli-bi-data.SBOX_CREDITSTC.BD_CART_EXPIRADO_GRAFICO"

Q_GRAFICO = f"""
SELECT
  TEAM,
  EXPIRATION_DATE,
  DIFF_DIAS,
  MAX(PERC) AS perc
FROM `{GRAFICO_TABLE}`
WHERE DIFF_DIAS IS NOT NULL
GROUP BY 1, 2, 3
ORDER BY 2, 1, 3
"""


# ── HELPERS JS ─────────────────────────────────────────────────────────────────
MES_PT = {
    'Jan':'Jan','Feb':'Fev','Mar':'Mar','Apr':'Abr','May':'Mai',
    'Jun':'Jun','Jul':'Jul','Aug':'Ago','Sep':'Set','Oct':'Out',
    'Nov':'Nov','Dec':'Dez',
}

def fmt_mes(mes_str):
    """Converte 'Apr/26' -> 'Abr/26' (formato PT-BR)"""
    parts = str(mes_str).split("/")
    if len(parts) == 2:
        return MES_PT.get(parts[0], parts[0]) + "/" + parts[1]
    return str(mes_str)

def n(v):
    if v is None: return 0
    try: return round(float(v), 2) if '.' in str(v) else int(v)
    except: return 0


# ── GERAR JS ────────────────────────────────────────────────────────────────────
def build_js(data: dict) -> str:
    dt = datetime.now().strftime("%d/%m/%Y")
    lines = [
        "// ═══════════════════════════════════════════════════════════════",
        "//  dashboard_data.js — gerado automaticamente por update_data.py",
        f"//  Última atualização: {dt}",
        f"//  Fonte: {ANL_TABLE}",
        f"//         {CUBO_TABLE}",
        "// ═══════════════════════════════════════════════════════════════",
        "",
        f"// ── DATA DA ÚLTIMA ATUALIZAÇÃO ────────────────────────────────",
        f"const DT_ATUALIZACAO = '{dt}';",
        "",
    ]

    # MONTHLY
    monthly = data["monthly"]
    lines += ["// ── TOTAIS MENSAIS REAIS (BigQuery) ───────────────────────────",
              "const MONTHLY = ["]
    for r in monthly:
        lines.append(f"  {{mes:'{r['mes']}', completo:{str(r['completo']).lower()}, "
                     f"ren:{r['ren']}, rei:{r['rei']}, ent:{r['ent']}, "
                     f"dm:{r['dm']}, tel:{r['tel']}}},")
    lines += ["];", ""]

    # SUMARIO
    lines += ["// ── SUMÁRIO EXECUTIVO ─────────────────────────────────────────",
              "const SUMARIO_TOTAL = {"]
    tot = data.get("sumario_total", {})
    for k, v in tot.items():
        lines.append(f"  {k}:{v},")
    lines += ["};"]
    lines += [f"const SUMARIO_CICLO = {json.dumps(data.get('sumario_ciclo', []), ensure_ascii=False)};", ""]

    # FUNIL_DATA
    funil = data["funil"]
    lines += ["// ── FUNIL DE ATIVAÇÃO PÓS-RENOVAÇÃO ──────────────────────────",
              "const FUNIL_DATA = ["]
    for r in funil:
        lines.append(f"  {{safra:'{r['safra']}', base:{r['base']}, entregue:{r['entregue']}, "
                     f"ativados:{r['ativados']}, ativos_tc:{r['ativos_tc']}, ativos_td:{r['ativos_td']}, "
                     f"ativos_fisico:{r['ativos_fisico']}, ativos_ambos:0, "
                     f"tpv_tc:{r['tpv_tc']}, tpv_td:{r['tpv_td']}, "
                     f"tpn_tc:0, tpn_td:0, "
                     f"maps_tc:{r['ativos_tc']}, maps_td:{r['ativos_td']}}},")
    lines += ["];", ""]

    # SPENDING_ANTES
    spend = data["spending"]
    lines += ["// ── SPENDING ANTES DA RENOVAÇÃO ───────────────────────────────",
              "const SPENDING_ANTES = ["]
    for r in spend:
        lines.append(f"  {{safra:'{r['safra']}', tpv_tc_antes:{r['tpv_tc_antes']}, "
                     f"tpv_td_antes:{r['tpv_td_antes']}, tpn_tc_antes:0, tpn_td_antes:0}},")
    lines += ["];", ""]

    # CICLO_SAFRA
    ciclo = data["ciclo"]
    lines += ["// ── CICLO DE USO POR SAFRA ─────────────────────────────────────",
              "const CICLO_SAFRA = ["]
    for r in ciclo:
        lines.append(f"  {{safra:'{r['safra']}', c1:{r['c1']}, c2:{r['c2']}, c3:{r['c3']}, "
                     f"c4:{r['c4']}, c5:{r['c5']}, c6:{r['c6']}, c7:{r['c7']}}},")
    lines += ["];", ""]

    # DIAS_ENTREGA_DIST (placeholder — V2 tem precedencia)
    lines += ["// ── DISTRIBUIÇÃO DIAS_ENTREGA POR FAIXA/MÊS ──────────────────",
              "const DIAS_ENTREGA_DIST = {};", ""]

    # DIAS_ENTREGA_V2
    dias_v2 = data.get("dias_v2", {})
    lines += ["// ── DISTRIBUIÇÃO DIAS_ENTREGA V2 (dias inteiros do tracking) ──",
              f"const DIAS_ENTREGA_V2 = {json.dumps(dias_v2, ensure_ascii=False)};", ""]

    # ENTREGA_CICLO
    ec = data.get("entrega_ciclo", {})
    lines += ["// ── ENTREGA POR CICLO DE USO ───────────────────────────────────",
              f"const ENTREGA_CICLO = {json.dumps(ec, ensure_ascii=False, indent=2)};", ""]

    # TOTAL_GRUPO1 / TOTAL_GRUPO2
    g1 = data.get("total_g1", {})
    g2 = data.get("total_g2", {})
    lines += [f"const TOTAL_GRUPO1 = {json.dumps(g1)};",
              f"const TOTAL_GRUPO2 = {json.dumps(g2)};",
              f"const TOTAL_EXPIRADO = {json.dumps(g1)};", ""]

    # MONTHLY prod
    mh = data.get("monthly_hibrido", [])
    md = data.get("monthly_debito", [])
    lines += ["// ── BREAKDOWN POR PRODUTO ────────────────────────────────────",
              f"const MONTHLY_HIBRIDO = {json.dumps(mh, ensure_ascii=False)};",
              f"const MONTHLY_DEBITO  = {json.dumps(md, ensure_ascii=False)};", ""]

    # MONTHLY_G2
    mg2 = data.get("monthly_g2", [])
    lines += [f"const MONTHLY_G2 = {json.dumps(mg2, ensure_ascii=False)};", ""]

    # GRAFICO_CAMPANHAS
    gc = data.get("grafico_campanhas", {})
    lines += ["// ── GRÁFICO CURVA ACUMULADA DE RENOVAÇÕES ─────────────────────",
              f"const GRAFICO_CAMPANHAS = {json.dumps(gc, ensure_ascii=False)};", ""]

    # Constantes de peso
    lines += [
        "// ── PESOS E CICLOS ─────────────────────────────────────────────",
        "const PRODS  = ['HIBRIDO', 'PURO DEBITO'];",
        "const CICLOS = ['0-30d','31-60d','61-90d','91-120d','121-180d','+181d'];",
        "const P_W    = {HIBRIDO: 0.65, 'PURO DEBITO': 0.35};",
        "const C_REN  = {'0-30d':0.28, '31-60d':0.05, '61-90d':0.04, '91-120d':0.03, '121-180d':0.04, '+181d':0.43, 'Inativo':0.13};",
        "const C_REI  = {'0-30d':0.06, '31-60d':0.12, '61-90d':0.20, '91-120d':0.24, '121-180d':0.24, '+181d':0.14};",
        "",
        "// ── HELPER ────────────────────────────────────────────────────────",
        "function safraLabel(s) {",
        "  const mm = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];",
        "  return mm[parseInt(s.slice(4,6))-1] + '/' + s.slice(2,4);",
        "}",
        "",
        "// ── RAW_DATA — todas as combinações (mes × produto × ciclo) ──",
        "const RAW_DATA = [];",
        "{",
        "  const C_REN_KEYS = ['0-30d','31-60d','61-90d','91-120d','121-180d','+181d','Inativo'];",
        "  MONTHLY.forEach(m => {",
        "    PRODS.forEach(prod => {",
        "      const pW = P_W[prod];",
        "      CICLOS.forEach(ciclo => {",
        "        RAW_DATA.push({",
        "          mes:m.mes, prod, ciclo,",
        "          ren:Math.round(m.ren*pW*C_REN[ciclo]),",
        "          rei:Math.round(m.rei*pW*C_REI[ciclo]||0),",
        "          tel:Math.round(m.tel*pW/CICLOS.length),",
        "          ent:Math.round(m.ent*pW/CICLOS.length),",
        "          dm:m.dm, completo:m.completo",
        "        });",
        "      });",
        "    });",
        "  });",
        "}",
    ]

    return "\n".join(lines)


# ── MAIN ───────────────────────────────────────────────────────────────────────
def main():
    log("Consultando BigQuery...")
    client = get_bq_client()

    data = {}

    # MONTHLY — completo calculado em Python (EXPIRATION_DATE < mes atual)
    log("  MONTHLY...")
    curr_mes = datetime.now().strftime("%Y-%m")
    rows = query(client, Q_MONTHLY)
    data["monthly"] = []
    for r in rows:
        safra    = str(r.safra)                    # "YYYY-MM"
        completo = safra < curr_mes
        mes      = fmt_mes(str(r.mes))             # "Abr/25"
        if not completo:
            mes += "*"
        data["monthly"].append({
            "mes": mes, "completo": completo,
            "ren": n(r.ren), "rei": n(r.rei), "ent": n(r.ent),
            "dm": round(float(r.dm or 0), 2), "tel": n(r.tel),
        })
    log(f"  MONTHLY: {len(data['monthly'])} safras")

    # FUNIL
    log("  FUNIL...")
    rows = query(client, Q_FUNIL)
    data["funil"] = [{
        "safra": r.safra, "base": n(r.base), "entregue": n(r.entregue),
        "ativados": n(r.ativados), "ativos_tc": n(r.ativos_tc),
        "ativos_td": n(r.ativos_td), "ativos_fisico": n(r.ativos_fisico),
        "tpv_tc": n(r.tpv_tc), "tpv_td": n(r.tpv_td),
    } for r in rows]
    log(f"  FUNIL: {len(data['funil'])} safras")

    # SPENDING
    log("  SPENDING...")
    rows = query(client, Q_SPENDING)
    data["spending"] = [{
        "safra": r.safra,
        "tpv_tc_antes": round(float(r.tpv_tc_antes or 0), 2),
        "tpv_td_antes": round(float(r.tpv_td_antes or 0), 2),
    } for r in rows]
    log(f"  SPENDING: {len(data['spending'])} safras")

    # CICLO_SAFRA
    log("  CICLO_SAFRA...")
    rows = query(client, Q_CICLO)
    data["ciclo"] = [{
        "safra": r.safra, "c1": n(r.c1), "c2": n(r.c2), "c3": n(r.c3),
        "c4": n(r.c4), "c5": n(r.c5), "c6": n(r.c6), "c7": n(r.c7),
    } for r in rows]
    log(f"  CICLO_SAFRA: {len(data['ciclo'])} linhas")

    # TOTAL_GRUPO1
    log("  TOTAL_GRUPO1...")
    rows = query(client, Q_TOTAL_G1)
    data["total_g1"] = {r.safra: n(r.total) for r in rows}
    log(f"  TOTAL_GRUPO1: {len(data['total_g1'])} safras")

    # DIAS_ENTREGA_V2
    log("  DIAS_ENTREGA_V2...")
    rows = query(client, Q_DIAS_V2)
    dias = {}
    for r in rows:
        s = r.safra
        if s not in dias:
            dias[s] = {}
        dias[s][r.dias] = n(r.qtde)
    data["dias_v2"] = dias
    log(f"  DIAS_ENTREGA_V2: {len(dias)} safras")

    # ENTREGA_CICLO
    log("  ENTREGA_CICLO...")
    rows = query(client, Q_ENTREGA_CICLO)
    ec = {}
    for r in rows:
        s = r.safra
        c = r.ciclo_uso
        f = r.faixa_entrega
        if s not in ec:
            ec[s] = {}
        if c not in ec[s]:
            ec[s][c] = {"total": 0, "entregue": 0, "faixas": {}}
        ec[s][c]["total"]   += n(r.total)
        ec[s][c]["entregue"] += n(r.entregue)
        if f:
            ec[s][c]["faixas"][f] = ec[s][c]["faixas"].get(f, 0) + n(r.total)
    data["entrega_ciclo"] = ec
    log(f"  ENTREGA_CICLO: {len(ec)} safras")

    # MONTHLY por produto
    log("  MONTHLY_PROD...")
    rows = query(client, Q_MONTHLY_PROD)
    mh, md = [], []
    for r in rows:
        mes = fmt_mes(str(r.mes))
        obj = {"mes": mes, "ren": n(r.ren), "rei": n(r.rei)}
        if "CREDITO" in str(r.produto).upper():
            mh.append(obj)
        else:
            md.append(obj)
    data["monthly_hibrido"] = mh
    data["monthly_debito"]  = md
    log(f"  MONTHLY_PROD: {len(mh)} hibrido, {len(md)} debito")

    # MONTHLY_G2 e TOTAL_G2
    log("  MONTHLY_G2...")
    rows = query(client, Q_MONTHLY_G2)
    data["monthly_g2"] = [{
        "mes": fmt_mes(str(r.mes)),
        "ren": n(r.ren), "rei": n(r.rei), "tel": n(r.tel)
    } for r in rows]
    rows = query(client, Q_TOTAL_G2)
    data["total_g2"] = {r.safra: n(r.total) for r in rows}
    log(f"  MONTHLY_G2: {len(data['monthly_g2'])} safras")

    # SUMARIO
    log("  SUMARIO...")
    rows = query(client, Q_SUMARIO)
    st = {"qtde_total":0,"qtde_renovados":0,"qtde_reemitidos":0,
          "qtde_total_renov":0,"qtde_entregue":0,"qtde_desbloqueado":0}
    sc = []
    for r in rows:
        st["qtde_total"]       += n(r.qtde_total)
        st["qtde_renovados"]   += n(r.qtde_renovados)
        st["qtde_reemitidos"]  += n(r.qtde_reemitidos)
        st["qtde_total_renov"] += n(r.qtde_total_renov)
        st["qtde_entregue"]    += n(r.qtde_entregue)
        st["qtde_desbloqueado"] += n(r.qtde_desbloqueado)
        sc.append({
            "ciclo": str(r.ciclo),
            "qtde_total": n(r.qtde_total),
            "qtde_renovados": n(r.qtde_renovados),
            "qtde_reemitidos": n(r.qtde_reemitidos),
            "qtde_total_renov": n(r.qtde_total_renov),
            "qtde_entregue": n(r.qtde_entregue),
            "qtde_desbloqueado": n(r.qtde_desbloqueado),
        })
    data["sumario_total"] = st
    data["sumario_ciclo"] = sc
    log(f"  SUMARIO: {len(sc)} ciclos")

    # GRAFICO_CAMPANHAS
    log("  GRAFICO_CAMPANHAS...")
    rows = query(client, Q_GRAFICO)
    grafico = {}
    for r in rows:
        safra = str(r.EXPIRATION_DATE)
        team  = str(r.TEAM)
        if safra not in grafico:
            grafico[safra] = {}
        if team not in grafico[safra]:
            grafico[safra][team] = []
        grafico[safra][team].append({
            "x": int(r.DIFF_DIAS),
            "y": round(float(r.perc or 0) * 100, 2)
        })
    data["grafico_campanhas"] = grafico
    log(f"  GRAFICO_CAMPANHAS: {len(grafico)} safras")

    # Gerar JS
    log(f"Gerando {OUTPUT_JS.name}...")
    js = build_js(data)
    OUTPUT_JS.write_text(js, encoding="utf-8")
    log(f"dashboard_data.js gerado: {OUTPUT_JS.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
