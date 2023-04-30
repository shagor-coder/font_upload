const { storage } = require('../config/firebase');
const UserModel = require('../models/userModels');

const deleteFileController = async function (req, res) {
	try {
		const fileName = req.params.name;
		const filePath = req.id + '/' + fileName;
		console.log(filePath);
		const user = req.userData;
		const file = storage.bucket().file(filePath);

		file
			.delete()
			.then(() => {
				console.log(`File ${file.name} deleted successfully.`);
			})
			.catch((error) => {
				console.error(`Error deleting file ${file.name}:`, error);
			});

		const filteredFonts = user.fonts.filter((font) => {
			return font.name !== fileName;
		});

		const update = {
			...user,
			fonts: filteredFonts,
		};
		await UserModel.findByIdAndUpdate(req.id, update);

		res.status(200).json({
			status: 200,
			message: 'Font Successfully deleted!',
		});
	} catch (err) {
		res.status(500).json({
			status: 500,
			message: err.message,
		});
	}
};

module.exports = deleteFileController;
