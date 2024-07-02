import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  kakaoRefreshToken: { type: String, default: null },
  appleRefreshToken: { type: String, default: null },
  userName: String,
  userNickName: String,
  phoneNum: String,
  userImage: String,
  userEmail: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  likedPostId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  locationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

export { User };
