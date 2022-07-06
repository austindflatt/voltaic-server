const mongoose = require('mongoose');

const CheckInSchema = new mongoose.Schema({
  chargerUser: { type: mongoose.Schema.ObjectId,ref: "user" },
  chargeStation: { type: mongoose.Schema.ObjectId,ref: "station" },
  chargeStatus: { type: String, required: true },
  rating: { type: Number, default: 0, min: 0, max: 5, },
  review: { type: String, required: true },
  photo: { type: String }
}, { timestamps: true })

module.exports = mongoose.model("checkIn", CheckInSchema);