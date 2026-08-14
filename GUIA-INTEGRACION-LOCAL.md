# Correr los 3 proyectos juntos en local

Portafolio (`personalwebsite`) + Libreta de contactos (`CRUD-MVC-REACT`) +
Rifa Navideña (`rifaNavidad`), con los links cruzados funcionando entre los
tres, sin tocar ningún `.env` al cambiar de PC a celular ni si tu router
cambia de IP.

## Puertos (ya no chocan entre sí)

| Proyecto | Frontend | Backend |
|---|---|---|
| Portafolio (`personalwebsite/virtual-cv`) | `5173` (Vite) | — (estático) |
| Libreta de contactos | `3001` (CRA) | `8001` (Node/Express) |
| Rifa Navideña | `3000` (CRA) | `8000` (Laravel) |

Los tres se auto-detectan por `window.location.hostname` — abre cualquiera
por `localhost` o por tu IP de red y los tres botones cruzados
("Lanzar proyecto", "Volver al portafolio") apuntan solos al lugar correcto.

## Orden para levantar todo

**1. Bases de datos** — MySQL con `libreta` (`modelo/libreta.sql`) y `rifa`
(`database/rifa.sql`) ya cargadas.

**2. Backend de la Libreta**
```bat
cd CRUD-MVC-REACT\controlador
npm install
copy .env.example .env
npm run dev
```
El `.env.example` ya trae un hash funcional para `Demo2026!` — no tienes
que generar nada para empezar a probar.

**3. Frontend de la Libreta**
```bat
cd CRUD-MVC-REACT\vista
npm install
copy .env.example .env
npm start
```
Se abre en `http://localhost:3001`. La pantalla de login ya muestra la
leyenda con las credenciales de demo (clic para autocompletar).

**4. Backend de la rifa** (si quieres probar también esa integración)
```bat
cd rifaNavidad\backend
php artisan serve --host=0.0.0.0 --port=8000
```

**5. Frontend de la rifa**
```bat
cd rifaNavidad\frontend
npm install
npm start
```
Se abre en `http://localhost:3000`.

**6. Portafolio**
```bat
cd personalwebsite\virtual-cv
npm install
npm run dev
```
Se abre en `http://localhost:5173`.

## Qué probar

- Desde el portafolio (`:5173`), sección Proyectos → tarjeta "Libreta de
  Contactos" → hover muestra el video, clic en "Lanzar proyecto" abre
  `localhost:3001`.
- Desde la Libreta (`:3001`) ya logueado, botón **"← Volver al portafolio"**
  en el navbar → vuelve a `localhost:5173`.
- Botón **"[TESTING] Reiniciar aplicación"** → confirma, y deja la tabla de
  contactos completamente vacía (ya no repone los 3 de la demo — bórralos
  tú mismo agregando contactos nuevos para seguir probando).
- Sonidos: login, guardar, borrar, cambiar de pestaña en móvil, abrir el
  menú de una fila, reiniciar — nunca en cada clic suelto.
- Repite todo desde el celular usando tu IP de LAN en vez de `localhost`
  (ej. `http://192.168.1.X:3001`) — no deberías tener que tocar ningún
  `.env` para que funcione.

## Nota sobre producción (para cuando llegue esa fase)

`LIBRETA_URL` en el portafolio ya está preparada para producción con la
ruta `/proyectos/libreta` (seedeada por defecto, mismo patrón que
`/proyectos/rifa`), pero **el VPS todavía no tiene ese proxy/alias
configurado en Nginx** — eso queda para cuando desplieguen la Libreta,
junto con el `homepage` en `package.json` y el `.env.production` que la
rifa ya necesitó (ver `contexto_conversacion.md` sección 4).
