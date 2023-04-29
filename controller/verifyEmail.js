const UserModel = require('../models/userModels');

const verfiyEmailAddress = async function (req, res) {
	const userId = req.params.id;

	try {
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

		res.status(200).json({
			status: 200,
			message: 'Email successfully verified',
		});
	} catch (error) {
		res.status(401).json({ message: 'There was an error!' });
	}
};

module.exports = verfiyEmailAddress;
