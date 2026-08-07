import React, { useState } from 'react';
import { eliminarUsuario } from '../services/api';
import { colorDe, iniciales } from '../utils/avatar';

const Tabla = ({ entradas, setListUpdated, onEditar }) => {

    // id de la fila desplegada en móvil (null = todas colapsadas)
    const [expandidoId, setExpandidoId] = useState(null);

    const handleDelete = async id => {

        const { ok, data } = await eliminarUsuario(id);

        if (!ok) {
            console.log(data?.msg);
        }

        setListUpdated(true);

    };

    if (entradas.length === 0) {
        return <p className='lista-vacia'>No hay contactos que coincidan.</p>;
    }

    return (

        <>
            {/* Tabla: solo en pantallas medianas/grandes (>= 768px) */}
            <table className='table d-none d-md-table' data-testid="tabla-contactos">

                <thead>

                    <tr>
                        <th>Contacto</th>
                        <th className='col-num'>Teléfono</th>
                        <th className='col-num'>Celular</th>
                        <th>Dirección</th>
                        <th>Ciudad</th>
                        <th className='col-acciones'>Acciones</th>
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

                            <td>

                                <div className='actions'>

                                    <button
                                        onClick={() => onEditar(entrada)}
                                        className='btn btn-ghost'
                                        data-testid={`btn-editar-${entrada.id}`}
                                    >
                                        Editar
                                    </button>

                                    <button
                                        onClick={() => handleDelete(entrada.id)}
                                        className='btn btn-ghost btn-ghost-peligro'
                                        data-testid={`btn-borrar-${entrada.id}`}
                                    >
                                        Borrar
                                    </button>

                                </div>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

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
        </>

    );

};

export default Tabla;
