/**
 * Capa delgada sobre `cuelume` (https://github.com/Danilaa1/cuelume).
 *
 * Mismo wrapper que ya usa el portafolio (virtual-cv/src/lib/sound.js):
 * si el paquete no carga por cualquier razón, todo cae en no-ops
 * silenciosos — el sonido nunca puede romper la app.
 *
 * Sonidos disponibles en cuelume (los únicos válidos):
 *   chime, sparkle, droplet, bloom, whisper, tick, press, release,
 *   toggle, success
 */

const noop = () => {};

let api = null;
let pending = null;
let enabled = true;

function load() {
    if (api) return Promise.resolve(api);

    if (!pending) {
        pending = import('cuelume')
            .then((mod) => {
                api = mod;
                return mod;
            })
            .catch(() => {
                api = { play: noop, bind: noop, setEnabled: noop };
                return api;
            });
    }

    return pending;
}

/** Conecta los atributos data-cuelume-* del DOM. Llamar una vez al arrancar. */
export function initSound() {
    if (typeof window === 'undefined') return;

    load().then((mod) => {
        try {
            mod.bind?.();
        } catch {
            /* silencio */
        }
    });
}

/**
 * Reproduce un cue puntual desde código.
 *
 * Si el módulo ya está cargado se llama a play() de forma SÍNCRONA, dentro
 * del mismo gesto del usuario — pasar por un .then() extra hace que el
 * navegador descarte el sonido en algunos clics (política de autoplay).
 */
export function cue(name) {
    if (!enabled || typeof window === 'undefined') return;

    if (api) {
        try {
            api.play?.(name);
        } catch {
            /* silencio */
        }
        return;
    }

    load().then((mod) => {
        try {
            mod.play?.(name);
        } catch {
            /* silencio */
        }
    });
}

/** Permite silenciar toda la paleta. */
export function setSoundEnabled(value) {
    enabled = Boolean(value);

    load().then((mod) => {
        try {
            mod.setEnabled?.(enabled);
        } catch {
            /* silencio */
        }
    });
}

/*
 * Semántica de la paleta en la Libreta — deliberadamente NO todos los
 * botones tienen sonido. Solo los momentos que cierran una acción o
 * cambian de contexto, para que se sienta con cuerpo sin ser ruidoso:
 */
export const CUES = {
    login: 'success',       // login correcto
    loginError: 'whisper',  // password incorrecto — discreto, no punitivo
    logout: 'tick',
    guardar: 'success',     // crear o editar un contacto
    borrar: 'droplet',      // borrar — distinto a guardar, sin ser alarmante
    tab: 'toggle',          // cambiar de pestaña en móvil (Contactos/Agregar)
    menu: 'tick',           // abrir el menú kebab de una fila
    resetApp: 'chime',      // reiniciar aplicación
};
