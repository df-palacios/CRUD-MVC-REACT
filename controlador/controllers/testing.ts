import { Request, Response } from 'express';
import db from '../db/connection';

/**
 * POST /api/testing/reset
 *
 * Vacía por completo la tabla de contactos. Pensado para un botón
 * "Reiniciar aplicación" visible en la UI, así cualquiera que esté
 * probando el CRUD (o corriendo Playwright/Karate a repetición) puede
 * volver a un estado limpio sin tocar la base de datos a mano — y quien
 * lo use en el demo público puede empezar de cero, sin datos de otras
 * personas de por medio.
 *
 * Requiere JWT válido (se registra bajo el mismo router protegido que
 * /api/usuarios) — a propósito: este proyecto existe para demostrar
 * endpoints protegidos, así que el reset no es la excepción.
 */
export const resetContactos = async (req: Request, res: Response) => {

    try {
        await db.query('TRUNCATE TABLE usuarios');

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
