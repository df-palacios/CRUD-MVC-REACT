import React from 'react';
import { useAuth } from '../context/AuthContext';

// ¿Estamos viendo la app desde localhost o desde una IP de red privada
// (LAN)? Si sí, los reportes ya están servidos ahí mismo en /docs (los deja
// actualizar-reportes.bat). Si no —o sea, cualquiera fuera de tu red, como
// un reclutador— van al dashboard público en GitHub Pages.
const esRedLocal = (host) =>
    host === 'localhost' ||
    host === '127.0.0.1' ||
    /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(host);

const URL_TESTING = process.env.REACT_APP_TESTING_URL || (
    esRedLocal(window.location.hostname)
        ? `${window.location.origin}/docs/`
        : 'https://df-palacios.github.io/CRUD-MVC-REACT/'
);

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
