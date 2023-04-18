const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userScema = new Schema(
	{
		full_name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		fonts: [
			{
				name: String,
				fontURL: String,
			},
		],
	},
	{ collection: 'users' }
);

const UserModel = mongoose.model('UserData', userScema);

module.exports = UserModel;
