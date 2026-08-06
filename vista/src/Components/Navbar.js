import React from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ brand }) => {

    const { usuario, estaAutenticado, logout } = useAuth();

    return (
        <nav className="navbar navbar-custom">
            <div className="container navbar-content">
                <a href="#!" className="navbar-brand">{brand}</a>

                {estaAutenticado && (
                    <div className="navbar-user" data-testid="navbar-usuario">
                        <span>{usuario}</span>
                        <button
                            onClick={logout}
                            className="btn btn-outline-light btn-sm"
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
