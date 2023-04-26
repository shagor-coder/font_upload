require('dotenv').config();
const admin = require('firebase-admin');
const UserModel = require('../models/userModels');

admin.initializeApp({
	credential: admin.credential.cert({
		type: process.env.FIREBASE_TYPE,
		project_id: process.env.FIREBASE_PROJECT_ID,
		private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
		private_key: process.env.FIREBASE_PRIVATE_KEY,
		client_email: process.env.FIREBASE_CLIENT_EMAIL,
		client_id: process.env.FIREBASE_CLIENT_ID,
		auth_uri: process.env.FIREBASE_AUTH_URI,
		token_uri: process.env.FIREBASE_TOKEN_URI,
		auth_provider_x509_cert_url:
			process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
		client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
	}),
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
