import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {

    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');

    const { login, cargando, error } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const destino = location.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();

        const exito = await login(usuario, password);

        if (exito) {
            navigate(destino, { replace: true });
        }
    };

    return (
        <div className="login-container">
            <form className="login-card" onSubmit={handleSubmit} data-testid="login-form">

                <h2 className="section-title">Iniciar sesión</h2>

                <div className="mb-3">
                    <label htmlFor="usuarioId" className="form-label">Usuario</label>
                    <input
                        id="usuarioId"
                        name="usuario"
                        type="text"
                        className="form-control"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        data-testid="login-usuario"
                        autoComplete="username"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="passwordId" className="form-label">Password</label>
                    <input
                        id="passwordId"
                        name="password"
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        data-testid="login-password"
                        autoComplete="current-password"
                    />
                </div>

                {error && (
                    <p className="login-error" role="alert" data-testid="login-error">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={cargando}
                    data-testid="login-submit"
                >
                    {cargando ? 'Ingresando...' : 'Ingresar'}
                </button>

            </form>
        </div>
    );
};

export default Login;
