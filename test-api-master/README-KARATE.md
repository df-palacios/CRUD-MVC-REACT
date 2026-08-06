# Tests de Karate (API + Auth)

## Requisitos
- Java 17+, Maven
- El backend corriendo en `http://localhost:8000` con `npm run dev` (ver `README-AUTH.md` del backend)
- Las credenciales de test deben coincidir con tu `.env` del backend:
  usuario `admin` / password que hayas hasheado. Por defecto estos tests
  asumen `admin` / `admin123` (los mismos que usé para probar el backend).

Si usaste otro usuario/password, corre así:

```bash
mvn test -Dadmin.user=admin -Dadmin.password=tuPasswordReal
```

## Correr todo

```bash
mvn test
```

Esto corre en paralelo:
- `examples/users/users.feature` — CRUD completo (ahora hace login una sola vez
  con `callonce` y reusa el token en todos sus escenarios vía `configure headers`)
- `examples/auth/auth.feature` — login correcto/incorrecto, usuario inexistente,
  campos faltantes, acceso sin token (401) y con token inválido (401)

## Reporte

Karate genera un reporte HTML automáticamente en:

```
target/karate-reports/karate-summary.html
```

Ábrelo en el navegador — esa es la pieza más "visual" para mostrar en el
portafolio mientras armamos Playwright.

## Estructura nueva

```
examples/
  auth/
    auth.feature      <- escenarios de autenticación (standalone)
    AuthRunner.java
  common/
    login.feature     <- reutilizable, llamado por otros features (no se corre solo)
  users/
    users.feature      <- CRUD, ahora requiere token (login automático en Background)
    UsersRunner.java
```
