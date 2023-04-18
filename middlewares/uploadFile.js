const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const userFolder = path.join(__dirname, `../uploads/${req.id}/`);
		if (!fs.existsSync(userFolder)) {
			mkdirp(userFolder, function (err) {
				if (err) {
					console.error(err);
					cb(err);
				} else {
					cb(null, userFolder);
				}
			});
		} else {
			cb(null, userFolder);
		}
	},
	filename: function (req, file, cb) {
		cb(
			null,
			new Date().getTime() +
				'__' +
				file.originalname.trim().toLowerCase().replaceAll(' ', '_')
		);
	},
});

const fileFilter = (req, file, cb) => {
	const regex = /\.woff2$/;
	if (regex.test(file.originalname)) {
		cb(null, true);
	} else {
		cb(new Error('Only .woff2 files are allowed!'), false);
		return 'Not Allowed';
	}
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
