const mongoose = require("mongoose");
const Buttonss = new mongoose.Schema({
  padding: { type: String },
  shadow: { type: String },
  borderRadius: { type: String },
  backgroundColor: { type: String },
  color: { type: String },
  borderTop: { type: String },
  borderBottom: { type: String },
  borderRight: { type: String },
  borderLeft: { type: String },
  borderRadiusTop: { type: String },
  borderRadiusBottom: { type: String },
  borderRadiusRight: { type: String },
  borderRadiusLeft: { type: String },
  boxShadow: { type: String },
  fontBold: { type: String },
  premium: { type: Boolean, default: false },
});

module.exports = mongoose.model("Buttonss", Buttonss);
