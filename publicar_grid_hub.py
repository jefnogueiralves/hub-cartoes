#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
publicar_grid_hub.py — Publica um HTML no GRID (adminml.com) via API direta.
Usa requests + _mldataSessionId (sem Playwright/browser).

Env vars obrigatórias:
  GRID_SESSION_ID  — cookie _mldataSessionId (GitHub Secret)
  GRID_DOC_ID      — ID do documento no GRID  (GitHub Secret por dashboard)
  GRID_HTML_FILE   — caminho do arquivo HTML a publicar (ex: cartoes_expirados.html)
"""
import os, sys, logging
from pathlib import Path

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s %(levelname)s %(message)s'
)
log = logging.getLogger(__name__)

GRID_API = 'https://grid.adminml.com/api/v1'


def sessao_valida(session_id: str) -> bool:
    import requests
    try:
        r = requests.get(
            f'{GRID_API}/me',
            cookies={'_mldataSessionId': session_id},
            timeout=10
        )
        log.info(f'Verificação de sessão: status {r.status_code}')
        return r.status_code == 200
    except Exception as e:
        log.warning(f'Erro ao verificar sessão: {e}')
        return False


def publicar(session_id: str, doc_id: str, html_file: Path) -> bool:
    import requests

    html_bytes = html_file.read_bytes()
    log.info(f'Publicando {html_file.name} ({len(html_bytes)//1024} KB) → GRID doc {doc_id}')

    url = f'{GRID_API}/documents/{doc_id}/versions'

    try:
        response = requests.post(
            url,
            cookies={'_mldataSessionId': session_id},
            files={'file': ('index.html', html_bytes, 'text/html')},
            timeout=120
        )
        log.info(f'Resposta GRID: status={response.status_code}')
        log.info(f'Body: {response.text[:400]}')

        if response.status_code in (200, 201):
            log.info(f'GRID atualizado: https://grid.adminml.com/d/{doc_id}/view')
            return True

        log.error(f'Upload falhou: {response.status_code} — {response.text[:200]}')
        return False

    except Exception as e:
        log.error(f'Erro no upload: {e}')
        return False


if __name__ == '__main__':
    session_id = os.environ.get('GRID_SESSION_ID')
    doc_id     = os.environ.get('GRID_DOC_ID')
    html_path  = os.environ.get('GRID_HTML_FILE', 'index.html')

    if not session_id or not doc_id:
        print('ERRO: GRID_SESSION_ID e GRID_DOC_ID são obrigatórios.')
        sys.exit(1)

    html_file = Path(html_path)
    if not html_file.exists():
        print(f'ERRO: arquivo HTML não encontrado: {html_file}')
        sys.exit(1)

    # Verifica sessão antes de tentar
    if not sessao_valida(session_id):
        print('ERRO: GRID_SESSION_ID inválido ou expirado.')
        print('Abra grid.adminml.com → F12 → Application → Cookies → copie _mldataSessionId.')
        sys.exit(1)

    ok = publicar(session_id, doc_id, html_file)
    if ok:
        print(f'Publicado: https://grid.adminml.com/d/{doc_id}/view')
        sys.exit(0)
    else:
        print('Falha ao publicar no GRID.')
        sys.exit(1)
