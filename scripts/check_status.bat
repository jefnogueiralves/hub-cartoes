@echo off
chcp 65001 >nul
set PYTHON=C:\Users\jefnogueira\AppData\Local\Google\Cloud SDK\google-cloud-sdk\platform\bundledpython\python.exe
set SCRIPT=C:\Users\jefnogueira\Desktop\Arquivos Claude\hub-cartoes\scripts\check_status.py
set CLOUDSDK_BQ_PYTHON=

"%PYTHON%" "%SCRIPT%"
