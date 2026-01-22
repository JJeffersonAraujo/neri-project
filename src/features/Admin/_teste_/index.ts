import { Router } from 'express'
import { adminRoutes } from '../routes/admin.routes.js'

const routes = Router()

routes.use('/admins', adminRoutes)

export { routes }
