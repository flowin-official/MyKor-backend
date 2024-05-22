'use strict';
import dotenv, { config } from 'dotenv';
dotenv.config();

import { postPostLikeCount } from '../../lib/repository/post-repository.js';
import { postUserLikePost } from '../../lib/repository/user-repository.js';
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
 *       - posts 
*/
// -------------postLikeHandler---------------

const postLikeHandler = async (req, res) => {
  const userId = req.body.userId;
  const postId = req.body.postId;

  const results = {};
  results.result = true;
  results.error = [];

  try {
    await postPostLikeCount(results, postId);
    // 게시글 좋아요 +1
    try {
      await postUserLikePost(results, userId, postId);
      // 유저의 좋아하는 게시글에 postId 추가
    } catch (err) {
      results.result = false;
      results.error.push('Handler - user liked post Error');
    }
  } catch (err) {
    results.result = false;
    results.error.push('Handler - post like Error');
  }

  res.send(results);
  consoleBar();
  timeLog('[POST][/like] // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));
};

export { postLikeHandler };