const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModels');
const bcrypt = require('bcrypt');

const LoginController = async function (req, res) {
	const reqBody = req.body;

	const payload = {
		email: reqBody.email,
	};

	try {
		const findUser = await UserModel.findOne(payload);

		if (!findUser) {
			res.json({
				status: 404,
				message: 'No User Exist!!',
			});

			return;
		}

		const compare = await bcrypt.compare(reqBody.password, findUser.password);

		if (!compare) {
			res.json({
				status: 404,
				message: 'Please check your password',
			});
			return;
		}

		const tokenPayload = {
			email: findUser.email,
			id: findUser._id.toString(),
		};

		res.json({
			status: 200,
			message: 'User Authenticated',
			user: jwt.sign(tokenPayload, 'secret123'),
		});
	} catch (err) {
		res.json({ status: 404, message: err.message });
	}
};

module.exports = LoginController;
