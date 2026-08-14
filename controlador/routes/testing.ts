import { Router } from 'express';
import { resetContactos } from '../controllers/testing';
import { validarJWT } from '../middlewares/validar-jwt';

const router = Router();

router.use(validarJWT);

router.post('/reset', resetContactos);

export default router;
