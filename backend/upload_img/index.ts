import express, {Request, Response, Application} from 'express'
import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './src/uploads/')
	},
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	},
})

const upload = multer({storage})

export default upload
