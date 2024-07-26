import mongoose from "mongoose";

const regionRequestSchema = new mongoose.Schema({
  nationName: String,
  regionName: String,
  created: { type: Date, default: Date.now}
});

const regionRequest = mongoose.model('regionRequest', regionRequestSchema);

export { regionRequest };