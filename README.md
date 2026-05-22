# Hub Cartões — Dashboard de Cartões Expirados Físicos

Dashboard de acompanhamento de renovações e reemissões de cartões físicos expirados (MLB · Grupo 1 · Híbrido).

## 🔗 Link do Dashboard

**[▶ Abrir Dashboard](https://storage.googleapis.com/meli-sandbox/CARDSINDICATORSBR/dashboards_TDMP_MLB/cartoes_expirados.html)**

> ⚠️ Requer autenticação GCP (`meli-bi-data`). Faça login em [console.cloud.google.com](https://console.cloud.google.com) antes de abrir o link.

## 📊 Atualização automática

- **Frequência:** Segunda a sexta, **09:00 BRT**
- **Pipeline:** BigQuery → HTML inline → GCS
- **Status:** [![Atualizar Dashboard](https://github.com/jefnogueiralves/hub-cartoes/actions/workflows/update_dashboard.yml/badge.svg)](https://github.com/jefnogueiralves/hub-cartoes/actions/workflows/update_dashboard.yml)

## 🗂️ Estrutura

```
cartoes-expirados-dash/
├── index.html              # Dashboard principal
├── dashboard_data.js       # Dados extraídos do BQ
├── scripts/
│   ├── update_data.py      # Extração BigQuery
│   ├── publicar_gcs.py     # Pipeline BQ → HTML → GCS
│   └── upload_gcs.py       # Upload isolado para GCS
└── .github/workflows/
    └── update_dashboard.yml  # Automação diária 09h BRT
```

## ⚙️ Secrets necessários no GitHub

| Secret | Descrição |
|--------|-----------|
| `GCP_SA_KEY` | JSON da service account `cardsindicatorsbr-admin@meli-bi-data.iam.gserviceaccount.com` |

## 🔧 Rodar localmente

```bash
# Atualizar dados BQ + publicar no GCS
python scripts/publicar_gcs.py

# Só publicar (sem atualizar BQ)
python scripts/publicar_gcs.py --skip-bq
```
