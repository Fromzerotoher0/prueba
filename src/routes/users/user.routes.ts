import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (request: Request, response: Response) => {
  response.send('servidor de combeneficios en typescript');
});

module.exports = router;
