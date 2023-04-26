const nodemailer = require('nodemailer');

const sendVerificationEmailToUser = async function (req, res) {
	let testAccount = await nodemailer.createTestAccount();

	const transporter = nodemailer.createTransport({
		host: 'smtp.ethereal.email',
		port: 587,
		secure: false,
		auth: {
			user: testAccount.user, // generated ethereal user
			pass: testAccount.pass, // generated ethereal password
		},
	});

	try {
		const info = await transporter.sendMail({
			from: testAccount.user,
			to: req.createdUser.email,
			subject: 'Please verfiy your email',
			text: `Click this link to verify ${req.protocol}://${req.get(
				'host'
			)}/verify/${req.createdUser.id}`,
		});
		console.log(info);
		res.json({
			status: 200,
			message: 'Email Sent to' + req.createdUser.email,
		});
	} catch (error) {
		res.json({
			status: 401,
			message: 'There was an error with gmail!',
		});
	}
};

module.exports = sendVerificationEmailToUser;
