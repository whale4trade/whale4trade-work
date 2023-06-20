import {Router} from 'express'
import usersRoutes from './api/users.routes'
import bundleRoutes from './api/bundle.routes'
import orderRoutes from './api/orders.routes'
import transactionRoutes from './api/transaction.routs'
import treeRoutes from './api/tree.routes'
import dol from './api/dol.routes'
import req from './api/request.routes'
import phones from './api/phones.routes'

const routes = Router()
routes.use('/users', usersRoutes)
routes.use('/bundle', bundleRoutes)
routes.use('/order', orderRoutes)
routes.use('/transaction', transactionRoutes)
routes.use('/tree', treeRoutes)
routes.use('/dol', dol)
routes.use('/req', req)
routes.use('/phones', phones)
export default routes
