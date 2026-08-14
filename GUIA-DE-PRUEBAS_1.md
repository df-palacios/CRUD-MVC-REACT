# Guía de pruebas — CRUD + Auth JWT + Karate + Playwright

## Resumen: qué armamos y por qué

1. **Backend (`controlador`)** — tu CRUD de Node/TS/Sequelize, ahora con login
   JWT (`/api/auth/login`) y todas las rutas de `/api/usuarios` protegidas con
   Bearer token.
2. **Frontend (`vista`)** — tu React, ahora con pantalla de login, rutas
   protegidas, y logout.
3. **`test-api-master`** — tus tests de Karate DSL, ahora con escenarios de
   auth y el resto del CRUD haciendo login automático.
4. **`playwright-e2e`** — proyecto nuevo, tests E2E en TypeScript sobre la UI
   real (login, CRUD, logout), con reporte visual (screenshots/video/trace).

## Paso 0: organiza los archivos

Descomprime los 3 `.zip` que te compartí, uno junto al otro (no uno dentro de
otro), y deja el `.json` de Postman ahí también. Te debería quedar algo así:

```
Desktop/CRUD-MVC-REACT/
├── controlador/              <- del zip CRUD-MVC-REACT-con-auth.zip
├── vista/                    <- del mismo zip
├── modelo/                   <- del mismo zip (el .sql)
├── test-api-master/           <- de test-api-karate-con-auth.zip
├── playwright-e2e/            <- de playwright-e2e.zip
└── CRUD-Usuarios-Auth.postman_collection.json
```

Sigue estos pasos en orden. Al final vas a tener **4 terminales** abiertas a
la vez (backend, frontend, y una libre para Karate/Playwright que corres uno
a la vez), pero los primeros pasos son secuenciales.

## Requisitos previos

- Node.js 18+ y npm
- MySQL corriendo (local o remoto) con un usuario que pueda crear tablas
- Java 17+ y Maven (`mvn -version` para confirmar)
- Postman (opcional pero recomendado para probar la API a mano)

Descomprime los `.zip` como se muestra arriba.

---

## 1. Base de datos

1. Abre `modelo/libreta.sql` (dentro del zip del CRUD) y cárgalo en tu MySQL:
   ```bash
   mysql -u root -p < modelo/libreta.sql
   ```
   (o impórtalo desde MySQL Workbench / phpMyAdmin, lo que uses normalmente)
2. Anota el nombre de la base, usuario y password — los vas a necesitar en el
   `.env` del backend.

---

## 2. Backend (`controlador`)

```bash
cd controlador
npm install
copy .env.example .env
```
*(en PowerShell también funciona `Copy-Item .env.example .env`; en Mac/Linux sería `cp .env.example .env`)*

Abre `.env` y completa:
- `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` → tus datos reales de MySQL
- `JWT_SECRET` → cualquier string largo y random (ej: pega 40 caracteres random)

Genera el hash de tu password de admin:
```bash
npm run hash-password -- "TuPasswordSegura123"
```
Copia el resultado en `ADMIN_PASSWORD_HASH` dentro del `.env`.
**Guarda en un lugar visible el usuario (`admin`) y el password en texto plano
que elegiste** — lo vas a volver a escribir en el login de la UI, en Postman y
en Karate.

Arranca el server:
```bash
npm run dev
```

✅ Debe imprimir `servidor corriendo en el puerto 8001` **y no debe salir**
`ECONNREFUSED ... 3306` (si sale, revisa tus credenciales de MySQL en `.env`).

Déjalo corriendo en esta terminal.

---

## 3. Probar el backend solo, con Postman

1. Abre Postman → **Import** → selecciona `CRUD-Usuarios-Auth.postman_collection.json`.
2. En la carpeta **Auth**, abre **Login (correcto)** y en el body pon el
   password real que elegiste en el paso 2. Dale **Send**.
   - Debe responder `200` con un `token`. El script del request ya lo guarda
     solo en la variable `token` de la colección — no tienes que copiarlo.
3. Corre **Login (password incorrecto)** → debe dar `401`.
4. Entra a la carpeta **Usuarios (protegido)** y corre cada request:
   - **Listar usuarios** → `200`
   - **Crear usuario** → `201` (y guarda el `id` creado en `usuario_id` automáticamente)
   - **Obtener usuario por ID**, **Actualizar usuario**, **Eliminar usuario** → todos deben responder bien usando ese `token` automático.
   - **Listar SIN token → debe dar 401** → confírmalo, esta request no manda token a propósito.

Si todo esto pasa, el backend con auth está funcionando correctamente.

---

## 4. Frontend (`vista`)

Abre una **segunda terminal**:

```bash
cd vista
npm install
copy .env.example .env
npm start
```

Se abre `http://localhost:3001` en el navegador.

✅ **Debe redirigirte automáticamente a `/login`** (porque no hay sesión).

1. Ingresa `admin` y tu password real → click **Ingresar**.
   - Si el password es incorrecto, debe mostrar el mensaje de error debajo del botón.
   - Si es correcto, te lleva a la tabla de contactos.
2. **Crear un contacto**: llena el formulario de la derecha y dale **Enviar** →
   debe aparecer en la tabla sin recargar la página.
3. **Editar un contacto** — ojo, así es como funciona esta app (no es un bug
   nuevo, así estaba diseñada): escribe en el formulario los valores *nuevos*
   que quieres que tenga ese contacto, y luego dale **Editar** en la fila
   específica que quieres actualizar. La fila toma los valores que hayas
   escrito en el formulario en ese momento.
4. **Borrar un contacto** con el botón **Borrar** de su fila → debe
   desaparecer de la tabla.
5. **Logout**: botón **Salir** arriba a la derecha → debe mandarte de vuelta
   a `/login`. Si intentas ir a `http://localhost:3001/` directo después de
   salir, debe rebotarte a `/login` otra vez (ruta protegida).
6. **Sesión vencida (opcional, para probar el manejo de 401)**: con sesión
   iniciada, abre las DevTools del navegador (F12) → pestaña **Application** →
   **Local Storage** → borra la clave `token` → intenta crear o borrar un
   contacto → debe mandarte a `/login` solo, sin que la app se rompa.

---

## 5. Karate DSL

Con el backend **todavía corriendo** (terminal 1), abre una **tercera terminal**:

```bash
cd test-api-master
mvn test -Dadmin.user=admin -Dadmin.password=TuPasswordSegura123
```

(usa el mismo usuario/password que configuraste en el `.env` del backend)

✅ Debe terminar en `BUILD SUCCESS` con `0` failures. Si algo falla, el log te
dice exactamente qué escenario y qué línea.

Abre el reporte visual:
```
target/karate-reports/karate-summary.html
```

Ese HTML es el que puedes mostrar directamente en el portafolio mientras
armamos Playwright.

---

## 6. Playwright (E2E sobre la UI real)

Con backend (terminal 1) y frontend (terminal 2) **todavía corriendo**, abre
una **cuarta terminal**:

```bash
cd playwright-e2e
npm install
npx playwright install chromium
copy .env.example .env
```

Edita `.env` con tu usuario/password reales (los mismos que usas para entrar
por la UI).

Corre los tests:
```bash
npm test
```

✅ Deben pasar los 8 tests (4 de auth + 3 del CRUD + 1 de setup/login).

Abre el reporte visual:
```bash
npm run report
```

Esto abre un HTML con cada test, y en los que fallen, screenshot + video +
trace paso a paso. Esta es la pieza más vistosa para el portafolio.

---

## Checklist rápido

- [ ] Backend arranca sin error de conexión a MySQL
- [ ] Login por Postman devuelve 200 + token
- [ ] `/api/usuarios` sin token devuelve 401
- [ ] Frontend redirige a `/login` si no hay sesión
- [ ] Login por UI funciona y muestra la tabla
- [ ] Crear / editar / borrar contacto desde la UI funciona
- [ ] Logout limpia la sesión y bloquea `/`
- [ ] `mvn test` pasa todos los escenarios (`users` + `auth`)
- [ ] `npm test` de Playwright pasa los 8 tests

## Problemas comunes

| Síntoma | Causa probable |
|---|---|
| `ECONNREFUSED ... 3306` al arrancar el backend | MySQL no está corriendo, o `DB_HOST`/`DB_USER`/`DB_PASSWORD` mal en `.env` |
| Login siempre da 401 aunque el password sea correcto | `ADMIN_PASSWORD_HASH` no corresponde al password que estás escribiendo, o lo generaste antes de guardar el `.env` |
| El frontend no carga datos / error de red en consola | `REACT_APP_API_URL` en `vista/.env` no apunta al puerto correcto, o el backend no está corriendo |
| Error de CORS en la consola del navegador | Confirma que el backend siga respondiendo (el `cors()` ya está habilitado en el server) |
| `mvn: command not found` | Falta instalar Maven |
| `'cp' is not recognized...` | Estás en `cmd.exe` de Windows — usa `copy` en vez de `cp` (o usa PowerShell/Git Bash si prefieres mantener `cp`) |
| Karate falla el login con 401 | El `-Dadmin.user`/`-Dadmin.password` que pasaste no coincide con el `.env` real del backend |
| Playwright falla instalando Chromium | Revisa tu conexión/firewall corporativo; `npx playwright install chromium` necesita descargar el navegador de internet |
| Playwright: los tests de auth fallan pero los del CRUD sí pasan | Confirma que `ADMIN_USER`/`ADMIN_PASSWORD` en `playwright-e2e/.env` coincidan exactamente con lo que usas para entrar por la UI |
