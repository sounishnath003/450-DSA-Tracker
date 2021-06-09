import SignupController from './signup.controller';
import LoginController from './login.controller';
import { Router } from 'express';


const router = Router();

router.use('/signup', SignupController);
router.use('/login', LoginController);


export default router;