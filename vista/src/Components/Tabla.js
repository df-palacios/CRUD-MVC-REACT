import React from 'react';
import { eliminarUsuario, actualizarUsuario } from '../services/api';

const Tabla = ({ entrada, entradas, setListUpdated }) => {

    const handleDelete = async id => {

        const { ok, data } = await eliminarUsuario(id);

        if (!ok) {
            console.log(data?.msg);
        }

        setListUpdated(true);

    };

    let {
        nombres,
        apellidos,
        correo,
        telefonos,
        celular,
        direccion,
        ciudad
    } = entrada;

    const handleUpdate = async id => {

        telefonos = parseInt(telefonos, 10);
        celular = parseInt(celular, 10);

        // validación de datos
        if (
            nombres === '' ||
            apellidos === '' ||
            correo === '' ||
            direccion === '' ||
            ciudad === '' ||
            telefonos <= 0 ||
            celular <= 0
        ) {

            alert('Todos los campos son obligatorios');
            return;

        }

        const { ok, data } = await actualizarUsuario(id, entrada);

        if (!ok) {
            console.log(data?.msg);
        }

        setListUpdated(true);

    };

    return (

        <table className='table' data-testid="tabla-contactos">

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
                                    onClick={() => handleUpdate(entrada.id)}
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

    );

};

export default Tabla;
