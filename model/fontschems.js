const mongoose = require("mongoose");
const Fontsss = new mongoose.Schema({
  link: String,
  name: String,
  fontFamily: { type: String },
  fontSize: { type: String },
  fontWeight: { type: String },
  fontStyle: { type: String },
  textDecoration: { type: String },
  lineHeight: { type: String },
  letterSpacing: { type: String },
  color: { type: String },
  textAlign: { type: String },
  premium: { type: Boolean, default: false }
});

module.exports = mongoose.model("Fontsss", Fontsss);
