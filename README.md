# Libreta de contactos

CRUD de contactos con autenticación JWT, manejable 100% por API, con dos capas
de testing automatizado (API y end-to-end) y una interfaz responsive.

**[Ver el dashboard de testing →](https://df-palacios.github.io/CRUD-MVC-REACT/)**
*(actívalo una vez en Settings → Pages → branch `main` /docs, ver abajo)*

## Stack

| Capa | Tecnología |
|---|---|
| Backend | Node.js, Express, TypeScript, Sequelize, MySQL, JWT |
| Frontend | React, React Router, Bootstrap 5 |
| Tests de API | Karate DSL (Java/Maven) |
| Tests E2E | Playwright (TypeScript) |

## Estructura

```
controlador/       backend (Node/Express/TS)
vista/              frontend (React)
modelo/             modelo de base de datos (.sql)
test-api-master/    tests de API (Karate DSL)
playwright-e2e/     tests end-to-end (Playwright)
docs/               dashboard de testing (GitHub Pages)
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

`docs/index.html` es una página estática con los reportes reales de la última
corrida de Karate y Playwright — pensada para que cualquiera (sin instalar
nada) pueda ver qué se prueba y el resultado.

Después de correr los tests localmente, publícalos con:
```bat
actualizar-reportes.bat
git add docs
git commit -m "Actualiza reportes de testing"
git push
```

**Para activar el link en vivo** (una sola vez): en GitHub, ve a
`Settings → Pages → Source: Deploy from a branch → main → /docs → Save`.

## Ramas

`local` (desarrollo) → `test` → `main` (producción). `hotfix` para parches
urgentes directo sobre `main`.
