import { Request, Response } from 'express';
import db from '../db/connection';

/**
 * POST /api/testing/reset
 *
 * Reinicia la tabla de contactos a los 3 registros semilla originales
 * (los mismos de modelo/libreta.sql). Pensado para un botón "Reiniciar
 * aplicación" visible en la UI, así cualquiera que esté probando el CRUD
 * (o corriendo Playwright/Karate a repetición) puede volver a un estado
 * limpio sin tocar la base de datos a mano.
 *
 * Requiere JWT válido (se registra bajo el mismo router protegido que
 * /api/usuarios) — a propósito: este proyecto existe para demostrar
 * endpoints protegidos, así que el reset no es la excepción.
 */
export const resetContactos = async (req: Request, res: Response) => {

    try {
        await db.query('TRUNCATE TABLE usuarios');

        await db.query(`
            INSERT INTO usuarios (id, nombres, apellidos, correo, telefonos, celular, direccion, ciudad) VALUES
            (6, 'don', 'quijote', 'jorgen@hotmail.com', 999, 666, 'cll 555', 'soacha'),
            (7, 'andres', 'gonzalez', 'afgc@hotmail.com', 321, 654, 'cll 555', 'jamundi'),
            (8, 'maria ', 'duran', 'maria@carvajal.com', 777, 555, 'carrera 44', 'cali')
        `);

        await db.query('ALTER TABLE usuarios AUTO_INCREMENT = 9');

        return res.status(200).json({
            ok: true,
            msg: 'Aplicación reiniciada correctamente'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error al reiniciar la aplicación'
        });
    }
}
