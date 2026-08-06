import { Router } from 'express';
import { getUsuarios,getUsuario,postUsuario,putUsuario,deleteUsuario } from '../controllers/usuarios';
import { validarJWT } from '../middlewares/validar-jwt';


const router = Router(); 

// Todas las rutas de este router exigen Authorization: Bearer <token>
router.use(validarJWT);

router.get('/',         getUsuarios);
router.get('/:id',      getUsuario);
router.post('/',        postUsuario);
router.put('/:id',      putUsuario);
router.delete('/:id',   deleteUsuario);


export default router;