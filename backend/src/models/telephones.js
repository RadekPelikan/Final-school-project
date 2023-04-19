const mongoose = require("mongoose");

const telephonesSchema = mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    displayType: { type: String, required: true },
    storageSize: { type: Number, required: true }, // GB
    ramSize: { type: Number, required: true }, // GB
    color: { type: String, required: true },
});

module.exports = mongoose.model("Telephones", telephonesSchema);