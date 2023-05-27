import {Router, Request, Response} from 'express'
import config from '../../config'
import OrdersModel from '../../models/orders.model'
const ordersModel = new OrdersModel()

const routes = Router()
//create
routes.post('/', async (req: Request, res: Response, next) => {
	try {
		const order = await ordersModel.create(req.body)
		res.json({
			status: 'success',
			data: {...order},
			message: 'order created successfully',
		})
	} catch (err) {
		next(err)
	}
})
routes.get('/user/:id', async (req: Request, res: Response, next) => {
	try {
		const order = await ordersModel.getONFromUser(
			req.params.id as unknown as string
		)
		res.json({
			status: 'success',
			data: order,
			message: 'order retrieved successfully',
		})
	} catch (err) {
		next(err)
	}
})

routes.get('/', async (req: Request, res: Response, next) => {
	try {
		const order = await ordersModel.getAll()
		res.json({
			status: 'success',
			data: order,
			message: 'order retrieved successfully',
		})
	} catch (err: any) {
		next(err.message)
	}
})

routes.get('/:id', async (req: Request, res: Response, next) => {
	try {
		const order = await ordersModel.getOne(req.params.id as unknown as string)
		res.json({
			status: 'success',
			data: order,
			message: 'order retrieved successfully',
		})
	} catch (err) {
		next(err)
	}
})

routes.patch('/timeWin/:id', async (req: Request, res: Response, next) => {
	try {
		const user = await ordersModel.updateWinTime(req.body)
		res.json({
			status: 'success',
			data: user,
			message: 'user updated successfully',
		})
	} catch (err) {
		next(err)
	}
})
export default routes
