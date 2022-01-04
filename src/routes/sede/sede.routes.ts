import { Router, Request, Response } from 'express';
import {
  createController,
  readController,
  removeController,
  editController,
} from './sede.controller';
const router = Router();

router.post('/create', createController);
router.get('/read', readController);
router.delete('/remove', removeController);
router.put('/edit', editController);
module.exports = router;
