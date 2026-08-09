# Reporte de Karate

Esta carpeta debe contener el reporte HTML que genera Karate al correr `mvn test`.

No lo genero yo aquí porque necesita tu base de datos y tu backend corriendo
de verdad — solo tú puedes producirlo.

## Cómo generarlo y publicarlo

Desde la raíz del repo, con el backend corriendo:

```bat
actualizar-reportes.bat
```

Eso copia automáticamente lo que hay en `test-api-master/target/karate-reports/`
hacia aquí. Después:

```bat
git add docs/karate-report
git commit -m "Actualiza el reporte de Karate"
git push
```

Si prefieres hacerlo a mano, el archivo que `docs/index.html` espera encontrar
aquí se llama `karate-summary.html`.
