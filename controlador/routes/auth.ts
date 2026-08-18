import { Router } from 'express';
import { login } from '../controllers/auth';

const router = Router();

// Única ruta pública del backend: sin JWT no hay forma de conseguir uno,
// así que este endpoint no puede pasar por validarJWT.
router.post('/login', login);

export default router;
