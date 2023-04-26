const admin = require('firebase-admin');
const serviceAccount = require('../fl/service.json');
const UserModel = require('../models/userModels');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	storageBucket: 'gs://blog-website-bc551.appspot.com',
});

const bucket = admin.storage().bucket();

const uploadFileController2 = async function (req, res) {
	try {
		const fileName = `${Date.now()}__${req.file.originalname}`;

		const fileBuffer = req.file.buffer;
		const base64String = fileBuffer.toString('base64');
		const fileRef = bucket.file(req.id + '/' + fileName);
		const fileStream = fileRef.createWriteStream({
			metadata: {
				contentType: 'font/woff2',
			},
		});
		fileStream.on('error', (error) => {
			res.json({
				status: 401,
				message: error.message,
			});
		});
		fileStream.on('finish', () => {
			fileRef
				.getSignedUrl({
					action: 'read',
					expires: '03-17-2060',
				})
				.then(async (url) => {
					const user = req.userData;
					const update = {
						...user,
						fonts: [...user.fonts, { name: fileName, fontURL: url[0] }],
					};

					await UserModel.findByIdAndUpdate(req.id, update);

					res.json({
						status: 200,
						message: 'Upload successful!',
						data: { name: fileName, url: url[0] },
					});
				})
				.catch((error) => {
					res.json({
						status: 401,
						message: error.message,
					});
				});
		});
		fileStream.end(Buffer.from(base64String, 'base64'));
	} catch (err) {
		res.json({
			status: 401,
			message: err.message,
		});
	}
};

module.exports = { uploadFileController2 };
