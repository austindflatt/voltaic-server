const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true,},
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String, default: '' },
  bio: { type: String },
  location: { type: String },
  followers: { type: Array, default: [] },
  following: { type: Array, default: [] },
  favoriteStations: { type: Array, default: [] },
  isAdmin: { type: Boolean, default: false },
  hostedStations: [{ type: mongoose.Schema.ObjectId, ref: "station" }],
  checkIns: [{ type: mongoose.Schema.ObjectId, ref: "checkIn" }],
}, { timestamps: true })

module.exports = mongoose.model("user", UserSchema);