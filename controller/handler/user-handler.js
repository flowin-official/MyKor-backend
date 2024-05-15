'use strict';
import dotenv from 'dotenv';
dotenv.config();

import { getAllUsers, getUserById } from '../../lib/repository/user-repository.js';
import { consoleBar, resSend, timeLog } from '../../config/common.js';

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
 *         description: ID of the user to retrieve
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */


const getUserByIdHandler = async (req, res) => {
  const userId = req.params.userId;
  console.log(userId);

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
  timeLog('[GET][/users] // ' + JSON.stringify(req.query) + ' // ' + JSON.stringify(results));
};

export { getAllUsersHandler, getUserByIdHandler };