require('dotenv').config();
const express = require('express');
const path = require('path');
const reload = require('reload');
const router = require('./router/router');
const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 3002;
const HOST = 'localhost';

mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB:', error.message);
	});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	express.static(path.join(__dirname, 'public'), {
		extensions: false,
		maxAge: 0,
	})
);

app.set('view engine', 'ejs');

app.use(router);

app.listen(PORT, HOST, () => {
	console.log('Server is running at', 'http://' + HOST + ':' + PORT);
});

reload(app);
