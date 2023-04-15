require('dotenv').config();
const express = require('express');
const router = express.Router();
const path = require('path');
const upload = require('../middlewares/uploadFile');
const UserController = require('../controller/userController');
const LoginController = require('../controller/loginController');

router
	.get('/', (req, res) => {
		res.render('index');
	})
	.get('/login', (req, res) => {
		res.render('login');
	})
	.get('/signup', (req, res) => {
		res.render('signup');
	})
	.get('/uploads/:file', (req, res) => {
		const fileName = req.params.file;
		const filePath = path.join(__dirname, '../uploads/', fileName);

		res.sendFile(filePath, function (err) {
			if (err) {
				console.log(err);
				res.status(err.status).end();
			} else {
				console.log('Sent:', fileName);
			}
		});
	})
	.get('/user', async (req, res) => {})
	.post('/signup', UserController)
	.post('/login', LoginController)
	.post('/font', upload.single('font'), (req, res) => {
		try {
			const fileName = req.file.filename;
			const filePath = `${req.protocol}://${req.get(
				'host'
			)}/uploads/${fileName}`;

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
	});

module.exports = router;
