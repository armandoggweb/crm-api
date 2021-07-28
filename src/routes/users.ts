import { Router } from 'express';
import { verifyToken } from '../auth';
import { isAdmin } from '../middleware';
import controllers from '../controllers';

const router = Router();
const { create, list, update, remove, changeRole, login } = controllers.users;

router.get('/', verifyToken, isAdmin, list);
router.post('/', verifyToken, isAdmin, create);
router.put('/:id', verifyToken, isAdmin, update);
router.delete('/:id', verifyToken, isAdmin, remove);
router.put('/:id/role', verifyToken, isAdmin, changeRole);
router.post('/login', login);

export default router;
