'use strict';
import dotenv from 'dotenv';
dotenv.config();

import { Post } from '../model/post-model.js';
import { connection } from '../connect.js';

const getAllPosts = async (results, skip, unit, tagId) => {
  try {
    await connection;
    try {
      const query = {};

      if (tagId) {
        query.postTag = tagId;
      }
      const posts = await Post.find(query).skip(skip).limit(unit);
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

const getPostByLocationId = async (results, locationId, skip, unit, tagId) => {
  try {
    await connection;
    try {
      const query = {};
      query.postLocationId = locationId;
      if (tagId) {
        query.postTag = tagId;
      }
      const posts = await Post.find(query).skip(skip).limit(unit);
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
