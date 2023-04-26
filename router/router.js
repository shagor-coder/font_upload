require('dotenv').config();
const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');
const LoginController = require('../controller/loginController');
const checkAuthToken = require('../middlewares/checkAuthToken');
const deleteFileController = require('../controller/deleteFileController');
const profileController = require('../controller/profileController');
const { uploadFileController2 } = require('../controller/uploadController_v2');
const upload2 = require('../controller/uploadFile_v2');
const sendVerificationEmailToUser = require('../middlewares/sendVerificationEmail');
const verfiyEmailAddress = require('../controller/verifyEmail');

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
	.get('/verify/:id', verfiyEmailAddress)
	.get('/profile', (req, res) => {
		res.render('user');
	})
	.delete('/font/:name', checkAuthToken, deleteFileController)
	.post('/profile', checkAuthToken, profileController)
	.post('/signup', UserController, sendVerificationEmailToUser)
	.post('/login', LoginController)
	.post('/font', checkAuthToken, upload2.single('font'), uploadFileController2);

module.exports = router;
