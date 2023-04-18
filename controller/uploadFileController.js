const UserModel = require('../models/userModels');

const uploadFileController = async function (req, res) {
	try {
		const fileName = req.file.filename;
		const filePath = `${req.protocol}://${req.get('host')}/uploads/${
			req.id
		}/${fileName}`;

		const user = req.userData;
		const update = {
			...user,
			fonts: [...user.fonts, { name: fileName, fontURL: filePath }],
		};
		await UserModel.findByIdAndUpdate(req.id, update);
		res.json({
			status: 200,
			message: 'Upload Successfull!!',
			data: { fileName: fileName, filePath: filePath },
		});
	} catch (err) {
		res.json({
			status: 401,
			message: err.message,
		});
	}
};

module.exports = uploadFileController;
