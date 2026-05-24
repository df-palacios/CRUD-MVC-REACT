import React from 'react';

const Tabla = ({ entrada, entradas, setListUpdated }) => {

    const handleDelete = id => {

        const requestInit = {
            method: 'DELETE'
        };

        fetch('http://localhost:8000/api/usuarios/' + id, requestInit)
            .then(res => res.text())
            .then(res => console.log(res));

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

    const handleUpdate = id => {

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

        const requestInit = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entrada)
        };

        fetch('http://localhost:8000/api/usuarios/' + id, requestInit)
            .then(res => res.text())
            .then(res => console.log(res));

        setListUpdated(true);

    };

    return (

        <table className='table'>

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

                    <tr key={entrada.id}>

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
                                >
                                    Borrar
                                </button>

                                <button
                                    onClick={() => handleUpdate(entrada.id)}
                                    className='btn btn-dark'
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