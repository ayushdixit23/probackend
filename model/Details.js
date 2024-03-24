const mongoose = require("mongoose")

const detailsSchema = mongoose.Schema({
	name: { type: String },
	email: { type: String },
	phone: { type: Number },
	message: { type: String },
	doc: { type: String },
	batch: { type: String }
})

module.exports = mongoose.model("Details", detailsSchema)