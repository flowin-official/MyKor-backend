'use strict';
import dotenv from 'dotenv';
dotenv.config();

import { User } from '../model/user-model.js';
import { connection } from '../connect.js';

const getAllUsers = async (results) => {
  try {
    await connection;
    try {
      const users = await User.find();
      if(users) {
        results.users = users;
      }
      else {
        results.error.push("User not found Error");
      }
      await connection.close();
    } catch (err) {
      results.result = false;
      results.error.push('Repository Error');
    }
  } catch (err) {
    results.result = false;
    results.error.push('DB connection Error');
  }
};

const getUserById = async (results, userId) => {
  try {
    await connection;
    try {
      const users = await User.findById(userId);
      if(users) {
        results.users = users;
      }
      else {
        results.error.push("User not found Error");
      }
    } catch (err) {
      results.result = false;
      results.error.push('Repository Error');
    }
  } catch (err) {
    results.result = false;
    results.error.push('DB connection Error');
  }
}

export { getAllUsers, getUserById };