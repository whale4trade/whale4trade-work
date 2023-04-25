import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'
import Error from '../interface/error.interface'
const handleAuthError = (next: NextFunction) => {
	const error: Error = new Error('login Error:please try agin')
	error.status = 401
	next(error)
}

const validateTokenMiddleware = (
	req: Request,
	_res: Response,
	next: NextFunction
) => {
	try {
		const authHeaders = req.get('Authorization')
		if (authHeaders) {
			const bearer = authHeaders.split(' ')[0].toLowerCase()
			const token = authHeaders.split(' ')[1]
			if (token && bearer === 'bearer') {
				const decode = jwt.verify(token, config.tokenSecret as unknown as string)
				if (decode) {
					next()
				} else {
					handleAuthError(next)
				}
			} else {
				handleAuthError(next)
			}
		} else {
			handleAuthError(next)
		}
	} catch (error) {
		handleAuthError(next)
	}
}
export default validateTokenMiddleware
