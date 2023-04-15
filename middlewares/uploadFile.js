const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const userFolder = path.join(__dirname, '../uploads/');
		cb(null, userFolder);
	},
	filename: function (req, file, cb) {
		cb(
			null,
			new Date().getTime() +
				file.originalname.trim().toLowerCase().replaceAll(' ', '_')
		);
	},
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'font/woff2') {
		cb(null, true);
	} else {
		cb(new Error('Only .woff2 files are allowed!'), false);
		return 'Not Allowed';
	}
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
