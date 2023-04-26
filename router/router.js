require('dotenv').config();
const express = require('express');
const router = express.Router();
const path = require('path');
// const upload = require('../middlewares/uploadFile');
const UserController = require('../controller/userController');
const LoginController = require('../controller/loginController');
const checkAuthToken = require('../middlewares/checkAuthToken');
// const uploadFileController = require('../controller/uploadFileController');
const deleteFileController = require('../controller/deleteFileController');
const profileController = require('../controller/profileController');
const { uploadFileController2 } = require('../controller/uploadController_v2');
const upload2 = require('../controller/uploadFile_v2');

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
	.get('/profile', (req, res) => {
		res.render('user');
	})
	.get('/uploads/:id/:file', (req, res) => {
		const fileName = req.params.file;
		const fileFolder = req.params.id;
		const filePath = path.join(__dirname, `../uploads/${fileFolder}`, fileName);

		try {
			res.sendFile(filePath);
		} catch (error) {
			res.json({ status: 404, message: 'Requested File Not Found!!' });
		}
	})
	.delete('/font/:name', checkAuthToken, deleteFileController)
	.post('/profile', checkAuthToken, profileController)
	.post('/signup', UserController)
	.post('/login', LoginController)
	.post('/font', checkAuthToken, upload2.single('font'), uploadFileController2);

module.exports = router;
