'use strict';
import dotenv, { config } from 'dotenv';
dotenv.config();

import { getAllPosts, getPostByLocationId, postPostByLocationId, 
  getPostByUserId, deletePostByPostId, getPostByPostId } from '../../lib/repository/post-repository.js';
import { consoleBar, resSend, timeLog } from '../../config/common.js';

// -------------getAllPostsHandler---------------
/**
 * @swagger
 * /posts:
 *   get:
 *     summary: 모든 게시글 정보 리턴 (페이징 지원)
 *     description: 지정된 페이지와 단위 수에 맞게 게시글 정보를 리턴합니다. 입력하지 않으면 다 불러옵니다.
 *     parameters:
 *       - in: query
 *         name: page
 *         description: 가져올 페이지 번호
 *         required: false
 *         type: integer
 *         minimum: 1
 *       - in: query
 *         name: unit
 *         description: 페이지당 게시글 수 (최대 1000)
 *         required: false
 *         type: integer
 *         maximum: 1000
 *       - in: query
 *         name: tagId
 *         description: 태그 Id (1~5)
 *         required: false
 *         type: integer
 *     responses:
 *       200:
 *         description: List of posts retrieved successfully
 *       400:
 *         description: Bad request (e.g., invalid unit value)
 *       500:
 *         description: Internal server error
 *     tags:
 *       - posts
 */
// -------------getAllPostsHandler---------------

const getAllPostsHandler = async (req, res) => {
  const results = {};
  results.result = true;
  results.error = [];
  results.posts = [];


  const page = parseInt(req.query.page);
  const unit = parseInt(req.query.unit);
  const tagId = parseInt(req.query.tagId);

  const skip = (page - 1) * unit;

  if (unit > 1000) {
    results.result = false;
    results.error.push('Unit value cannot exceed 1000');
    res.status(400).send(results);
    return;
  }

  try {
    await getAllPosts(results, skip, unit, tagId);
  } catch (err) {
    results.result = false;
    results.error.push('Handler Error');
  }

  res.send(results);
  consoleBar();
  timeLog('[GET][/posts] // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));
};

// -------------getPostByLocationIdHandler---------------
/**
 * @swagger
 * /posts/{locationId}:
 *   get:
 *     summary: 특정 지역의 게시글 리턴 (페이징 지원)
 *     description: 지정된 페이지와 단위 수에 맞게 특정 지역의 게시글 정보를 리턴합니다. 입력하지 않으면 다 불러옵니다.
 *     parameters:
 *       - in: path
 *         name: locationId
 *         schema:
 *           type: string
 *         required: true
 *         description: 지역 Id
 *       - in: query
 *         name: page
 *         description: 가져올 페이지 번호 
 *         required: false
 *         type: integer
 *         minimum: 1
 *       - in: query
 *         name: unit
 *         description: 페이지당 게시글 수 (최대 1000)
 *         required: false
 *         type: integer
 *         maximum: 1000
 *       - in: query
 *         name: tagId
 *         description: 태그 Id (1~5)
 *         required: false
 *         type: integer
 *     responses:
 *       200:
 *         description: List of posts retrieved successfully
 *       404:
 *         description: User not found or no posts associated with the user
 *       500:
 *         description: Internal server error
 *     tags:
 *       - posts 
*/
// -------------getPostByLocationIdHandler---------------

const getPostByLocationIdHandler = async (req, res) => {
  const locationId = req.params.locationId;

  const results = {};
  results.result = true;
  results.error = [];
  results.posts = [];

  const page = parseInt(req.query.page);
  const unit = parseInt(req.query.unit);
  const tagId = parseInt(req.query.tagId);

  const skip = (page - 1) * unit;

  if (unit > 1000) {
    results.result = false;
    results.error.push('Unit value cannot exceed 1000');
    res.status(400).send(results);
    return;
  }

  try {
    await getPostByLocationId(results, locationId, skip, unit, tagId);
  } catch (err) {
    results.result = false;
    results.error.push('Handler Error');
  }

  res.send(results);
  consoleBar();
  timeLog('[GET][/posts/:locationId] // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));
};
// -------------postPostByLocationIdHandler---------------
/**
 * @swagger
 * /posts/{locationId}:
 *   post:
 *     summary: 특정 지역에 게시글 작성 
 *     description: 특정 지역에 게시글 작성 
 *     parameters:
 *       - in: path
 *         name: locationId
 *         schema:
 *           type: string
 *         required: true
 *         description: 지역 Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - postTag
 *               - postTitle
 *               - postContent
 *               - postAuthorId
 *             properties:
 *               postTag:
 *                 type: integer
 *                 description: 게시글 태그Id (1~5)
 *                 example: 1
 *               postTitle:
 *                 type: string
 *                 description: 게시글 제목
 *                 example: 제목1
 *               postContent:
 *                 type: string
 *                 description: 게시글 내용
 *                 example: 마이콜 최고에요 ~
 *               postAuthorId:
 *                 type: string
 *                 description: 작성자 유저Id
 *                 example: 6646bd73c01355f9d6592aa1
 *               postImages:
 *                 type: array
 *                 items: 
 *                   type: string
 *                 description: 게시글 이미지 url
 *                 example: ["http://example1.com","http://example2.com"]
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
// -------------postPostByLocationIdHandler---------------


const postPostByLocationIdHandler = async (req, res) => {
  const locationId = req.params.locationId;
  const body = req.body;

  const results = {};
  results.result = true;
  results.error = [];

  try {
    await postPostByLocationId(results, locationId, body);
  } catch (err) {
    results.result = false;
    results.error.push('Handler Error');
  }

  res.send(results);
  consoleBar();
  timeLog('[POST][/posts/:locationId] // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));
};

// -------------getPostByPostIdHandler---------------
/**
 * @swagger
 * /posts/{postId}:
 *   get:
 *     summary: 특정 게시글 리턴
 *     description: 특정 게시글 리턴
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: 게시글 Id
 *     responses:
 *       200:
 *         description: List of posts retrieved successfully
 *       404:
 *         description: User not found or no posts associated with the user
 *       500:
 *         description: Internal server error
 *     tags:
 *       - posts
 */
// -------------getPostByPostIdHandler---------------

const getPostByPostIdHandler = async (req, res) => {
  const postId = req.params.postId;

  const results = {};
  results.result = true;
  results.error = [];

  try {
    await getPostByPostId(results, postId);
  } catch (err) {
    results.result = false;
    results.error.push("Handler Error");
  }

  res.send(results);
  consoleBar();
  timeLog('[GET][/posts/:postId] // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));
};

// -------------deletePostByPostIdHandler---------------
/**
 * @swagger
 * /posts/{postId}:
 *   delete:
 *     summary: 특정 게시글 삭제
 *     description: 특정 게시글 삭제
 *     parameters:
 *       - in: path
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
 *       - posts
 */
// -------------deletePostByPostIdHandler---------------

const deletePostByPostIdHandler = async (req, res) => {
  const postId = req.params.postId;

  const results = {};
  results.result = true;
  results.error = [];

  try {
    await deletePostByPostId(results, postId);
  } catch (err) {
    results.result = false;
    results.error.push("Handler Error");
  }

  res.send(results);
  consoleBar();
  timeLog('[DELETE][/posts/:postId] // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));
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
 *         description: 유저 Id
 *     responses:
 *       200:
 *         description: List of posts retrieved successfully
 *       404:
 *         description: User not found or no posts associated with the user
 *       500:
 *         description: Internal server error
 *     tags:
 *       - users
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

export { getAllPostsHandler, getPostByLocationIdHandler, postPostByLocationIdHandler, 
  getPostByPostIdHandler, deletePostByPostIdHandler, getPostByUserIdHandler };