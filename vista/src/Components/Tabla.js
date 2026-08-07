import React, { useState } from 'react';
import { eliminarUsuario } from '../services/api';

// color estable a partir del nombre, para el avatar de iniciales
const COLORES = ['#4f8cff', '#00b894', '#e17055', '#a29bfe', '#fd79a8', '#fdcb6e', '#00cec9'];

const colorDe = (texto = '') => {
    let suma = 0;
    for (let i = 0; i < texto.length; i++) suma += texto.charCodeAt(i);
    return COLORES[suma % COLORES.length];
};

const iniciales = (nombres = '', apellidos = '') =>
    `${(nombres[0] || '')}${(apellidos[0] || '')}`.toUpperCase() || '?';

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
        return <p className='lista-vacia'>No hay contactos para mostrar.</p>;
    }

    return (

        <>
            {/* Tabla clásica: solo en pantallas medianas/grandes (>= 768px) */}
            <table className='table d-none d-md-table' data-testid="tabla-contactos">

                <thead>

                    <tr>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Correo</th>
                        <th>Teléfonos</th>
                        <th>Celular</th>
                        <th>Dirección</th>
                        <th>Ciudad</th>
                        <th>Acciones</th>
                    </tr>

                </thead>

                <tbody>

                    {entradas.map((entrada) => (

                        <tr key={entrada.id} data-testid={`fila-contacto-${entrada.id}`}>

                            <td>{entrada.nombres}</td>
                            <td>{entrada.apellidos}</td>
                            <td>{entrada.correo}</td>
                            <td>{entrada.telefonos}</td>
                            <td>{entrada.celular}</td>
                            <td>{entrada.direccion}</td>
                            <td>{entrada.ciudad}</td>

                            <td>

                                <div className='actions'>

                                    <button
                                        onClick={() => handleDelete(entrada.id)}
                                        className='btn btn-danger'
                                        data-testid={`btn-borrar-${entrada.id}`}
                                    >
                                        Borrar
                                    </button>

                                    <button
                                        onClick={() => onEditar(entrada)}
                                        className='btn btn-dark'
                                        data-testid={`btn-editar-${entrada.id}`}
                                    >
                                        Editar
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
                                    className='contacto-avatar'
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
                                        <span className='detalle-label'>Teléfonos</span>
                                        {entrada.telefonos}
                                    </div>

                                    <div className='detalle-campo'>
                                        <span className='detalle-label'>Celular</span>
                                        {entrada.celular}
                                    </div>

                                    <div className='detalle-campo'>
                                        <span className='detalle-label'>Dirección</span>
                                        {entrada.direccion}
                                    </div>

                                    <div className='detalle-acciones'>

                                        <button
                                            onClick={() => onEditar(entrada)}
                                            className='btn btn-dark'
                                        >
                                            Editar
                                        </button>

                                        <button
                                            onClick={() => handleDelete(entrada.id)}
                                            className='btn btn-danger'
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
