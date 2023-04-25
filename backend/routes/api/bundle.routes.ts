import {Router, Request, Response} from 'express'
import config from '../../config'
import BundleModel from '../../models/bundle.model'
const bundleModel = new BundleModel()

const routes = Router()
//create
routes.post('/', async (req: Request, res: Response, next) => {
	try {
		const bundle = await bundleModel.create(req.body)
		res.json({
			status: 'success',
			data: {...bundle},
			message: 'bundle created successfully',
		})
	} catch (err) {
		next(err)
	}
})

routes.get('/', async (req: Request, res: Response, next) => {
	try {
		const bundle = await bundleModel.getAll()
		res.json({
			status: 'success',
			data: bundle,
			message: 'bundle retrieved successfully',
		})
	} catch (err: any) {
		next(err.message)
	}
})

routes.get('/:id', async (req: Request, res: Response, next) => {
	try {
		const bundle = await bundleModel.getOne(req.params.id as unknown as string)
		res.json({
			status: 'success',
			data: bundle,
			message: 'bundle retrieved successfully',
		})
	} catch (err) {
		next(err)
	}
})

routes.patch('/:id', async (req: Request, res: Response, next) => {
	try {
		const bundle = await bundleModel.update(req.body)
		res.json({
			status: 'success',
			data: bundle,
			message: 'bundle updated successfully',
		})
	} catch (err) {
		next(err)
	}
})
routes.delete('/:id', async (req: Request, res: Response, next) => {
	try {
		const bundle = await bundleModel.delete(req.params.id as unknown as string)
		res.json({
			status: 'success',
			data: bundle,
			message: 'bundle deleted successfully',
		})
	} catch (err) {
		next(err)
	}
})
export default routes
