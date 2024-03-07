const mongoose = require("mongoose");
const Proositeschema = new mongoose.Schema({
  premium: Boolean,
  lotties: String,
});

module.exports = mongoose.model("Proo", Proositeschema);
