import { Router } from 'express';
// Users routes
const userRoutes = require('./users/user.routes');
const alumnosRoutes = require('./alumnos/alumnos.routes');
const sedesRoutes = require('./sede/sede.routes');
const router = Router();

router.use('/users', userRoutes);
router.use('/alumnos', alumnosRoutes);
router.use('/sede', sedesRoutes);

export default router;
