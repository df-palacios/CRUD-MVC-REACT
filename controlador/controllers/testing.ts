import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import db from '../db/connection';

const PLANTILLA_POSTMAN = path.join(process.cwd(), 'postman', 'CRUD-Usuarios-Auth.postman_collection.json');

/**
 * GET /api/testing/postman-collection
 *
 * Sirve la colección de Postman lista para importar, con base_url ya
 * puesta según dónde esté corriendo el backend — no hay que editarla a
 * mano ni acordarse de actualizarla cuando esto se despliegue al VPS.
 *
 * Prioridad para calcular base_url:
 *   1. PUBLIC_API_URL en .env (obligatorio en producción: detrás de Nginx,
 *      el request que llega aquí ya perdió el prefijo /proyectos/libreta,
 *      así que no hay forma de reconstruirlo solo con los headers)
 *   2. protocolo + host del propio request (sirve tal cual en local)
 *
 * Ruta pública a propósito — es solo documentación de la API, no hay nada
 * sensible en el JSON.
 */
export const descargarColeccionPostman = (req: Request, res: Response) => {

    try {
        const plantilla = JSON.parse(fs.readFileSync(PLANTILLA_POSTMAN, 'utf-8'));

        const baseUrl = process.env.PUBLIC_API_URL || `${req.protocol}://${req.get('host')}`;

        const baseUrlVar = plantilla.variable.find((v: { key: string }) => v.key === 'base_url');
        if (baseUrlVar) baseUrlVar.value = baseUrl;

        res.setHeader('Content-Disposition', 'attachment; filename="CRUD-Usuarios-Auth.postman_collection.json"');
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).send(JSON.stringify(plantilla, null, 2));

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'No se pudo generar la colección de Postman'
        });
    }
}

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
