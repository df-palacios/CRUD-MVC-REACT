// Detecta el backend automáticamente a partir de cómo se cargó ESTA página:
// - entraste por localhost:3001  -> pide a localhost:8001
// - entraste por 192.168.x.x:3001 (celular u otro dispositivo en tu red)
//    -> pide a esa misma IP:8001
// Así no importa si tu router cambia de IP: el navegador siempre usa la
// dirección con la que realmente te conectaste, no un valor fijo en .env.
// REACT_APP_API_URL sigue funcionando como override explícito si alguna
// vez lo necesitas (por ejemplo, backend detrás de un dominio distinto).
const PUERTO_BACKEND = process.env.REACT_APP_API_PORT || 8001;
const API_URL = process.env.REACT_APP_API_URL || `${window.location.protocol}//${window.location.hostname}:${PUERTO_BACKEND}`;

/**
 * Wrapper sobre fetch que:
 *  - agrega el header Authorization: Bearer <token> si hay sesión activa
 *  - si el backend responde 401 (token vencido/ausente), limpia la sesión
 *    y avisa a quien lo llamó para que redirija a /login
 */
const request = async (path, options = {}) => {

    const token = localStorage.getItem('token');

    const headers = {
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers
    };

    let response;

    try {
        response = await fetch(`${API_URL}${path}`, { ...options, headers });
    } catch (error) {
        // el backend no respondió: URL mala, sin conexión, firewall, servidor caído, etc.
        console.error(`Error de red llamando a ${path}:`, error);
        return {
            ok: false,
            status: 0,
            data: { ok: false, msg: 'No se pudo conectar con el servidor. Revisa tu conexión o REACT_APP_API_URL.' }
        };
    }

    if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        // avisamos a la app (AuthContext escucha este evento) para redirigir a /login
        window.dispatchEvent(new Event('session-expired'));
    }

    let data = null;
    try {
        data = await response.json();
    } catch (e) {
        // respuesta sin body (poco común aquí, pero por si acaso)
    }

    return { ok: response.ok, status: response.status, data };
};

export const login = (usuario, password) =>
    request('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ usuario, password })
    });

export const getUsuarios = () => request('/api/usuarios');

export const getUsuario = (id) => request(`/api/usuarios/${id}`);

export const crearUsuario = (usuario) =>
    request('/api/usuarios', { method: 'POST', body: JSON.stringify(usuario) });

export const actualizarUsuario = (id, usuario) =>
    request(`/api/usuarios/${id}`, { method: 'PUT', body: JSON.stringify(usuario) });

export const eliminarUsuario = (id) =>
    request(`/api/usuarios/${id}`, { method: 'DELETE' });

export const reiniciarAplicacion = () =>
    request('/api/testing/reset', { method: 'POST' });
