const multer = require('multer');

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname.toLowerCase());
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
