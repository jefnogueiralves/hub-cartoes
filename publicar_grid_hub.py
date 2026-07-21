#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
publicar_grid_hub.py — Publica um HTML no GRID (adminml.com) via Playwright.
Mesma abordagem do publicar_grid.py do TD Indicadores.

Env vars obrigatórias:
  GRID_SESSION_ID  — session ID do GRID (mesmo usado pelo TD)
  GRID_DOC_ID      — ID do documento no GRID
  GRID_HTML_FILE   — caminho do arquivo HTML a publicar
"""
import os, sys, logging, time
from pathlib import Path

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

        try:
            page.goto(
                f'https://grid.adminml.com/d/{doc_id}/view',
                wait_until='domcontentloaded',
                timeout=30000
            )
        except Exception:
            pass

        log.info(f'URL após navegação: {page.url}')

        if ('login' in page.url.lower() or 'okta' in page.url.lower()
                or 'accounts.google.com' in page.url):
            log.error('SESSAO_GRID_EXPIRADA')
            browser.close()
            return False

        time.sleep(3)

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
                log.info(f'GRID atualizado: https://grid.adminml.com/d/{doc_id}/view')
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
        print('Falha ao publicar no GRID.')
        sys.exit(1)
