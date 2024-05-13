import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  adminLevel: String,
  adminName: String,
  adminPassword: String,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
