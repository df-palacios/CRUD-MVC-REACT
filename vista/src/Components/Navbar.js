import React from 'react';
import { useAuth } from '../context/AuthContext';

const URL_TESTING = process.env.REACT_APP_TESTING_URL || 'https://df-palacios.github.io/CRUD-MVC-REACT/';

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
