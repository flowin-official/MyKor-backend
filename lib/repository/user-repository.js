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
      if (users) {
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
};

const getUserById = async (results, userId) => {
  try {
    await connection;
    try {
      const users = await User.findById(userId);
      if (users) {
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
};

const postUserLikePost = async (results, userId, postId) => {
  try {
    await connection;
    try {
      const user = await User.findByIdAndUpdate(userId, { $addToSet: { likedPostId: postId } }, { new: true });
      if (user) {
        results.user = user;
      }
      else {
        results.error.push("User not found Error");
      }
    } catch (err) {
      results.result = false;
      console.log(err);
      results.error.push('Repository Error - postUserLikePost');
    }
  } catch (err) {
    results.result = false;
    results.error.push('DB connection Error');
  }
};

export { getAllUsers, getUserById, postUserLikePost };