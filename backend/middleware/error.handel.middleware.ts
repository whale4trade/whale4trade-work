import express, {Request, Response, NextFunction} from 'express'

import Error from '../interface/error.interface'

const errorHandelMiddleware = (
	error: Error,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	const status = error.status || 500
	const message = error.message || 'something error please check yourself'
	res.status(status).json({
		status: 'error',
		message,
	})
}

export default errorHandelMiddleware
