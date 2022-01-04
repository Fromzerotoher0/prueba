import { Router, Request, Response } from 'express';
import { uploadFile } from '../../middlewares/multer';
import {
  createController,
  removeController,
  readController,
  editController,
  readBySedeController,
  readByIdController,
} from './alumnos.controller';

const router = Router();

router.post('/create', uploadFile.single('image'), createController);
router.delete('/remove', removeController);
router.get('/read', readController);
router.post('/readBySede', readBySedeController);
router.post('/readById', readByIdController);
router.put('/edit', editController);

module.exports = router;
