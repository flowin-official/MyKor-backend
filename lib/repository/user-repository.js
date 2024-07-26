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

const getUserByKakaoId = async (results, kakaoId) => {
  try {
    await connection;
    try {
      const user = await User.findOne({ kakaoId: kakaoId });
      if (user) {
        results.user = user;
      } else {
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

const postUser = async (results, userData) => {
  try {
    await connection;
    try {
      const existUser = await User.findOne({ userEmail: userData.userEmail });
      if (existUser) {
        results.result = false;
        results.error.push('Existing User Error');
        return;
      }
      const kakaoId = userData.kakaoUserCode;
      const appleId = userData.appleId;
      const newUser = new User({ kakaoId: kakaoId, userName: userData.userName, userEmail: userData.userEmail, appleId: appleId });
      try {
        const savedUser = await newUser.save();
        results.user = savedUser;
      } catch (err) {
        results.result = false;
        results.error.push('Repository input Error');
      }
    } catch (err) {
      results.result = false;
      results.error.push('Repository exist user check Error');
      console.log(err);
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
        // 유저가 이미 좋아요 눌렀는지 확인
        if (user.likedPostId.includes(postId)) {
          results.result = false;
          results.error.push("User already liked this post");
        } else {
          // likedPost에 추가
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

const getUserLikePost = async (results, userId) => {
  try {
    await connection;
    try {
      const user = await User.findById(userId).select('likedPostId');
      if (user) {
        results.user = user;
      }
      else {
        results.error.push('Liked post not exist Error');
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

const deleteUserLikePost = async (results, userId, postId) => {
  try {
    await connection;
    try {
      const user = await User.findByIdAndUpdate(userId, { $pull: { likedPostId: postId } }, { new: true });
      if (user) {
        results.user = user;
      } else {
        results.error.push('User not found');
      }
    } catch (err) {
      results.result = false;
      results.error.push('Repository Error - removeUserLikedPost');
    }
  } catch (err) {
    results.result = false;
    results.error.push('DB connection Error');
  }
}

export { getAllUsers, getUserByKakaoId, postUser, getUserById, postUserLikePost, getUserLikePost, deleteUserLikePost };