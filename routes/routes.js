import express from 'express';
import { ping } from '../controller/system.js';
import { getAllUsersHandler, getUserByIdHandler } from '../controller/handler/user-handler.js';
import { getPostByUserIdHandler } from '../controller/handler/post-handler.js';

const setupRoutes = (app) => {
  const router = express.Router();
// -------------------- api --------------------
  router.route('/ping').get(ping);
  
  router.route('/users').get(getAllUsersHandler);
  router.route('/users/:userId').get(getUserByIdHandler);
  router.route('/users/:userId/posts').get(getPostByUserIdHandler);

  app.use('/mykor/api/v1', router);
};

export { setupRoutes };