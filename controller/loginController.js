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
			res.status(404).json({
				message: 'No User Exist!!',
			});

			return;
		}

		if (!findUser.isVerified) {
			res.status(401).json({
				message: 'Please verify your email first!!',
			});
			return;
		}

		const compare = await bcrypt.compare(reqBody.password, findUser.password);

		if (!compare) {
			res.status(401).json({
				message: 'Please check your password',
			});
			return;
		}

		const tokenPayload = {
			email: findUser.email,
			id: findUser._id.toString(),
		};

		res.status(200).json({
			message: 'User Authenticated',
			user: jwt.sign(tokenPayload, 'secret123'),
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = LoginController;
