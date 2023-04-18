const UserModel = require('../models/userModels');
const fs = require('fs');
const path = require('path');

const deleteFileController = async function (req, res) {
	try {
		const fileName = req.params.name;
		const filePath = path.join(__dirname, `../uploads/${req.id}/`, fileName);
		const user = req.userData;

		const filteredFonts = user.fonts.filter((font) => {
			return font.name !== fileName;
		});

		const update = {
			...user,
			fonts: filteredFonts,
		};
		await UserModel.findByIdAndUpdate(req.id, update);

		fs.unlink(filePath, (err) => {
			try {
				res.json({ status: 200, message: 'Font Deteleted!!' });
			} catch (error) {
				res.json({ status: 401, message: error.message });
			}
		});
	} catch (err) {
		res.json({
			status: 401,
			message: err.message,
		});
	}
};

module.exports = deleteFileController;
