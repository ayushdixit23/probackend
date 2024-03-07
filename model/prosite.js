const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Prositeschema = new mongoose.Schema({
  //id: ObjectId,
  bgimg: [{ type: String }],
});

module.exports = mongoose.model("Pro", Prositeschema);
