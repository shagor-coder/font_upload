const profileController = async function (req, res) {
	try {
		const user = req.userData;

		delete user.password;

		if (!user) {
			res.status(404).json({
				message: 'User Not Found!!',
			});
			return;
		}
		res.status(200).json({
			message: 'User Is Authenticated!!',
			data: user,
		});
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};

module.exports = profileController;
