'use strict';
import dotenv from 'dotenv';
dotenv.config();

import { getAllPosts, getPostByUserId } from '../../lib/repository/post-repository.js';
import { consoleBar, resSend, timeLog } from '../../config/common.js';

// -------------getAllPostsHandler---------------
/**
 * @swagger
 * /posts:
 *   get:
 *     summary: 모든 게시글 정보 리턴
 *     description: 모든 게시글 정보 리턴
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
// -------------getAllPostsHandler---------------

const getAllPostsHandler = async (req, res) => {
  const results = {};
  results.result = true;
  results.error = [];
  results.posts = [];

  try {
    await getAllPosts(results);
  } catch (err) {
    results.result = false;
    results.error.push('Handler Error');
  }

  res.send(results);
  consoleBar();
  timeLog('[GET][/posts] // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));
};


// -------------getPostByUserIdHandler---------------
/**
 * @swagger
 * /users/{userId}/posts:
 *   get:
 *     summary: 특정 유저의 게시글 리턴
 *     description: 특정 유저의 게시글 리턴
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user whose posts to retrieve
 *     responses:
 *       200:
 *         description: List of posts retrieved successfully
 *       404:
 *         description: User not found or no posts associated with the user
 *       500:
 *         description: Internal server error
 */

// -------------getPostByUserIdHandler---------------


const getPostByUserIdHandler = async (req, res) => {
  const userId = req.params.userId;

  const results = {};
  results.result = true;
  results.error = [];
  results.posts = [];

  try {
    await getPostByUserId(results, userId);
  } catch (err) {
    results.result = false;
    results.error.push('Handler Error');
  }

  res.send(results);
  consoleBar();
  timeLog('[GET][/users/:userId/posts] // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));
};

export { getAllPostsHandler, getPostByUserIdHandler };