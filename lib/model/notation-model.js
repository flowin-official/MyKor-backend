import mongoose from "mongoose";

const notationSchema = new mongoose.Schema({
  notationName: String,
  notationContent: String,
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  notationViews: { type: Number, default: 0 },
  notationLikes: { type: Number, default: 0 },
  notationComments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  notationImages: [String],
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

const Notation = mongoose.model('Notation', notationSchema);

export { Notation }; 
