const UserModel = require('../models/userModels');
const bcrypt = require('bcrypt');

const UserController = async function (req, res, next) {
	const reqBody = req.body;

	const hashed = await bcrypt.hash(reqBody.password, 10);
	const userDoc = {
		full_name: reqBody.full_name,
		email: reqBody.email,
		password: hashed,
		isVerified: false,
	};
	try {
		const createdUser = await UserModel.create(userDoc);
		const user = {
			id: createdUser._id.toString(),
			email: createdUser.email,
		};
		req.createdUser = user;
		next();
	} catch (err) {
		res.json({ status: 404, message: err.message });
	}
};

module.exports = UserController;
