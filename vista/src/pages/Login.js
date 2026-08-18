import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { cue, CUES } from '../lib/sound';

// Si estas dos variables están definidas (típicamente en el demo público),
// se muestra un botón para autocompletar credenciales de prueba; si no
// están, el botón simplemente no se renderiza (ver más abajo).
const DEMO_USER = process.env.REACT_APP_DEMO_USER;
const DEMO_PASSWORD = process.env.REACT_APP_DEMO_PASSWORD;

const Login = () => {

    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');

    const { login, cargando, error } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // si ProtectedRoute nos mandó para acá desde una ruta protegida, volvemos
    // ahí tras el login; si se entró directo a /login, vamos a la raíz
    const destino = location.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();

        const exito = await login(usuario, password);

        if (exito) {
            navigate(destino, { replace: true });
        }
    };

    const autocompletar = () => {
        cue(CUES.menu);
        setUsuario(DEMO_USER);
        setPassword(DEMO_PASSWORD);
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
                    data-cuelume-press
                    data-cuelume-release
                >
                    {cargando ? 'Ingresando...' : 'Ingresar'}
                </button>

                {DEMO_USER && DEMO_PASSWORD && (
                    <button
                        type="button"
                        className="login-demo"
                        onClick={autocompletar}
                        data-testid="login-demo"
                    >
                        <span className="login-demo-label">Credenciales de demo</span>
                        <span className="login-demo-valores">
                            <code>{DEMO_USER}</code> · <code>{DEMO_PASSWORD}</code>
                        </span>
                        <span className="login-demo-hint">Toca para autocompletar</span>
                    </button>
                )}

            </form>
        </div>
    );
};

export default Login;
