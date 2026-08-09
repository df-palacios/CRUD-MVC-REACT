# Reporte de Playwright

Esta carpeta debe contener el reporte HTML que genera Playwright al correr `npm test`.

No lo genero yo aquí porque necesita un navegador real corriendo contra tu
backend y tu frontend — solo tú puedes producirlo.

## Cómo generarlo y publicarlo

Desde la raíz del repo, con el backend y el frontend corriendo:

```bat
actualizar-reportes.bat
```

Eso copia automáticamente lo que hay en `playwright-e2e/playwright-report/`
hacia aquí. Después:

```bat
git add vista/public/docs/playwright-report
git commit -m "Actualiza el reporte de Playwright"
git push
```

Si prefieres hacerlo a mano, el archivo que `vista/public/docs/index.html` espera encontrar
aquí se llama `index.html` (el que abre `npm run report`).
