import { Router } from 'express';
import { resetContactos, descargarColeccionPostman } from '../controllers/testing';
import { validarJWT } from '../middlewares/validar-jwt';

const router = Router();

// Pública a propósito: cualquiera que quiera probar la API a mano con
// Postman debería poder bajar la colección sin necesitar sesión primero
// (el login es justo lo primero que se prueba con ella).
router.get('/postman-collection', descargarColeccionPostman);

// Todo lo que sigue sí exige JWT
router.use(validarJWT);

router.post('/reset', resetContactos);

export default router;
