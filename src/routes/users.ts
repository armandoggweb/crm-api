import { Router } from 'express';
import controllers from '../controllers';

const router = Router();
const { create, list, update, remove, changeRole } = controllers.users;

router.get('/', list);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);
router.put('/:id/role', changeRole);

export default router;
