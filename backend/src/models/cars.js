const mongoose = require("mongoose");

const carsSchema = mongoose.Schema({
    name: { type: String, required: true },
    engineType: { type: String, required: true },
    transmissionType: { type: String, required: true },
    brand: { type: String, required: true },
    color: { type: String, required: true }
});

module.exports = mongoose.model("Cars", carsSchema);