const mongoose = require("mongoose");

const carSchema = mongoose.Schema({
  name: { type: String, required: true },
  engineType: { type: String, required: true },
  transmissionType: { type: String, required: true },
  brand: { type: String, required: true },
  color: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Car", carSchema);
