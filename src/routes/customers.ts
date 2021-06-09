import { Router } from 'express';
import controllers from '../controllers';

const router = Router();

const { list } = controllers.customers;

router.get('/', list);

export default router;
