const mongoose = require("mongoose");
const Styles = new mongoose.Schema({
  buttoncolor: { type: String },
  backgroundColor: { type: String },
  color: { type: String },
});

module.exports = mongoose.model("Styles", Styles);
