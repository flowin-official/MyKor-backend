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
      results.users = users;
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

export { getAllUsers };