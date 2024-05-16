'use strict';
import dotenv from 'dotenv';
dotenv.config();

import { Post } from '../model/post-model.js';
import { connection } from '../connect.js';

const getAllPosts = async (results, skip, unit) => {
  try {
    await connection;
    try {
      const posts = await Post.find().skip(skip).limit(unit);
      if (posts) {
        results.posts = posts;
      }
      else {
        results.error.push("Post not found Error");
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

const getPostByLocationId = async (results, locationId, skip, unit) => {
  try {
    await connection;
    try {
      const posts = await Post.find({ postLocationId: locationId }).skip(skip).limit(unit);
      if (posts) {
        results.posts = posts;
      }
      else {
        results.error.push("Post not found Error");
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

const getPostByUserId = async (results, userId) => {
  try {
    await connection;
    try {
      const posts = await Post.find({ postAuthorId: userId });
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

export { getAllPosts, getPostByLocationId, getPostByUserId };
