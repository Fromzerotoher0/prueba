import { Router } from 'express';
// Users routes
const userRoutes = require('./users/user.routes');
const router = Router();

router.use('/users', userRoutes);

export default router;
