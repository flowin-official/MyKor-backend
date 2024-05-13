import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  postLocationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
  postTag: String,
  postTitle: String,
  postContent: String,
  postAuthorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  postViews: { type: Number, default: 0 },
  postLikes: { type: Number, default: 0 },
  postComments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  postImages: [String],
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

export default Post;
