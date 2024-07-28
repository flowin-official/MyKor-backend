import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  kakaoId: { type: String, default: null, unique: true },
  appleId: { type: String, default: null },
  userName: { type: String, default: null },
  userNickname: { type: String, default: null },
  userEmail: { type: String, default: null },
  userProfileImage: { type: String, default: null },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  likedPostId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

export { User };
