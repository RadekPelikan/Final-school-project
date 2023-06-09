const mongoose = require("mongoose");

const telephoneSchema = mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  displayType: { type: String, required: true },
  storageSize: { type: Number, required: true }, // GB
  ramSize: { type: Number, required: true }, // GB
  color: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Telephone", telephoneSchema);
