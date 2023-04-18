const profileController = async function (req, res) {
	try {
		const user = req.userData;

		delete user.password;

		if (!user) {
			res.json({
				status: 401,
				message: 'User Not Found!!',
			});
			return;
		}
		res.json({
			status: 200,
			message: 'User Is Authenticated!!',
			data: user,
		});
	} catch (err) {
		res.json({
			status: 401,
			message: err.message,
		});
	}
};

module.exports = profileController;
