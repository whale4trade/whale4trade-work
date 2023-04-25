import {Router, Request, Response} from 'express'
import config from '../../config'
import TransactionModel from '../../models/transaction.model'
const transactionModel = new TransactionModel()

const routes = Router()
//create
routes.post('/', async (req: Request, res: Response, next) => {
	try {
		const transaction = await transactionModel.create(req.body)
		res.json({
			status: 'success',
			data: {...transaction},
			message: 'transaction created successfully',
		})
	} catch (err) {
		next(err)
	}
})

routes.get('/', async (req: Request, res: Response, next) => {
	try {
		const transaction = await transactionModel.getAll()
		res.json({
			status: 'success',
			data: transaction,
			message: 'transaction retrieved successfully',
		})
	} catch (err: any) {
		next(err.message)
	}
})

routes.get('/:id', async (req: Request, res: Response, next) => {
	try {
		const transaction = await transactionModel.getOne(
			req.params.id as unknown as string
		)
		res.json({
			status: 'success',
			data: transaction,
			message: 'transaction retrieved successfully',
		})
	} catch (err) {
		next(err)
	}
})
routes.get('/user/:id', async (req: Request, res: Response, next) => {
	try {
		const transaction = await transactionModel.getOneByUserID(
			req.params.id as unknown as string
		)
		res.json({
			status: 'success',
			data: transaction,
			message: 'transaction retrieved successfully',
		})
	} catch (err) {
		next(err)
	}
})

export default routes
