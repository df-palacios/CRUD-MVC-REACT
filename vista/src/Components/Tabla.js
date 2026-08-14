import React, { useState, useEffect, useRef } from 'react';
import { eliminarUsuario } from '../services/api';
import { colorDe, iniciales } from '../utils/avatar';
import { cue, CUES } from '../lib/sound';

const Tabla = ({ entradas, setListUpdated, onEditar, hayBusqueda }) => {

    // id de la fila desplegada en móvil (null = todas colapsadas)
    const [expandidoId, setExpandidoId] = useState(null);

    // id de la fila con el menú de acciones abierto (escritorio)
    const [menuAbiertoId, setMenuAbiertoId] = useState(null);

    const contenedorRef = useRef(null);

    // cerrar el menú al hacer clic fuera o al pulsar Escape
    useEffect(() => {

        if (menuAbiertoId === null) return;

        const alClicFuera = (e) => {
            if (!contenedorRef.current?.contains(e.target)) {
                setMenuAbiertoId(null);
            }
        };

        const alTeclear = (e) => {
            if (e.key === 'Escape') setMenuAbiertoId(null);
        };

        document.addEventListener('mousedown', alClicFuera);
        document.addEventListener('keydown', alTeclear);

        return () => {
            document.removeEventListener('mousedown', alClicFuera);
            document.removeEventListener('keydown', alTeclear);
        };

    }, [menuAbiertoId]);

    const handleDelete = async id => {

        setMenuAbiertoId(null);

        const { ok, data } = await eliminarUsuario(id);

        if (!ok) {
            console.log(data?.msg);
        } else {
            cue(CUES.borrar);
        }

        setListUpdated(true);

    };

    const handleEditar = (entrada) => {
        setMenuAbiertoId(null);
        onEditar(entrada);
    };

    if (entradas.length === 0) {
        return (
            <p className='lista-vacia'>
                {hayBusqueda
                    ? 'No hay contactos que coincidan con tu búsqueda.'
                    : 'Todavía no hay contactos. Agrega el primero con el formulario.'}
            </p>
        );
    }

    return (

        <div ref={contenedorRef}>

            {/* Tabla: solo en pantallas medianas/grandes (>= 768px) */}
            <div className='tabla-wrap d-none d-md-block'>

                <table className='table' data-testid="tabla-contactos">

                    <thead>

                        <tr>
                            <th>Contacto</th>
                            <th className='col-num'>Teléfono</th>
                            <th className='col-num'>Celular</th>
                            <th>Dirección</th>
                            <th>Ciudad</th>
                            <th className='col-acciones'><span className='sr-only'>Acciones</span></th>
                        </tr>

                    </thead>

                    <tbody>

                        {entradas.map((entrada) => (

                            <tr key={entrada.id} data-testid={`fila-contacto-${entrada.id}`}>

                                {/* celda de identidad: avatar + nombre + correo */}
                                <td>
                                    <div className='identidad'>

                                        <span
                                            className='avatar'
                                            style={{ background: colorDe(entrada.nombres + entrada.apellidos) }}
                                            aria-hidden='true'
                                        >
                                            {iniciales(entrada.nombres, entrada.apellidos)}
                                        </span>

                                        <span className='identidad-texto'>
                                            <span className='identidad-nombre'>
                                                {entrada.nombres} {entrada.apellidos}
                                            </span>
                                            <span className='identidad-correo'>{entrada.correo}</span>
                                        </span>

                                    </div>
                                </td>

                                <td className='col-num'>{entrada.telefonos}</td>
                                <td className='col-num'>{entrada.celular}</td>
                                <td className='celda-suave'>{entrada.direccion}</td>
                                <td><span className='chip-ciudad'>{entrada.ciudad}</span></td>

                                <td className='col-acciones'>

                                    <div className='menu-contenedor'>

                                        <button
                                            className='btn-kebab'
                                            onClick={() => {
                                                const abriendo = menuAbiertoId !== entrada.id;
                                                setMenuAbiertoId(abriendo ? entrada.id : null);
                                                if (abriendo) cue(CUES.menu);
                                            }}
                                            aria-label='Acciones'
                                            aria-haspopup='menu'
                                            aria-expanded={menuAbiertoId === entrada.id}
                                            data-testid={`btn-acciones-${entrada.id}`}
                                        >
                                            <svg width='16' height='16' viewBox='0 0 16 16' aria-hidden='true'>
                                                <circle cx='8' cy='3' r='1.5' fill='currentColor' />
                                                <circle cx='8' cy='8' r='1.5' fill='currentColor' />
                                                <circle cx='8' cy='13' r='1.5' fill='currentColor' />
                                            </svg>
                                        </button>

                                        {menuAbiertoId === entrada.id && (

                                            <div className='menu' role='menu'>

                                                <button
                                                    className='menu-item'
                                                    role='menuitem'
                                                    onClick={() => handleEditar(entrada)}
                                                    data-testid={`btn-editar-${entrada.id}`}
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    className='menu-item menu-item-peligro'
                                                    role='menuitem'
                                                    onClick={() => handleDelete(entrada.id)}
                                                    data-testid={`btn-borrar-${entrada.id}`}
                                                >
                                                    Borrar
                                                </button>

                                            </div>

                                        )}

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {/* Lista compacta desplegable: solo en pantallas chicas (< 768px) */}
            <ul className='lista-contactos d-md-none' data-testid="lista-contactos-movil">

                {entradas.map((entrada) => {

                    const abierto = expandidoId === entrada.id;

                    return (

                        <li
                            className={`contacto-item ${abierto ? 'abierto' : ''}`}
                            key={entrada.id}
                            data-testid={`fila-contacto-movil-${entrada.id}`}
                        >

                            {/* fila compacta: siempre visible, se toca para desplegar */}
                            <button
                                className='contacto-fila'
                                onClick={() => setExpandidoId(abierto ? null : entrada.id)}
                                aria-expanded={abierto}
                            >

                                <span
                                    className='avatar'
                                    style={{ background: colorDe(entrada.nombres + entrada.apellidos) }}
                                    aria-hidden='true'
                                >
                                    {iniciales(entrada.nombres, entrada.apellidos)}
                                </span>

                                <span className='contacto-resumen'>
                                    <span className='contacto-nombre'>
                                        {entrada.nombres} {entrada.apellidos}
                                    </span>
                                    <span className='contacto-sub'>
                                        {entrada.celular || entrada.telefonos} · {entrada.ciudad}
                                    </span>
                                </span>

                                <span className={`contacto-chevron ${abierto ? 'rotado' : ''}`} aria-hidden='true'>
                                    ⌄
                                </span>

                            </button>

                            {/* detalle: solo cuando la fila está desplegada */}
                            {abierto && (

                                <div className='contacto-detalle'>

                                    <div className='detalle-campo'>
                                        <span className='detalle-label'>Correo</span>
                                        {entrada.correo}
                                    </div>

                                    <div className='detalle-campo'>
                                        <span className='detalle-label'>Teléfono</span>
                                        <span className='col-num'>{entrada.telefonos}</span>
                                    </div>

                                    <div className='detalle-campo'>
                                        <span className='detalle-label'>Celular</span>
                                        <span className='col-num'>{entrada.celular}</span>
                                    </div>

                                    <div className='detalle-campo'>
                                        <span className='detalle-label'>Dirección</span>
                                        {entrada.direccion}
                                    </div>

                                    <div className='detalle-acciones'>

                                        <button
                                            onClick={() => onEditar(entrada)}
                                            className='btn btn-primary'
                                        >
                                            Editar
                                        </button>

                                        <button
                                            onClick={() => handleDelete(entrada.id)}
                                            className='btn btn-ghost btn-ghost-peligro'
                                        >
                                            Borrar
                                        </button>

                                    </div>

                                </div>

                            )}

                        </li>

                    );

                })}

            </ul>

        </div>

    );

};

export default Tabla;
