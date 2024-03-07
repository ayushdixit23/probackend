const mongoose = require("mongoose");
const Fontsss = new mongoose.Schema({
  link: String,
  name: String,
  
});

module.exports = mongoose.model("Fontsss", Fontsss);
