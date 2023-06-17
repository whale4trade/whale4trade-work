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
app.use(cookieParser())

app.use(function (req, res, next) {
	// Allow access request from any computers
	res.header('Access-Control-Allow-Origin', '*')
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	)
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, PATCH')
	res.header('Access-Control-Allow-Credentials', true)
	if ('OPTIONS' == req.method) {
		res.sendStatus(200)
	} else {
		next()
	}
})
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
