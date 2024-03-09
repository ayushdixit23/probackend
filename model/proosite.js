const mongoose = require("mongoose");
const Proositeschema = new mongoose.Schema({
  premium: { type: Boolean, default: false },
  lotties: String,
});

module.exports = mongoose.model("Proo", Proositeschema);
