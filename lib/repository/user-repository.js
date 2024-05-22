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
      const user = await User.findById(userId);
      if (user) {
        // Check if the user has already liked the post
        if (user.likedPostId.includes(postId)) {
          results.result = false;
          results.error.push("User already liked this post");
        } else {
          // Add the postId to the likedPostId array
          user.likedPostId.push(postId);
          await user.save();
          results.user = user;
        }
      } else {
        results.error.push("User not found Error");
      }
    } catch (err) {
      results.result = false;
      results.error.push('Repository Error - postUserLikePost');
    }
  } catch (err) {
    results.result = false;
    results.error.push('DB connection Error');
  }
};

export { getAllUsers, getUserById, postUserLikePost };