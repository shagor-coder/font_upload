const UserModel = require('../models/userModels');

const verfiyEmailAddress = async function (req, res) {
	const userId = req.params.id;

	const isUser = await UserModel.findById(userId);
	if (!isUser) {
		res.json({
			status: 401,
			message: 'User Not Valid!!',
		});
	}

	const user = isUser._doc;
	const update = {
		...user,
		isVerified: true,
	};

	await UserModel.findByIdAndUpdate(userId, update);

	res.json({
		status: 200,
		message: 'Verification Success',
	});
};

module.exports = verfiyEmailAddress;
