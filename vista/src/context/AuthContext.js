import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { login as loginRequest } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [usuario, setUsuario] = useState(() => localStorage.getItem('usuario'));
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    const login = useCallback(async (usuarioInput, password) => {

        setCargando(true);
        setError(null);

        const { ok, data } = await loginRequest(usuarioInput, password);

        setCargando(false);

        if (ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('usuario', data.usuario);
            setUsuario(data.usuario);
            return true;
        }

        setError(data?.msg || 'No se pudo iniciar sesión');
        return false;

    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        setUsuario(null);
    }, []);

    // si cualquier request del api.js recibe un 401, cerramos sesión automáticamente
    useEffect(() => {
        const onSessionExpired = () => setUsuario(null);
        window.addEventListener('session-expired', onSessionExpired);
        return () => window.removeEventListener('session-expired', onSessionExpired);
    }, []);

    return (
        <AuthContext.Provider value={{ usuario, estaAutenticado: !!usuario, login, logout, cargando, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
