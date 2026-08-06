# Autenticación (JWT simple)

Se agregó un login con un único usuario admin definido en variables de entorno
(sin tabla de registro). Todas las rutas de `/api/usuarios` ahora exigen un
Bearer token.

## 1. Setup

```bash
npm install
cp .env.example .env
```

Genera el hash de tu password y pégalo en `.env` (variable `ADMIN_PASSWORD_HASH`):

```bash
npm run hash-password -- "tuPasswordSegura"
```

Completa también `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` y un `JWT_SECRET`
largo y aleatorio.

## 2. Correr en desarrollo

```bash
npm run dev
```

(un solo comando ahora — reemplaza el flujo anterior de dos terminales con `tsc -w`)

## 3. Endpoints

### POST /api/auth/login

```json
{
  "usuario": "admin",
  "password": "tuPasswordSegura"
}
```

Respuesta 200:
```json
{
  "ok": true,
  "msg": "Login exitoso",
  "usuario": "admin",
  "token": "eyJhbGciOi..."
}
```

Respuesta 401 (credenciales incorrectas) o 400 (campos faltantes).

### Rutas protegidas (`/api/usuarios/*`)

Todas requieren:
```
Authorization: Bearer <token>
```

Sin header → `401`. Token inválido/expirado → `401`. Con token válido, se
comporta igual que antes (GET, GET/:id, POST, PUT/:id, DELETE/:id).

## 4. Probar con curl

```bash
# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"usuario":"admin","password":"tuPasswordSegura"}'

# Usar el token
curl http://localhost:8000/api/usuarios \
  -H "Authorization: Bearer <TOKEN_AQUI>"
```

## 5. Probar con Postman

1. Crea una request `POST {{base_url}}/api/auth/login` con el body de arriba.
2. En la pestaña **Tests** del request de login, guarda el token en una variable
   de entorno para reusarlo:
   ```js
   const data = pm.response.json();
   pm.environment.set("token", data.token);
   ```
3. En el resto de requests del CRUD, ve a **Authorization → Bearer Token** y
   pon `{{token}}`.

Esto es exactamente lo que replicaremos en Karate (Background que hace login
una vez y reusa el token) y en los tests de Playwright (login por UI antes de
cada flujo).
