const mongoose = require('mongoose');

const StationSchema = new mongoose.Schema({
  image: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true, unique: true },
  lat: { type: String, required: false },
  long: { type: String, required: false },
  description: { type: String, required: true },
  plugType: { type: String, required: true },
  network: { type: String, required: true },
  open247: { type: Boolean, required: true },
  starlink: { type: Boolean, required: true },
  count: { type: Number, required: false },
  restricted: { type: Boolean, required: true },
  paymentRequired: { type: Boolean, required: true },
  active: { type: Boolean, required: true },
  homeCharger: { type: Boolean, required: true },
  hours: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  price: { type: String, required: false },
  parkingLevel: { type: Number, required: false },
  parkingAttributes: { type: Array, required: false },
  accessRestrictions: { type: Array, required: false },
  amenities: { type: Array, required: false },
  chargerCreator: { type: mongoose.Schema.ObjectId, ref: "user" },
  checkIns: [{ type: mongoose.Schema.ObjectId, ref: "checkIn" }],
  favorites: [{ type: mongoose.Schema.ObjectId, ref: "user" }],
}, { timestamps: true })

module.exports = mongoose.model("station", StationSchema);