const mongoose = require("mongoose");

const animalsSchema = mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  color: { type: String, required: true },
  legs: { type: Number, required: true },
  description: { type: String, required: true },  
});

module.exports = mongoose.model("Animals", animalsSchema);