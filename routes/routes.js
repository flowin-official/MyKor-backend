import express from 'express';
import { ping } from '../controller/system.js';
import { getAllUsersHandler } from '../controller/handler/user-handler.js';

const setupRoutes = (app) => {
  const router = express.Router();
// -------------------- api --------------------
  router.route('/ping').get(ping);
  
  router.route('/users').get(getAllUsersHandler);

  app.use('/mykor/api/v1', router);
};

export { setupRoutes };