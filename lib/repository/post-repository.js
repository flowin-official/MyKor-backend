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

const postPostByLocationId = async (results, locationId, body) => {
  try {
    await connection;

    if (!body.postTag || !body.postTitle || !body.postContent || !body.postAuthorId) {
      results.result = false;
      results.error.push("Missing required field in post data");
      return results;
    }

    try {
      const newPost = new Post({
        postLocationId: locationId,
        postTag: body.postTag,
        postTitle: body.postTitle,
        postContent: body.postContent,
        postAuthorId: body.postAuthorId,
        postImages: body.postImages
      });
      try {
        const savedPost = await newPost.save();
        results.post = savedPost;
      } catch (err) {
        results.result = false;
        console.log(err);
        results.error.push('Data update Error');
      }
    } catch (err) {
      results.result = false;
      results.error.push('Data input Error');
    }
  } catch (err) {
    results.result = false;
    results.error.push('DB connection Error');
  }
};

const getPostByPostId = async (results, postId) => {
  try {
    await connection;
    try {
      const posts = await Post.find({ _id: postId });
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
};

const deletePostByPostId = async (results, postId) => {
  try {
    await connection;
    try {
      const deletedPost = await Post.findByIdAndDelete(postId);
      if (!deletedPost) {
        results.result = false;
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

export { getAllPosts, getPostByLocationId, postPostByLocationId, getPostByPostId, deletePostByPostId, getPostByUserId };
