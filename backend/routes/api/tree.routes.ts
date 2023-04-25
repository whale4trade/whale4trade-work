import {Router, Request, Response} from 'express'
import config from '../../config'
import TreeModel from '../../models/tree.model'
const treeModel = new TreeModel()

const routes = Router()
//create
routes.post('/', async (req: Request, res: Response, next) => {
	try {
		const tree = await treeModel.create(req.body)
		res.json({
			status: 'success',
			data: {...tree},
			message: 'tree created successfully',
		})
	} catch (err) {
		next(err)
	}
})

routes.get('/', async (req: Request, res: Response, next) => {
	try {
		const tree = await treeModel.getAll()
		res.json({
			status: 'success',
			data: tree,
			message: 'tree retrieved successfully',
		})
	} catch (err: any) {
		next(err.message)
	}
})

routes.get('/:id', async (req: Request, res: Response, next) => {
	try {
		const tree = await treeModel.getOne(req.params.id as unknown as string)
		res.json({
			status: 'success',
			data: tree,
			message: 'tree retrieved successfully',
		})
	} catch (err) {
		next(err)
	}
})
routes.patch('/bundle/:email', async (req: Request, res: Response, next) => {
	try {
		const tree = await treeModel.updateBundle(req.body)
		res.json({
			status: 'success',
			data: tree,
			message: 'tree retrieved successfully',
		})
	} catch (err) {
		next(err)
	}
})

export default routes
