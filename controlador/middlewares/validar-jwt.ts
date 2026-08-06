import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extendemos el tipo Request para poder colgar el usuario decodificado
export interface RequestConUsuario extends Request {
    usuario?: string;
}

/**
 * Middleware que exige un header:  Authorization: Bearer <token>
 * Si el token es válido, deja pasar la petición.
 * Si no viene, o es inválido/expirado, corta con 401.
 */
export const validarJWT = (req: RequestConUsuario, res: Response, next: NextFunction) => {

    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición. Envía el header Authorization: Bearer <token>'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const { usuario } = jwt.verify(token, process.env.JWT_SECRET as string) as { usuario: string };
        req.usuario = usuario;
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token inválido o expirado'
        });
    }
}
