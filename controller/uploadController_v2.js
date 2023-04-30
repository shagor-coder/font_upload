const { bucket, corsConfiguration } = require('../config/firebase');
const UserModel = require('../models/userModels');

const uploadFileController2 = async function (req, res) {
	try {
		await bucket.setCorsConfiguration(corsConfiguration);

		const fileName = `${Date.now()}__${req.file.originalname.replaceAll(
			' ',
			'_'
		)}`;

		const fileBuffer = req.file.buffer;
		const base64String = fileBuffer.toString('base64');
		const filePath = req.id + '/' + fileName;
		const fileRef = bucket.file(filePath);
		const fileStream = fileRef.createWriteStream({
			metadata: {
				contentType: 'font/woff2',
				cacheControl: 'public, max-age=31536000',
			},
		});
		fileStream.on('error', (error) => {
			res.status(500).json({
				message: error.message,
			});
		});
		fileStream.on('finish', () => {
			// Make the uploaded file public
			fileRef.makePublic(async (err) => {
				if (err) {
					console.error('Error making file public:', err);
					return;
				}

				// Get the public URL of the file
				const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;

				const user = req.userData;
				const update = {
					...user,
					fonts: [...user.fonts, { name: fileName, fontURL: publicUrl }],
				};

				await UserModel.findByIdAndUpdate(req.id, update);

				console.log('Public URL:', publicUrl);

				res.status(200).json({
					status: 200,
					message: 'Upload successful!',
					data: { name: fileName, url: publicUrl },
				});
			});
		});

		fileStream.end(Buffer.from(base64String, 'base64'));
	} catch (err) {
		res.status(500).json({
			message: err.message,
		});
	}
};

module.exports = { uploadFileController2 };
