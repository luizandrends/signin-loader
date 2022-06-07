import { Router } from 'express';

import probesRouter from './probes';

const routes = Router();

routes.use('/probes', probesRouter);

routes.get('/', (request, response) => {
  return response.json({ ok: true });
});

export default routes;