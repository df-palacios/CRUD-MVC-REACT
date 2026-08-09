# Libreta de contactos

CRUD de contactos con autenticación JWT, manejable 100% por API, con dos capas
de testing automatizado (API y end-to-end) y una interfaz responsive.

**Dashboard de testing:** corre la app (`npm start` en `vista`) y toca
"Reportes de testing" en el navbar — se sirve desde tu propio servidor,
sin depender de terceros (ni siquiera en producción).

## Stack

| Capa | Tecnología |
|---|---|
| Backend | Node.js, Express, TypeScript, Sequelize, MySQL, JWT |
| Frontend | React, React Router, Bootstrap 5 |
| Tests de API | Karate DSL (Java/Maven) |
| Tests E2E | Playwright (TypeScript) |

## Estructura

```
controlador/              backend (Node/Express/TS)
vista/                     frontend (React)
vista/public/docs/         dashboard de testing (se sirve en /docs)
modelo/                    modelo de base de datos (.sql)
test-api-master/           tests de API (Karate DSL)
playwright-e2e/            tests end-to-end (Playwright)
```

## Arranque rápido

1. **Base de datos** — carga `modelo/libreta.sql` en tu MySQL.

2. **Backend**
   ```bat
   cd controlador
   npm install
   copy .env.example .env
   npm run hash-password -- "TuPassword"
   :: pega el hash en .env (ADMIN_PASSWORD_HASH), completa el resto
   npm run dev
   ```

3. **Frontend**
   ```bat
   cd vista
   npm install
   copy .env.example .env
   npm start
   ```
   La URL del backend se detecta sola (misma IP/host con la que abras
   la app) — no hace falta configurarla a mano, ni en el celular.

4. **Tests de API (Karate)** — con el backend corriendo:
   ```bat
   cd test-api-master
   mvn test -Dadmin.user=admin -Dadmin.password=TuPassword
   ```

5. **Tests E2E (Playwright)** — con backend y frontend corriendo:
   ```bat
   cd playwright-e2e
   npm install
   npx playwright install chromium
   copy .env.example .env
   npm test
   ```

Guía completa, con solución de problemas comunes, en `GUIA-DE-PRUEBAS.md`.

## Dashboard de testing

`vista/public/docs/index.html` es una página estática con los reportes reales
de la última corrida de Karate y Playwright. Vive dentro del propio frontend
—no en un proveedor externo— así que queda servida automáticamente en
`/docs` tanto en desarrollo (`npm start`) como en producción
(`npm run build` la empaca dentro de `build/`, lista para el VPS el día
que se despliegue).

Después de correr los tests, publica el resultado con:
```bat
actualizar-reportes.bat
git add vista\public\docs
git commit -m "Actualiza reportes de testing"
git push
```

## Ramas

`local` (desarrollo) → `test` → `main` (producción). `hotfix` para parches
urgentes directo sobre `main`.
