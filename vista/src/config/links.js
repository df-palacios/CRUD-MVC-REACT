/**
 * URL del portafolio (virtual-cv) para el botón "Volver al portafolio".
 *
 * Mismo patrón que ya usan `services/api.js` aquí y `config/links.js` en
 * los proyectos hermanos (rifaNavidad, virtual-cv): la URL se deduce del
 * host con el que se abrió la página, así funciona igual desde el PC o
 * desde el celular en la misma red, sin editar nada:
 *
 *   http://localhost:3001       -> http://localhost:5173
 *   http://192.168.1.103:3001   -> http://192.168.1.103:5173
 *
 * En producción se usa el dominio real.
 *
 * Se puede forzar con REACT_APP_PORTFOLIO_URL en el .env.
 */

// Puerto por defecto de Vite, que es lo que usa virtual-cv en desarrollo.
const PORTFOLIO_DEV_PORT = process.env.REACT_APP_PORTFOLIO_PORT || 5173;

const PRODUCTION_URL = 'https://dfpalacios.cloud';

function resolvePortfolioUrl() {
    if (process.env.REACT_APP_PORTFOLIO_URL) {
        return process.env.REACT_APP_PORTFOLIO_URL;
    }

    if (typeof window !== 'undefined' && window.location) {
        const { protocol, hostname } = window.location;

        const isLocal =
            hostname === 'localhost' ||
            hostname === '127.0.0.1' ||
            /^\d+\.\d+\.\d+\.\d+$/.test(hostname);

        if (isLocal) {
            return `${protocol}//${hostname}:${PORTFOLIO_DEV_PORT}`;
        }
    }

    return PRODUCTION_URL;
}

export const PORTFOLIO_URL = resolvePortfolioUrl();
