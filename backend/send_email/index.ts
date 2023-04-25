import config from '../config'
import nodemailer from 'nodemailer'

const sendMail = (email: any, number: any) => {
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: config.uE,
			pass: config.pU,
		},
	})
	transporter.sendMail(
		{
			from: 'config.uE',
			to: email,
			subject: 'lll',
			html: `<h1>${number}</h1>`,
		},
		(err: any, info: any) => {
			if (err) throw err
		}
	)
}
export default sendMail
