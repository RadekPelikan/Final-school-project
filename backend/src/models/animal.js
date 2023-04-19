const mongoose = require("mongoose");

const animalSchema = mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  color: { type: String, required: true },
  legs: { type: Number, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Animal", animalSchema);
