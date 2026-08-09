@echo off
setlocal

echo.
echo === Actualizando reporte de Karate ===
if exist test-api-master\target\karate-reports (
    xcopy /E /I /Y test-api-master\target\karate-reports vista\public\docs\karate-report >nul
    echo OK - copiado a vista\public\docs\karate-report
) else (
    echo AVISO: no encontre test-api-master\target\karate-reports
    echo        corre primero: cd test-api-master ^&^& mvn test
)

echo.
echo === Actualizando reporte de Playwright ===
if exist playwright-e2e\playwright-report (
    xcopy /E /I /Y playwright-e2e\playwright-report vista\public\docs\playwright-report >nul
    echo OK - copiado a vista\public\docs\playwright-report
) else (
    echo AVISO: no encontre playwright-e2e\playwright-report
    echo        corre primero: cd playwright-e2e ^&^& npm test
)

echo.
echo === Listo ===
echo El dashboard vive en vista\public\docs\index.html y se sirve solo
echo en /docs cuando corras "npm start" o hagas "npm run build".
echo.
echo Si se ve bien, comitea:
echo.
echo   git add vista\public\docs
echo   git commit -m "Actualiza reportes de testing"
echo   git push
echo.

endlocal
