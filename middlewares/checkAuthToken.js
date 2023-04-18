const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModels');

const checkAuthToken = async function (req, res, next) {
	const authToken = req.get('Authorization');
	const [schema, token] = authToken.split(' ');
	try {
		const decodedToken = jwt.verify(token, 'secret123');
		const user = await UserModel.findById(decodedToken.id);
		if (!user) {
			res.json({ status: 401, message: 'User not authenticated!!' });
			return;
		}
		req.userData = user._doc;
		req.id = decodedToken.id;
		next();
	} catch (error) {
		res.json({ status: 401, message: 'Please verify the token' });
	}
};

module.exports = checkAuthToken;
