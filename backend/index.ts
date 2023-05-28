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

const app: Application = express()
const port = config.port || 3000
app.use(errorHandelMiddleware)

app.use(morgan('common'))
app.use(express.json())

app.use(
	cors({
		credentials: true,
		origin: [
			'https://shimmering-phoenix-977e7f.netlify.app',
			'https://www.whale4trade.com',
			'https://whale4trade.com',
			'http://localhost:3000',
			'http://localhost:3001',
		],
	})
)
app.use(cookieParser())

// app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}))
app.use('/api', routes)

app.get('/healthz', (_req: Request, res: Response) => {
	res.send({status: 'ok✌️'})
})

app.post('/upload', upload.single('image'), (req: any, res) => {
	res.send(req.file.filename)
})

app.use('/uploads', express.static('uploads'))

app.get('/image/:filename', (req, res) => {
	const {filename} = req.params
	res.sendFile(req.params.filename, {root: path.join(__dirname, '/uploads')})
})
app.post('/ver', (req: Request, res: Response) => {
	sendMail(req.body.email, req.body.number), res.json({message: 'Email send'})
})

app.listen(port, () => {
	console.log(`server is start with port :${port}`)
})
