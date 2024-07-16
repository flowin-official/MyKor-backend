'use strict';
import dotenv from 'dotenv';
dotenv.config();

import { getAllUsers, getUserById, postUser } from '../../lib/repository/user-repository.js';
import { consoleBar, resSend, timeLog } from '../../config/common.js';
import { generateAppleRefreshToken, generateKakaoAccessToken, generateKakaoRefreshToken } from '../../middlewares/login/auth.js';

// -------------getAllUsersHandler---------------
/**
 * @swagger
 * /users:
 *   get:
 *     summary: 모든 유저 정보 리턴
 *     description: 모든 유저 정보 리턴
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *     tags:
 *       - users
 */
// -------------getAllUsersHandler---------------

const getAllUsersHandler = async (req, res) => {
  const results = {};
  results.result = true;
  results.error = [];
  results.users = [];

  try {
    await getAllUsers(results);
  } catch (err) {
    results.result = false;
    results.error.push('Handler Error');
  }

  res.send(results);
  consoleBar();
  timeLog('[GET][/users] // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));
};

// -------------getUserByIdHandler---------------
/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: 특정 유저 정보 리턴
 *     description: 특정 유저 정보 리턴
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: 유저 Id
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *     tags:
 *       - users
 */
// -------------getUserByIdHandler---------------

const getUserByIdHandler = async (req, res) => {
  const userId = req.params.userId;

  const results = {};
  results.result = true;
  results.error = [];
  results.users = [];

  try {
    await getUserById(results, userId);
  } catch (err) {
    results.result = false;
    results.error.push('Handler Error');
  }

  res.send(results);
  consoleBar();
  timeLog('[GET][/users/:userId] // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));
};

// -------------postUserKakaoHandler---------------
/**
 * @swagger
 * /users/kakao:
 *   post:
 *     summary: 카카오 유저 신규 가입
 *     description: 카카오 유저 신규 가입
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - kakaoUserCode
 *               - userName
 *               - userEmail
 *             properties:
 *               kakaoUserCode:
 *                 type: string
 *                 description: 카카오 유저 코드
 *                 example: 11234
 *               userName:
 *                 type: string
 *                 description: 유저 이름
 *                 example: 박근원
 *               userEmail:
 *                 type: string
 *                 description: 유저 이메일
 *                 example: rmsdnjs518@gmail.com
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
 *       - users
*/
// -------------postUserKakaoHandler---------------

const postUserKakaoHandler = async (req, res) => {
  const body = req.body;

  const results = {};
  results.result = true;
  results.error = [];

  try {
    // Base 유저 디비 생성, 정보 저장
    await postUser(results, body);
    try {
      // Jwt 생성
      await generateKakaoRefreshToken(results);
      await generateKakaoAccessToken(results);
    } catch (err) {
      results.result = false;
      results.error.push('generate token error');
    }
  } catch (err) {
    results.result = false;
    results.error.push('generate base user error');
  }

  res.send(results);
  consoleBar();
  timeLog('[POST][/users/kakao] // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));
};

// -------------postUserAppleHandler---------------
/**
 * @swagger
 * /users/apple:
 *   post:
 *     summary: 애플 유저 신규 가입
 *     description: 애플 유저 신규 가입
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - appleId
 *               - userName
 *               - userEmail
 *             properties:
 *               appleId:
 *                 type: string
 *                 description: 애플 유저 코드
 *                 example: 11234
 *               userName:
 *                 type: string
 *                 description: 유저 이름
 *                 example: 박근원
 *               userEmail:
 *                 type: string
 *                 description: 유저 이메일
 *                 example: rmsdnjs518@gmail.com
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
 *       - users
*/
// -------------postUserAppleHandler---------------

const postUserAppleHandler = async (req, res) => {
  const body = req.body;

  const results = {};
  results.result = true;
  results.error = [];

  try {
    // Base 유저 디비 생성, 정보 저장
    await postUser(results, body);
    try {
      // Jwt 생성
      await generateAppleRefreshToken(results);
      await generateKakaoAccessToken(results);
    } catch (err) {
      results.result = false;
      results.error.push('generate token error');
    }
  } catch (err) {
    results.result = false;
    results.error.push('generate base user error');
  }

  res.send(results);
  consoleBar();
  timeLog('[POST][/users/apple] // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));
};


export { getAllUsersHandler, getUserByIdHandler, postUserKakaoHandler, postUserAppleHandler };