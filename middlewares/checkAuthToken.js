const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModels');

const checkAuthToken = async function (req, res, next) {
	const authToken = req.get('Authorization');
	const [schema, token] = authToken.split(' ');
	try {
		const decodedToken = jwt.verify(token, 'secret123');
		const user = await UserModel.findById(decodedToken.id);
		if (!user) {
			res.status(401).json({ message: 'User not authenticated!!' });
			return;
		}
		req.userData = user._doc;
		req.id = decodedToken.id;
		next();
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = checkAuthToken;
