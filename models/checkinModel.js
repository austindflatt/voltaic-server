const mongoose = require('mongoose');

const CheckInSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId,ref: "user" },
  station: { type: mongoose.Schema.ObjectId,ref: "station" },
  chargeStatus: { type: String, required: true, unique: true },
  review: { type: String, required: true, unique: true },
  photo: { type: String, unique: true }
}, { timestamps: true })

module.exports = mongoose.model("checkIn", CheckInSchema);