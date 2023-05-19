import {Router, Request, Response} from 'express'
import config from '../../config'
import ReqModel from '../../models/request.model'
const reqModel = new ReqModel()

const routes = Router()
//create
routes.post('/', async (req: Request, res: Response, next) => {
	try {
		const request = await reqModel.create(req.body)
		res.json({
			status: 'success',
			data: {...request},
			message: 'request created successfully',
		})
	} catch (err) {
		next(err)
	}
})
routes.get('/user/:id', async (req: Request, res: Response, next) => {
	try {
		const request = await reqModel.getONFromUser(
			req.params.id as unknown as string
		)
		res.json({
			status: 'success',
			data: request,
			message: 'request retrieved successfully',
		})
	} catch (err) {
		next(err)
	}
})

routes.get('/', async (req: Request, res: Response, next) => {
	try {
		const request = await reqModel.getAll()
		res.json({
			status: 'success',
			data: request,
			message: 'request retrieved successfully',
		})
	} catch (err: any) {
		next(err.message)
	}
})

routes.get('/:id', async (req: Request, res: Response, next) => {
	try {
		const request = await reqModel.getOne(req.params.id as unknown as string)
		res.json({
			status: 'success',
			data: request,
			message: 'request retrieved successfully',
		})
	} catch (err) {
		next(err)
	}
})
routes.patch('/:id', async (req: Request, res: Response, next) => {
	try {
		const request = await reqModel.update(req.body)
		res.json({
			status: 'success',
			data: request,
			message: 'request updated successfully',
		})
	} catch (err) {
		next(err)
	}
})

export default routes
