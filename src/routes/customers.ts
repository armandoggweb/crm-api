import { Router } from 'express';
import { verifyToken } from '../auth';
import controllers from '../controllers';

const router = Router();

const { list, create, customerInfo, update, remove } = controllers.customers;

router.get('/', verifyToken, list);
router.get('/:id', verifyToken, customerInfo);
router.post('/', verifyToken, create);
router.put('/:id', verifyToken, update);
router.delete('/:id', verifyToken, remove);

export default router;
