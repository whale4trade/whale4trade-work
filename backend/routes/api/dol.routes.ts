import {Router, Request, Response} from 'express'
import config from '../../config'
import Dol from '../../models/dol.modle'
const dol = new Dol()
const routes = Router()

routes.post('/', async (req: Request, res: Response, next) => {
	try {
		const dollar = await dol.createDol(req.body)
		res.json({
			status: 'success',
			data: {...dollar},
			message: 'dollar created successfully',
		})
	} catch (err) {
		next(err)
	}
})
routes.get('/', async (req: Request, res: Response, next) => {
	try {
		const dollar = await dol.getDol(req.body)
		res.json({
			status: 'success',
			data: {...dollar},
			message: 'dollar created successfully',
		})
	} catch (err) {
		next(err)
	}
})

routes.patch('/:id', async (req: Request, res: Response, next) => {
	try {
		const dollar = await dol.updateDol(req.body)
		res.json({
			status: 'success',
			data: dollar,
			message: 'dollar updated successfully',
		})
	} catch (err) {
		next(err)
	}
})
export default routes
