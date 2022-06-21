const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true,},
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String, default: '' },
  coverPhoto: { type: String, default: 'https://tesla-cdn.thron.com/delivery/public/image/tesla/c877126e-0db5-409d-a412-04fc94b59b76/bvlatuR/std/2880x1800/HP-SR-Design-D' },
  bio: { type: String },
  location: { type: String },
  followers: { type: Array, default: [] },
  following: { type: Array, default: [] },
  isAdmin: { type: Boolean, default: false },
  savedStations: [{ type: mongoose.Schema.ObjectId, ref: "station" }],
  addedStations: [{ type: mongoose.Schema.ObjectId, ref: "station" }],
  checkIns: [{ type: mongoose.Schema.ObjectId, ref: "checkIn" }],
}, { timestamps: true })

module.exports = mongoose.model("user", UserSchema);