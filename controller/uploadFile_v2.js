const multer = require('multer');
const memoryStorage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
	const regex = /\.woff2$/;
	if (regex.test(file.originalname)) {
		cb(null, true);
	} else {
		cb(new Error('Only .woff2 files are allowed!'), false);
		return 'Not Allowed';
	}
};

const upload2 = multer({ storage: memoryStorage, fileFilter: fileFilter });

module.exports = upload2;
