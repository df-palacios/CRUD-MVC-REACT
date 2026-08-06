# Playwright E2E — Libreta de contactos

Tests end-to-end sobre la UI real (React), usando el patrón oficial de
Playwright: Page Object Model + "login once, reuse session" vía `storageState`.

## Setup

```bash
npm install
npx playwright install chromium   # descarga el navegador (una sola vez)
copy .env.example .env            # Windows (cmd.exe) — en Mac/Linux: cp .env.example .env
```

Ajusta `.env` con el usuario/password reales que configuraste en el backend
(`ADMIN_USER` / el password en texto plano, no el hash).

## Requisitos antes de correr los tests

Necesitas el stack completo corriendo:
1. Backend (`npm run dev` en `controlador`) → puerto 8000
2. Frontend (`npm start` en `vista`) → puerto 3000
3. MySQL con los datos cargados

## Correr los tests

```bash
npm test
```

Esto primero corre `auth.setup.ts` (hace login una vez y guarda la sesión en
`playwright/.auth/user.json`), y después corre `auth.spec.ts` (que arranca
sin sesión a propósito, para probar login/logout) y `contactos.spec.ts` (que
reusa la sesión guardada para el CRUD).

Otros comandos útiles:
```bash
npm run test:headed   # ver el navegador mientras corre
npm run test:auth     # solo los tests de auth
npm run test:crud     # solo el CRUD
npm run report        # abre el reporte HTML de la última corrida
npm run codegen       # graba acciones y genera código automáticamente
```

## El reporte (la parte "visual" para el portafolio)

Después de `npm test`, corre:
```bash
npm run report
```

Se abre un reporte HTML con cada test, su duración, y — en los que fallan —
screenshot y video automáticos, más el trace viewer (puedes reproducir el
test paso a paso, ver el DOM y el network en cada momento). Esto es lo que
puedes subir a GitHub Pages o grabar en un GIF para mostrar en el portafolio.

## Qué cubre cada archivo

- `tests/auth.setup.ts` — login inicial, guarda la sesión para el resto de tests.
- `tests/auth.spec.ts` — redirect sin sesión, login correcto, login con
  password incorrecto, logout + bloqueo de ruta protegida. Corre sin sesión
  guardada a propósito (`test.use({ storageState: ... vacío })`).
- `tests/contactos.spec.ts` — crear, editar y borrar un contacto, usando la
  sesión ya autenticada.
- `pages/LoginPage.ts`, `pages/ContactosPage.ts` — Page Objects: si cambia un
  selector en la UI, solo se actualiza en un lugar.

## Nota sobre validación

Este proyecto se armó y se compiló (TypeScript limpio, `playwright test --list`
detecta los 8 tests correctamente), pero **no se corrió contra un navegador
real** porque el entorno donde lo generé no tiene salida a internet para
descargar Chromium. Tú sí vas a poder correrlo normal con
`npx playwright install chromium` + `npm test`.
