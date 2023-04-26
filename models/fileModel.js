const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
	filename: String,
	contentType: String,
	size: Number,
	path: String,
	createdAt: { type: Date, default: Date.now },
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
