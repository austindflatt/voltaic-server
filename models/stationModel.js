const mongoose = require('mongoose');

const StationSchema = new mongoose.Schema({
  image: { type: String, required: true, unique: true,},
  name: { type: String, required: true, unique: true },
  address: { type: String, required: true, unique: true },
  lat: { type: String, required: true, unique: true },
  long: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  plugType: { type: String, required: true },
  network: { type: String, required: true },
  open247: { type: Boolean, required: true },
  restricted: { type: Boolean, required: true },
  paymentRequired: { type: Boolean, required: true },
  active: { type: Boolean, required: true },
  homeCharger: { type: Boolean, required: true },
  hours: { type: String, required: true },
  phoneNumber: { type: String, required: false },
  price: { type: Number, required: false },
  parkingLevel: { type: String, required: true },
  parkingAttributes: { type: Array, required: false },
  accessRestrictions: { type: Array, required: false },
  amenities: { type: Array, required: false },
  creator: [{ type: mongoose.Schema.ObjectId, ref: "user" }],
  checkIns: [{ type: mongoose.Schema.ObjectId, ref: "checkIn" }],
}, { timestamps: true })

module.exports = mongoose.model("station", StationSchema);