const mongoose = require("mongoose");

const CatwaySchema = new mongoose.Schema({
  catwayNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  catwayType: {
    type: String,
    required: true,
    enum: ["long", "short"], // Assure que seuls ces types sont valides
  },
  catwayState: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Catway", CatwaySchema);
