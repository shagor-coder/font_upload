const UserModel = require('../models/userModels');
const jwt = require('jsonwebtoken');

const UserController = async function (req, res) {
	const reqBody = req.body;
	const userDoc = {
		full_name: reqBody.full_name,
		email: reqBody.email,
		password: reqBody.password,
	};
	try {
		await UserModel.create(userDoc);
		res.json({
			status: 200,
			message: 'User Created',
			user: jwt.sign(
				{ email: userDoc.email, password: userDoc.password },
				'secretkey'
			),
		});
	} catch (err) {
		res.json({ status: 404, message: err.message });
	}
};

module.exports = UserController;
