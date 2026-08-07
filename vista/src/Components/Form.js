import React, { useState } from 'react';
import { crearUsuario, actualizarUsuario } from '../services/api';

//esta funcion modifica el estado de una entrada de la libreta cuando se detecta un cambio en el formulario (evento)
const Form = ({ entrada, setEntrada, setListUpdated, modoEdicionId, onCancelar, onGuardado }) => {

    const [error, setError] = useState(null);

    const handleChange = e => {
        setEntrada({
            ...entrada,
            [e.target.name]: e.target.value
        })
    }

    let { nombres, apellidos, correo, telefonos, celular, direccion, ciudad } = entrada

    const handleSubmit = async e => {
        e.preventDefault();
        setError(null);

        telefonos = parseInt(telefonos, 10)
        celular = parseInt(celular, 10)
        //validación de los datos
        if (nombres === '' || apellidos === '' || correo === '' || direccion === '' || ciudad === '' || telefonos <= 0 || celular <= 0) {
            setError('Todos los campos son obligatorios');
            return
        }

        const payload = { ...entrada, telefonos, celular };

        const { ok, data } = modoEdicionId
            ? await actualizarUsuario(modoEdicionId, payload)
            : await crearUsuario(payload);

        if (!ok) {
            setError(data?.msg || 'No se pudo guardar el contacto');
            return;
        }

        // limpia el formulario, sale del modo edición y vuelve a la lista
        onGuardado();

        // refresca la tabla para que el cambio aparezca
        setListUpdated(true);

    }

    return (
        <form onSubmit={handleSubmit} data-testid="form-contacto">

            <div className="form-grid">
                <div className="campo">
                    <label htmlFor="nombresId" className="form-label">Nombres</label>
                    <input value={nombres} name="nombres" onChange={handleChange} type="text" id="nombresId" className="form-control" data-testid="input-nombres" />
                </div>
                <div className="campo">
                    <label htmlFor="apellidosId" className="form-label">Apellidos</label>
                    <input value={apellidos} name="apellidos" onChange={handleChange} type="text" id="apellidosId" className="form-control" data-testid="input-apellidos" />
                </div>
            </div>

            <div className="campo">
                <label htmlFor="correoId" className="form-label">Correo</label>
                <input value={correo} name="correo" onChange={handleChange} type="text" id="correoId" className="form-control" data-testid="input-correo" />
            </div>

            <div className="form-grid">
                <div className="campo">
                    <label htmlFor="telefonosId" className="form-label">Teléfono</label>
                    <input value={telefonos} name="telefonos" onChange={handleChange} type="number" id="telefonosId" className="form-control" data-testid="input-telefonos" />
                </div>
                <div className="campo">
                    <label htmlFor="celularId" className="form-label">Celular</label>
                    <input value={celular} name="celular" onChange={handleChange} type="number" id="celularId" className="form-control" data-testid="input-celular" />
                </div>
            </div>

            <div className="campo">
                <label htmlFor="direccionId" className="form-label">Dirección</label>
                <input value={direccion} name="direccion" onChange={handleChange} type="text" id="direccionId" className="form-control" data-testid="input-direccion" />
            </div>

            <div className="campo">
                <label htmlFor="ciudadId" className="form-label">Ciudad</label>
                <input value={ciudad} name="ciudad" onChange={handleChange} type="text" id="ciudadId" className="form-control" data-testid="input-ciudad" />
            </div>

            {error && (
                <p className="form-error" role="alert" data-testid="form-error">{error}</p>
            )}

            <div className="form-buttons">

                <button type="submit" className="btn btn-primary" data-testid="btn-enviar">
                    {modoEdicionId ? 'Guardar cambios' : 'Agregar contacto'}
                </button>

                {modoEdicionId && (
                    <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={onCancelar}
                        data-testid="btn-cancelar-edicion"
                    >
                        Cancelar
                    </button>
                )}

            </div>

        </form>
    );
}

export default Form;
