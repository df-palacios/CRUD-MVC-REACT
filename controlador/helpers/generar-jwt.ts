import jwt from 'jsonwebtoken';

/**
 * Genera un JWT firmado con el secreto de la app.
 * @param usuario nombre de usuario que quedará embebido en el payload del token
 */
export const generarJWT = (usuario: string): Promise<string> => {
    return new Promise((resolve, reject) => {

        const payload = { usuario };

        jwt.sign(
            payload,
            process.env.JWT_SECRET as string,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || '4h'
            },
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject('No se pudo generar el token');
                } else {
                    resolve(token as string);
                }
            }
        );
    });
}
