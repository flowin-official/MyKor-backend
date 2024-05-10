import express from 'express';
import { ping } from '../controller/system.js';

const setupRoutes = (app) => {
  const router = express.Router();
// -------------------- api --------------------
  router.route('/ping').get(ping);

  app.use('/mykor/api/v1', router);
};

export { setupRoutes };