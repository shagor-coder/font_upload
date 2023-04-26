const UserModel = require('../models/userModels');
const File = require('../models/fileModel');

const uploadFileController = async function (req, res) {
	try {
		const file = new File({
			filename: req.file.filename,
			contentType: 'woff2',
			size: req.file.size,
			path: req.file.path,
		});

		await file.save();

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
