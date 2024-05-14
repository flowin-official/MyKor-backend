'use strict';
import dotenv from 'dotenv';
dotenv.config();

import { getAllUsers } from '../../lib/repository/user-repository.js';
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

export { getAllUsersHandler };