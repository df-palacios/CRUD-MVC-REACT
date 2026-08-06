import React from 'react';
import { crearUsuario } from '../services/api';

//esta funcion modifica el estado de una entrada de la libreta cuando se detecta un cambio en el formulario (evento)
const Form = ({ entrada, setEntrada, setListUpdated }) => {

    const handleChange = e => {
        setEntrada({
            ...entrada,
            [e.target.name]: e.target.value
        })
    }

    let { nombres, apellidos, correo, telefonos, celular, direccion, ciudad } = entrada

    const handleSubmit = async e => {
        e.preventDefault();

        telefonos = parseInt(telefonos, 10)
        celular = parseInt(celular, 10)
        //validación de los datos
        if (nombres === '' || apellidos === '' || correo === '' || direccion === '' || ciudad === '' || telefonos <= 0 || celular <= 0) {
            alert('Todos los campos son obligatorios')
            return
        }

        const { ok, data } = await crearUsuario({ ...entrada, telefonos, celular });

        if (!ok) {
            alert(data?.msg || 'No se pudo crear el contacto');
            return;
        }

        //deja en blanco el state luego de que se hayan agregado los datos
        setEntrada({
            nombres: '',
            apellidos: '',
            correo: '',
            telefonos: 0,
            celular: 0,
            direccion: '',
            ciudad: ''
        })

        // refresca la tabla para que el nuevo contacto aparezca
        setListUpdated(true);

    }

    return (
        <form onSubmit={handleSubmit} data-testid="form-contacto">
            <div className="mb-3">
                <label htmlFor="nombresId" className="form-label">Nombres</label>
                <input value={nombres} name="nombres" onChange={handleChange} type="text" id="nombresId" className="form-control" data-testid="input-nombres" />
            </div>
            <div className="mb-3">
                <label htmlFor="apellidosId" className="form-label">Apellidos</label>
                <input value={apellidos} name="apellidos" onChange={handleChange} type="text" id="apellidosId" className="form-control" data-testid="input-apellidos" />
            </div>
            <div className="mb-3">
                <label htmlFor="correoId" className="form-label">Correo</label>
                <input value={correo} name="correo" onChange={handleChange} type="text" id="correoId" className="form-control" data-testid="input-correo" />
            </div>
            <div className="mb-3">
                <label htmlFor="telefonosId" className="form-label">Telefonos</label>
                <input value={telefonos} name="telefonos" onChange={handleChange} type="number" id="telefonosId" className="form-control" data-testid="input-telefonos" />
            </div>
            <div className="mb-3">
                <label htmlFor="celularId" className="form-label">Celular</label>
                <input value={celular} name="celular" onChange={handleChange} type="number" id="celularId" className="form-control" data-testid="input-celular" />
            </div>
            <div className="mb-3">
                <label htmlFor="direccionId" className="form-label">Direccion</label>
                <input value={direccion} name="direccion" onChange={handleChange} type="text" id="direccionId" className="form-control" data-testid="input-direccion" />
            </div>
            <div className="mb-3">
                <label htmlFor="ciudadId" className="form-label">Ciudad</label>
                <input value={ciudad} name="ciudad" onChange={handleChange} type="text" id="ciudadId" className="form-control" data-testid="input-ciudad" />
            </div>
            <button type="submit" className="btn btn-primary" data-testid="btn-enviar">Enviar</button>
        </form>
    );
}

export default Form;
