// El color del avatar es la única fuente de color de la interfaz: se deriva
// del nombre, así que cada contacto tiene siempre el mismo y sirve como
// ancla visual al escanear la lista.
const COLORES = ['#3b6ef5', '#0e9f6e', '#d9480f', '#7c4dff', '#c2255c', '#b7791f', '#0d9488'];

export const colorDe = (texto = '') => {
    let suma = 0;
    for (let i = 0; i < texto.length; i++) suma += texto.charCodeAt(i);
    return COLORES[suma % COLORES.length];
};

export const iniciales = (nombres = '', apellidos = '') =>
    `${(nombres[0] || '')}${(apellidos[0] || '')}`.toUpperCase() || '?';
