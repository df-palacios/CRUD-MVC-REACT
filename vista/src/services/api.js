const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

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

    const response = await fetch(`${API_URL}${path}`, { ...options, headers });

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
