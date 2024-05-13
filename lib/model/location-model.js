import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  nationName: String,
  locationName: String,
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

const Location = mongoose.model('Location', locationSchema);

export default Location;
