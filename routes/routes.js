import express from 'express';
import { ping } from '../controller/system.js';
import { getAllUsersHandler, getUserByIdHandler } from '../controller/handler/user-handler.js';
import { deletePostByPostIdHandler, getAllPostsHandler, getPostByLocationIdHandler, 
  getPostByPostIdHandler, getPostByUserIdHandler, postPostByLocationIdHandler } from '../controller/handler/post-handler.js';
import { postLikeHandler } from '../controller/handler/like-handler.js'

const setupRoutes = (app) => {
  const router = express.Router();
  // -------------------- api --------------------
  router.route('/ping').get(ping);

  router.route('/users').get(getAllUsersHandler);
  router.route('/users/:userId').get(getUserByIdHandler);
  router.route('/users/:userId/posts').get(getPostByUserIdHandler);

  router.route('/posts').get(getAllPostsHandler);
  router.route('/posts/:postId').get(getPostByPostIdHandler);
  router.route('/posts/:postId').delete(deletePostByPostIdHandler);
  router.route('/posts/:locationId').get(getPostByLocationIdHandler);
  router.route('/posts/:locationId').post(postPostByLocationIdHandler);

  router.route('/like').post(postLikeHandler);

  app.use('/mykor/api/v1', router);
};

export { setupRoutes };