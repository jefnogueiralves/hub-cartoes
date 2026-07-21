#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
publicar_grid_hub.py — Publica um HTML no GRID (adminml.com)
Uso genérico para hub-cartoes: MTC, Cartões Expirados, Hub, Controle Plástico.

Env vars obrigatórias:
  GRID_SESSION_ID  — cookie _mldataSessionId (GitHub Secret)
  GRID_DOC_ID      — ID do documento no GRID  (GitHub Secret por dashboard)
  GRID_HTML_FILE   — caminho do arquivo HTML a publicar (ex: cartoes_expirados.html)
"""
import os, sys, logging, time
from pathlib import Path
from datetime import datetime

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s %(levelname)s %(message)s'
)
log = logging.getLogger(__name__)

GRID_API = 'https://grid.adminml.com/api/v1'


def publicar(session_id: str, doc_id: str, html_file: Path) -> bool:
    from playwright.sync_api import sync_playwright

    html_bytes = html_file.read_bytes()
    log.info(f'Publicando {html_file.name} ({len(html_bytes)//1024} KB) → GRID doc {doc_id}')

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        ctx = browser.new_context()
        ctx.add_cookies([{
            'name': '_mldataSessionId',
            'value': session_id,
            'domain': 'grid.adminml.com',
            'path': '/',
            'httpOnly': False,
            'secure': True,
        }])
        page = ctx.new_page()

        # Navega para carregar cookies e CSRF
        try:
            page.goto(
                f'https://grid.adminml.com/d/{doc_id}/view',
                wait_until='networkidle',
                timeout=45000
            )
        except Exception:
            pass  # timeout é ok, só precisamos dos cookies

        log.info(f'URL após navegação: {page.url}')

        if 'login' in page.url.lower() or 'okta' in page.url.lower():
            log.error('SESSAO_GRID_EXPIRADA — atualize o secret GRID_SESSION_ID no GitHub.')
            browser.close()
            return False

        # Aguarda a página carregar completamente (JS + tokens CSRF)
        time.sleep(3)

        # Upload via JS fetch (same-origin, CSRF automático)
        html_str = html_bytes.decode('utf-8', errors='replace')
        try:
            result = page.evaluate(
                f"""async (html) => {{
                    const blob = new Blob([html], {{type: 'text/html'}});
                    const fd = new FormData();
                    fd.append('file', blob, 'index.html');
                    const r = await fetch('/api/v1/documents/{doc_id}/versions', {{
                        method: 'POST', body: fd, credentials: 'include'
                    }});
                    return {{status: r.status, body: (await r.text()).substring(0, 400)}};
                }}""",
                html_str
            )
            log.info(f'Resposta GRID: {result}')
            browser.close()

            if isinstance(result, dict) and result.get('status') in (200, 201):
                log.info(f'GRID atualizado com sucesso: https://grid.adminml.com/d/{doc_id}/view')
                return True
            log.error(f'Upload falhou: {result}')
            return False
        except Exception as e:
            try: browser.close()
            except Exception: pass
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

    ok = publicar(session_id, doc_id, html_file)
    if ok:
        print(f'Publicado: https://grid.adminml.com/d/{doc_id}/view')
        sys.exit(0)
    else:
        print('Falha ao publicar no GRID. Verifique se GRID_SESSION_ID está válido.')
        sys.exit(1)
