import { Request, Response } from "express";
import Usuario from '../models/usuario';


// GET - obtener todos los usuarios
export const getUsuarios = async (req: Request, res: Response) => {

    try {

        const usuarios = await Usuario.findAll();

        return res.status(200).json({
            ok: true,
            data: usuarios
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Error al obtener usuarios'
        });
    }
}


// GET - obtener un usuario por ID
export const getUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {

            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        return res.status(200).json({
            ok: true,
            data: usuario
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Error al buscar usuario'
        });
    }
}


// POST - crear usuario
export const postUsuario = async (req: Request, res: Response) => {

    const { body } = req;

    try {

        // Validación básica
        if (
            !body.nombres ||
            !body.apellidos ||
            !body.correo
        ) {

            return res.status(400).json({
                ok: false,
                msg: 'Faltan campos obligatorios'
            });
        }

        const usuario = Usuario.build(body);

        await usuario.save();

        return res.status(201).json({
            ok: true,
            msg: 'Usuario creado correctamente',
            data: usuario
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Error al crear usuario'
        });
    }
}


// PUT - actualizar usuario
export const putUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {

            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        await usuario.update(body);

        return res.status(200).json({
            ok: true,
            msg: 'Usuario actualizado correctamente',
            data: usuario
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Error al actualizar usuario'
        });
    }
}


// DELETE - eliminar usuario
export const deleteUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {

            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        await usuario.destroy();

        return res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado correctamente'
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Error al eliminar usuario'
        });
    }
}