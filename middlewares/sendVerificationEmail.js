const nodemailer = require('nodemailer');

const sendVerificationEmailToUser = async function (req, res) {
	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'fontupload72@gmail.com',
			pass: 'bbktvfkqdiuotiik',
		},
	});

	try {
		const info = await transporter.sendMail({
			from: 'fontupload72@gmail.com',
			to: req.createdUser.email,
			subject: 'Please verfiy your email',
			html: `<div>Click this link to verify <a href="${
				req.protocol
			}://${req.get('host')}/verify/${
				req.createdUser.id
			}">Click Here</a></div>`,
		});
		res.status(200).json({
			status: 200,
			message: 'Email Sent to ' + req.createdUser.email,
		});
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

module.exports = sendVerificationEmailToUser;
