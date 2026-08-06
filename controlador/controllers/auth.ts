import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { generarJWT } from '../helpers/generar-jwt';

// POST /api/auth/login
// Auth simple: un solo usuario "admin" definido por variables de entorno,
// sin tabla de registro. Devuelve un JWT que se usa como Bearer token
// en el resto de endpoints del CRUD.
export const login = async (req: Request, res: Response) => {

    const { usuario, password } = req.body;

    try {

        if (!usuario || !password) {
            return res.status(400).json({
                ok: false,
                msg: 'usuario y password son obligatorios'
            });
        }

        if (usuario !== process.env.ADMIN_USER) {
            return res.status(401).json({
                ok: false,
                msg: 'Usuario o password incorrectos'
            });
        }

        const passwordValido = bcrypt.compareSync(password, process.env.ADMIN_PASSWORD_HASH as string);

        if (!passwordValido) {
            return res.status(401).json({
                ok: false,
                msg: 'Usuario o password incorrectos'
            });
        }

        const token = await generarJWT(usuario);

        return res.status(200).json({
            ok: true,
            msg: 'Login exitoso',
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al iniciar sesión'
        });
    }
}
