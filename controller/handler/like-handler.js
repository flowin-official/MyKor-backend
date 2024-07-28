'use strict';
import dotenv, { config } from 'dotenv';
dotenv.config();

import { deleteDecrementPostLikeCount, getPostsById, postPostLikeCount } from '../../lib/repository/post-repository.js';
import { deleteUserLikePost, getUserLikePost, postUserLikePost } from '../../lib/repository/user-repository.js';
import { consoleBar, resSend, timeLog } from '../../config/common.js';

// -------------postLikeHandler---------------
/**
 * @swagger
 * /like:
 *   post:
 *     summary: 게시글 좋아요 기능
 *     description: 게시글 좋아요 기능
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - postId
 *             properties:
 *               userId:
 *                 type: string
 *                 description: 좋아요를 누르는 유저 Id
 *                 example: 6646d9320e0312421da8ec9d
 *               postId:
 *                 type: string
 *                 description: 좋아요를 누를 게시글 Id
 *                 example: 6646d9320e0312421da8ecbd
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Bad request, invalid input data
 *       404:
 *         description: User not found or no posts associated with the user
 *       500:
 *         description: Internal server error
 *     tags:
 *       - like 
*/
// -------------postLikeHandler---------------

const postLikeHandler = async (req, res) => {
  const userId = req.body.userId;
  const postId = req.body.postId;

  const results = {};
  results.result = true;
  results.error = [];

  try {
    // 이미 유저가 좋아하는지 확인
    await postUserLikePost(results, userId, postId);

    if (results.result) {
      // 이미 좋아한게 아니면 like +1
      await postPostLikeCount(results, postId);
    }
  } catch (err) {
    results.result = false;
    results.error.push('Handler Error');
  }

  res.send(results);
  consoleBar();
  timeLog('[POST][/like] // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));
};

// -------------getLikeHandler---------------
/**
 * @swagger
 * /like:
 *   get:
 *     summary: 특정 유저가 좋아요한 게시글 정보 리턴
 *     description: 특정 유저가 좋아요한 게시글 정보 리턴
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: 유저 Id
 *     responses:
 *       200:
 *         description: List of posts retrieved successfully
 *       404:
 *         description: User not found or no posts associated with the user
 *       500:
 *         description: Internal server error
 *     tags:
 *       - like
 */
// -------------getLikeHandler---------------

const getLikeHandler = async (req, res) => {
  const userId = req.query.userId;

  const results = {};
  results.result = true;
  results.error = [];

  try {
    await getUserLikePost(results, userId);
    if (results.user && results.user.likedPostId.length > 0) {
      await getPostsById(results, results.user.likedPostId);
    } else if (results.user) {
      results.result = false;
      results.error.push("User has no liked posts");
    } else {
      results.result = false;
      results.error.push("User not found");
    }
  } catch (err) {
    results.result = false;
    results.error.push('Handler Error');
  }

  res.send(results);
  consoleBar();
  timeLog('[GET][/like] // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));
};

// -------------deleteLikeHandler---------------
/**
 * @swagger
 * /like:
 *   delete:
 *     summary: 특정 유저의 특정 게시글 좋아요 취소
 *     description: 특정 유저의 특정 게시글 좋아요 취소
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: 유저 Id
  *       - in: query
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: 게시글 Id
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 *     tags:
 *       - like
 */
// -------------deleteLikeHandler---------------

const deleteLikeHandler = async (req, res) => {
  const userId = req.query.userId;
  const postId = req.query.postId;

  const results = {};
  results.result = true;
  results.error = [];

  try {
    await deleteUserLikePost(results, userId, postId);
    if (results.user) {
      await deleteDecrementPostLikeCount(results, postId);
    } else {
      results.result = false;
      results.error.push('User not found or post not liked by user');
    }
  } catch (err) {
    results.result = false;
    results.error.push("Handler Error");
  }

  res.send(results);
  consoleBar();
  timeLog('[DELETE][/like] // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));
};

export { postLikeHandler, getLikeHandler, deleteLikeHandler };