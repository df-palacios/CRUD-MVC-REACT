import React from 'react';
import { useAuth } from '../context/AuthContext';

// El dashboard de testing vive en /docs de este mismo servidor —
// local ahora, el VPS el día que se despliegue — nunca en un tercero.
// vista/public/docs se sirve automaticamente (dev con CRA, y queda
// empacado dentro de build/ al correr "npm run build" para producción).
const URL_TESTING = process.env.REACT_APP_TESTING_URL || `${window.location.origin}/docs/`;

const Navbar = ({ brand }) => {

    const { usuario, estaAutenticado, logout } = useAuth();

    return (
        <nav className="topbar">
            <div className="topbar-inner">

                <span className="wordmark">{brand}</span>

                <div className="topbar-derecha">

                    <a
                        href={URL_TESTING}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost btn-ghost-claro"
                        data-testid="link-testing"
                    >
                        Reportes de testing
                    </a>

                    {estaAutenticado && (
                        <div className="topbar-user" data-testid="navbar-usuario">
                            <span className="topbar-user-nombre">{usuario}</span>
                            <button
                                onClick={logout}
                                className="btn btn-ghost btn-ghost-claro"
                                data-testid="btn-logout"
                            >
                                Salir
                            </button>
                        </div>
                    )}

                </div>

            </div>
        </nav>
    );
}

export default Navbar;
