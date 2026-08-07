import React from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ brand }) => {

    const { usuario, estaAutenticado, logout } = useAuth();

    return (
        <nav className="topbar">
            <div className="topbar-inner">

                <span className="wordmark">{brand}</span>

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
        </nav>
    );
}

export default Navbar;
