const mongoose = require('mongoose');

const CheckInSchema = new mongoose.Schema({
  chargerUser: { type: mongoose.Schema.ObjectId,ref: "user" },
  chargeStation: { type: mongoose.Schema.ObjectId,ref: "station" },
  chargeStatus: { type: String, required: true, unique: true },
  review: { type: String, required: true, unique: true },
  photo: { type: String, unique: true }
}, { timestamps: true })

module.exports = mongoose.model("checkIn", CheckInSchema);