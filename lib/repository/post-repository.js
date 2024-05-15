'use strict';
import dotenv from 'dotenv';
dotenv.config();

import { Post } from '../model/post-model.js';
import { connection } from '../connect.js';

const getPostByUserId = async (results, userId) => {
  try {
    await connection;
    try {
      const posts = await Post.find({postAuthorId: userId });
      if (posts) {
        results.posts = posts;
      }
      else {
        results.error.push("Post not found Error");
      }
    } catch (err) {
      results.result = false;
      results.error.push("Repository Error");
    }
  } catch (err) {
    results.result = false;
    results.error.push("DB connection Error");
  }
};

const getPostInfoByUserIdPostId = async (results, userId, postId) => {
  try {
    await connection;
    try {
      const posts = await Post.findOne({ _id: postId, postAuthorId: userId });
      if (posts) {
        results.post = posts;
      }
      else {
        results.error.push("Post not found Error");
      }
    } catch (err) {
      results.result = false;
      results.error.push("Repository Error");
    }
  } catch (err) {
    results.result = false;
    results.error.push("DB connection Error");
  }
}

export { getPostByUserId, getPostInfoByUserIdPostId };
