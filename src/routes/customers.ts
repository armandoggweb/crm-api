import { Router } from 'express';
import controllers from '../controllers';

const router = Router();

const { list, create, customerInfo, update, remove } = controllers.customers;

router.get('/', list);
router.get('/:id', customerInfo);
router.post('/', create);
router.put('/:id', update)
router.delete('/:id', remove)

export default router;
