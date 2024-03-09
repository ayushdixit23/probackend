const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Schema;
const Prositeschema = new mongoose.Schema({
  //id: ObjectId,
  // bgimg: [{ type: String }],
  // img: [{ type: String }
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
