"""
Calcula uso de tokens do Claude Code a partir dos arquivos JSONL locais.
Gera usage_data.json para o gráfico do Hub.
"""
import json, os, glob
from datetime import datetime, timezone
from pathlib import Path

PYTHON = r"C:\Users\jefnogueira\AppData\Local\Python\bin\python3.14.exe"

# Preços Claude Sonnet 4.6 (USD por 1M tokens)
PRICE = {
    "input":          3.00,
    "output":        15.00,
    "cache_creation": 3.75,
    "cache_read":     0.30,
}

def calcular_uso(ano=None, mes=None):
    now = datetime.now(timezone.utc)
    ano = ano or now.year
    mes = mes or now.month

    base = Path.home() / ".claude" / "projects"
    arquivos = list(base.rglob("*.jsonl"))

    totais = {"input": 0, "output": 0, "cache_creation": 0, "cache_read": 0}
    por_dia = {}
    conversas = set()

    for arq in arquivos:
        try:
            with open(arq, encoding="utf-8", errors="ignore") as f:
                for linha in f:
                    linha = linha.strip()
                    if not linha or '"usage"' not in linha:
                        continue
                    try:
                        obj = json.loads(linha)
                    except json.JSONDecodeError:
                        continue

                    # Extrair timestamp
                    ts_raw = obj.get("timestamp") or (
                        obj.get("message", {}).get("timestamp") if isinstance(obj.get("message"), dict) else None
                    )
                    if not ts_raw:
                        # Tentar achar no corpo da mensagem
                        msg = obj.get("message", {})
                        if not isinstance(msg, dict):
                            continue
                        usage = msg.get("usage")
                    else:
                        try:
                            dt = datetime.fromisoformat(ts_raw.replace("Z", "+00:00"))
                        except Exception:
                            continue
                        if dt.year != ano or dt.month != mes:
                            continue
                        msg = obj.get("message", {})
                        usage = msg.get("usage") if isinstance(msg, dict) else None

                    if not usage or not isinstance(usage, dict):
                        continue

                    # Só contar se tiver timestamp válido no mês
                    if not ts_raw:
                        continue

                    try:
                        dt = datetime.fromisoformat(ts_raw.replace("Z", "+00:00"))
                    except Exception:
                        continue
                    if dt.year != ano or dt.month != mes:
                        continue

                    dia = dt.strftime("%Y-%m-%d")
                    if dia not in por_dia:
                        por_dia[dia] = {"input": 0, "output": 0, "cache_creation": 0, "cache_read": 0, "cost": 0.0}

                    it = usage.get("input_tokens", 0) or 0
                    ot = usage.get("output_tokens", 0) or 0
                    cc = usage.get("cache_creation_input_tokens", 0) or 0
                    cr = usage.get("cache_read_input_tokens", 0) or 0

                    totais["input"]          += it
                    totais["output"]         += ot
                    totais["cache_creation"] += cc
                    totais["cache_read"]     += cr

                    custo = (it * PRICE["input"] + ot * PRICE["output"] +
                             cc * PRICE["cache_creation"] + cr * PRICE["cache_read"]) / 1_000_000

                    por_dia[dia]["input"]          += it
                    por_dia[dia]["output"]         += ot
                    por_dia[dia]["cache_creation"] += cc
                    por_dia[dia]["cache_read"]     += cr
                    por_dia[dia]["cost"]           += custo

                    sessao = obj.get("sessionId") or ""
                    if sessao:
                        conversas.add(sessao)

        except Exception as e:
            pass

    custo_total = (
        totais["input"]          * PRICE["input"] +
        totais["output"]         * PRICE["output"] +
        totais["cache_creation"] * PRICE["cache_creation"] +
        totais["cache_read"]     * PRICE["cache_read"]
    ) / 1_000_000

    total_tokens = totais["input"] + totais["output"] + totais["cache_creation"] + totais["cache_read"]

    return {
        "ano": ano,
        "mes": mes,
        "atualizado_em": now.isoformat(),
        "tokens": totais,
        "total_tokens": total_tokens,
        "custo_usd": round(custo_total, 4),
        "conversas": len(conversas),
        "por_dia": por_dia,
    }


if __name__ == "__main__":
    import subprocess, sys

    dados = calcular_uso()

    # Salvar JSON para o hub
    hub_dir = Path(__file__).parent.parent
    out = hub_dir / "usage_data.json"
    with open(out, "w", encoding="utf-8") as f:
        json.dump(dados, f, ensure_ascii=False, indent=2)

    print(f"Mês: {dados['mes']:02d}/{dados['ano']}")
    print(f"Tokens totais : {dados['total_tokens']:>15,}")
    print(f"  Input       : {dados['tokens']['input']:>15,}")
    print(f"  Output      : {dados['tokens']['output']:>15,}")
    print(f"  Cache write : {dados['tokens']['cache_creation']:>15,}")
    print(f"  Cache read  : {dados['tokens']['cache_read']:>15,}")
    print(f"Custo estimado: USD {dados['custo_usd']:>11.4f}")
    print(f"Conversas     : {dados['conversas']:>15,}")
    print(f"Salvo em      : {out}")

    # Push automático para GitHub Pages
    push = "--push" in sys.argv or "-p" in sys.argv
    if push:
        print("\nPublicando no GitHub Pages...")
        try:
            subprocess.run(["git", "-C", str(hub_dir), "add", "usage_data.json"], check=True)
            result = subprocess.run(
                ["git", "-C", str(hub_dir), "diff", "--staged", "--quiet"],
                capture_output=True
            )
            if result.returncode != 0:
                msg = f"uso: {dados['mes']:02d}/{dados['ano']} USD {dados['custo_usd']:.2f}"
                subprocess.run(["git", "-C", str(hub_dir), "commit", "-m", msg], check=True)
                subprocess.run(["git", "-C", str(hub_dir), "push", "origin", "main"], check=True)
                print("✓ Publicado no GitHub Pages com sucesso.")
            else:
                print("Sem mudanças — usage_data.json já estava atualizado.")
        except Exception as e:
            print(f"Erro no push: {e}")
