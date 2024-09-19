const mongoose = require("mongoose");
const Prositeschema = new mongoose.Schema({
  bgimg: [
    {
      link: { type: String },
      premium: { type: Boolean },
      name: [{ type: String }]
    }
  ],
  img: [
    {
      link: { type: String },
      premium: { type: Boolean },
      name: [{ type: String }]
    }
  ],
});

module.exports = mongoose.model("Pro", Prositeschema);
