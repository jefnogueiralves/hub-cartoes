@echo off
TITLE Atualizar Uso Claude Code
echo.
echo  Calculando uso de tokens...
echo.
"C:\Users\jefnogueira\AppData\Local\Python\bin\python3.14.exe" ^
  "C:\Users\jefnogueira\Desktop\Arquivos Claude\hub-cartoes\scripts\calcular_uso_claude.py" --push
echo.
pause
