import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { reiniciarAplicacion } from '../services/api';
import { cue, CUES } from '../lib/sound';
import { PORTFOLIO_URL } from '../config/links';

// El dashboard de testing vive en /docs de este mismo servidor —
// local ahora, el VPS el día que se despliegue — nunca en un tercero.
// vista/public/docs se sirve automaticamente (dev con CRA, y queda
// empacado dentro de build/ al correr "npm run build" para producción).
const URL_TESTING = process.env.REACT_APP_TESTING_URL || `${window.location.origin}/docs/`;

const Navbar = ({ brand, onReiniciado }) => {

    const { usuario, estaAutenticado, logout } = useAuth();
    const [reiniciando, setReiniciando] = useState(false);

    const handleReiniciar = async () => {

        const confirmado = window.confirm(
            'Esto borra todos los contactos actuales y los reemplaza por los 3 de la demo original. ¿Continuar?'
        );
        if (!confirmado) return;

        setReiniciando(true);

        const { ok } = await reiniciarAplicacion();

        setReiniciando(false);

        if (ok) {
            cue(CUES.resetApp);
            onReiniciado?.();
        } else {
            cue(CUES.loginError);
            alert('No se pudo reiniciar la aplicación. Intenta de nuevo.');
        }
    };

    return (
        <nav className="topbar">
            <div className="topbar-inner">

                <span className="wordmark">{brand}</span>

                <div className="topbar-derecha">

                    <a
                        href={PORTFOLIO_URL}
                        className="btn btn-ghost btn-ghost-claro"
                        data-testid="link-portafolio"
                        data-cuelume-press
                        data-cuelume-release
                    >
                        ← Volver al portafolio
                    </a>

                    <a
                        href={URL_TESTING}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost btn-ghost-claro"
                        data-testid="link-testing"
                        data-cuelume-press
                        data-cuelume-release
                    >
                        Reportes de testing
                    </a>

                    {estaAutenticado && (
                        <div className="topbar-user" data-testid="navbar-usuario">

                            <button
                                onClick={handleReiniciar}
                                disabled={reiniciando}
                                className="btn btn-ghost btn-ghost-claro"
                                data-testid="btn-reiniciar"
                                title="Borra los contactos de prueba y vuelve a los 3 originales de la demo"
                            >
                                {reiniciando ? 'Reiniciando...' : '[TESTING] Reiniciar aplicación'}
                            </button>

                            <span className="topbar-user-nombre">{usuario}</span>
                            <button
                                onClick={logout}
                                className="btn btn-ghost btn-ghost-claro"
                                data-testid="btn-logout"
                                data-cuelume-press
                                data-cuelume-release
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
