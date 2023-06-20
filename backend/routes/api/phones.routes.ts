import {Router, Request, Response} from 'express'
import config from '../../config'
import PhonesModel from '../../models/phones.model'
const phonesModel = new PhonesModel()

const routes = Router()

routes.post('/', async (req: Request, res: Response, next) => {
	try {
		const phones = await phonesModel.create(req.body)
		res.json({
			status: 'success',
			data: {...phones},
			message: 'phones created successfully',
		})
	} catch (err) {
		next(err)
	}
})
//create
routes.get('/', async (req: Request, res: Response, next) => {
	try {
		const phones = await phonesModel.getAll()
		res.json({
			status: 'success',
			data: phones,
			message: 'users retrieved successfully',
		})
	} catch (err: any) {
		next(err.message)
	}
})
routes.get('/:id', async (req: Request, res: Response, next) => {
	try {
		const phones = await phonesModel.getOne(req.params.id as unknown as string)
		res.json({
			status: 'success',
			data: phones,
			message: 'phones retrieved successfully',
		})
	} catch (err) {
		next(err)
	}
})

routes.patch('/:id', async (req: Request, res: Response, next) => {
	try {
		const phones = await phonesModel.update(req.body)
		res.json({
			status: 'success',
			data: phones,
			message: 'phones updated successfully',
		})
	} catch (err) {
		next(err)
	}
})
routes.delete('/:id', async (req: Request, res: Response, next) => {
	try {
		const phones = await phonesModel.delete(req.params.id as unknown as string)
		res.json({
			status: 'success',
			data: phones,
			message: 'phones deleted successfully',
		})
	} catch (err) {
		next(err)
	}
})

export default routes
