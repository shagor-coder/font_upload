require('dotenv').config();
const express = require('express');
const path = require('path');
const reload = require('reload');
const router = require('./router/router');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3002;
const HOST = 'localhost';
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	express.static(path.join(__dirname, 'public'), {
		extensions: false,
		maxAge: 0,
	})
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(router);

app.listen(PORT, () => {
	console.log('Server is running at', 'http://' + HOST + ':' + PORT);
});

reload(app);
mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB:', error);
	});
