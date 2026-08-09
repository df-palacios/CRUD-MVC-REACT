@echo off
setlocal

echo.
echo === Actualizando reporte de Karate ===
if exist test-api-master\target\karate-reports (
    xcopy /E /I /Y test-api-master\target\karate-reports docs\karate-report >nul
    echo OK - copiado a docs\karate-report
) else (
    echo AVISO: no encontre test-api-master\target\karate-reports
    echo        corre primero: cd test-api-master ^&^& mvn test
)

echo.
echo === Actualizando reporte de Playwright ===
if exist playwright-e2e\playwright-report (
    xcopy /E /I /Y playwright-e2e\playwright-report docs\playwright-report >nul
    echo OK - copiado a docs\playwright-report
) else (
    echo AVISO: no encontre playwright-e2e\playwright-report
    echo        corre primero: cd playwright-e2e ^&^& npm test
)

echo.
echo === Listo ===

echo.
echo === Copiando docs/ hacia vista\public\docs (para verlo en localhost:3000/docs) ===
xcopy /E /I /Y docs vista\public\docs >nul
echo OK - ahora "Reportes de testing" funciona tambien en local

echo Revisa docs\index.html abriendolo en el navegador, y si se ve bien:
echo.
echo   git add docs
echo   git commit -m "Actualiza reportes de testing"
echo   git push
echo.

endlocal
