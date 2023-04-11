const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadFile');
const UserController = require('../controller/userController');

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
	.post('/signup', async (req, res) => {
		await UserController(req, res);
	});

router.post('/font', upload.single('font'), (req, res) => {
	const reqData = req.body;
	console.log(reqData);
	res.status(200).send(JSON.stringify('Hello World'));
});

module.exports = router;
