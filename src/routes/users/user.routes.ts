import { Router, Request, Response } from 'express';
import { registerController, loginController } from './user.controller';

const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);

module.exports = router;
