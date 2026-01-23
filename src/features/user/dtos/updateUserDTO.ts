import { Router } from 'express'
import { UserController } from '../../user/controllers/userControllers.js'
import { authMiddleware } from '../../../shared/middleware/jwtMiddleware.js'

const router = Router()
const controller = new UserController()

router.put('/admin/:id', authMiddleware, controller.update)
router.put('/profissional/:id', authMiddleware, controller.update)
router.put('/gestor/:id', authMiddleware, controller.update)
router.put('/cliente/:id', authMiddleware, controller.update)

export default router
