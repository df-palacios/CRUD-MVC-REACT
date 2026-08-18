import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Envuelve rutas que exigen sesión (ver App.js). Sin usuario logueado
// redirige a /login guardando la ruta de origen en location.state, así
// Login.js puede volver ahí mismo después de autenticar en vez de
// mandar siempre a "/".
const ProtectedRoute = ({ children }) => {

    const { estaAutenticado } = useAuth();
    const location = useLocation();

    if (!estaAutenticado) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
