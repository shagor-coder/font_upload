const UserModel = require('../models/userModels');
const bcrypt = require('bcrypt');

const UserController = async function (req, res) {
	const reqBody = req.body;

	const hashed = await bcrypt.hash(reqBody.password, 10);
	const userDoc = {
		full_name: reqBody.full_name,
		email: reqBody.email,
		password: hashed,
	};
	try {
		const createdUser = await UserModel.create(userDoc);
		const user = {
			id: createdUser._id.toString(),
			email: createdUser.email,
		};
		res.json({
			status: 200,
			message: 'User Created',
			user: user,
		});
	} catch (err) {
		res.json({ status: 404, message: err.message });
	}
};

module.exports = UserController;
