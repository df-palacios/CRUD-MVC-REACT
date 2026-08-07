import React from 'react';
import { eliminarUsuario } from '../services/api';

const Tabla = ({ entradas, setListUpdated, onEditar }) => {

    const handleDelete = async id => {

        const { ok, data } = await eliminarUsuario(id);

        if (!ok) {
            console.log(data?.msg);
        }

        setListUpdated(true);

    };

    return (

        <>
            {/* Tabla clásica: solo se muestra en pantallas medianas/grandes (>= 768px) */}
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

            {/* Tarjetas: solo se muestran en pantallas chicas (< 768px) */}
            <div className='d-md-none contactos-cards' data-testid="tabla-contactos-movil">

                {entradas.map((entrada) => (

                    <div className='contacto-card' key={entrada.id} data-testid={`fila-contacto-movil-${entrada.id}`}>

                        <div className='contacto-card-header'>
                            <strong>{entrada.nombres} {entrada.apellidos}</strong>
                            <span className='contacto-card-ciudad'>{entrada.ciudad}</span>
                        </div>

                        <div className='contacto-card-body'>
                            <div><span className='contacto-card-label'>Correo</span>{entrada.correo}</div>
                            <div><span className='contacto-card-label'>Teléfonos</span>{entrada.telefonos}</div>
                            <div><span className='contacto-card-label'>Celular</span>{entrada.celular}</div>
                            <div><span className='contacto-card-label'>Dirección</span>{entrada.direccion}</div>
                        </div>

                        <div className='contacto-card-actions'>

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

                ))}

                {entradas.length === 0 && (
                    <p className='contactos-cards-vacio'>Todavía no hay contactos.</p>
                )}

            </div>
        </>

    );

};

export default Tabla;
