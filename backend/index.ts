//import tools from node
import express, {Request, Response, Application} from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import path from 'path'

//import files
import config from './config'
import errorHandelMiddleware from './middleware/error.handel.middleware'
import routes from './routes'
import upload from './upload_img/index'
import sendMail from './send_email/index'
console.log(config)

const app: Application = express()
const port = config.port || 3000
app.use(errorHandelMiddleware)

app.use(morgan('common'))
app.use(express.json())
app.use(
	cors({
		credentials: true,
		origin: [
			'http://localhost:3000',
			'https://6449bf12a15099183f40ac46--timely-taiyaki-6420c5.netlify.app',
		],
	})
)

app.use(cookieParser())

app.use(helmet())
app.use('/api', routes)

app.get('/healthz', (_req: Request, res: Response) => {
	res.json({
		message: 'pes✌️',
	})
})

app.post('/upload', upload.single('image'), (req: any, res) => {
	res.send(req.file.filename)
})

app.use('/uploads', express.static('uploads'))

app.get('/image/:filename', (req, res) => {
	const {filename} = req.params
	res.sendFile(`${__dirname}/uploads/${filename}`)
})
app.post('/ver', (req: Request, res: Response) => {
	sendMail(req.body.email, req.body.number), res.json({message: 'Email send'})
})

app.listen(port, () => {
	console.log(`server is start with port :${port}`)
})
