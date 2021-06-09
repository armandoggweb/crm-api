import {Router} from 'express';
import controllers from '../controllers'

const router = Router();
const {create} = controllers.users;

router.post('/', create);

export default router;