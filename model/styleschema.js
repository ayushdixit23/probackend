const mongoose = require("mongoose");
const Styles = new mongoose.Schema({
  buttoncolor: { type: String },
  backgroundColor: { type: String },
  color: { type: String },
  premium: { type: Boolean, default: false },
  color1: {
    type: String
  },
  color2: {
    type: String
  },
});

module.exports = mongoose.model("Styles", Styles);

