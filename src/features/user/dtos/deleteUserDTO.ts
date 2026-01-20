import { Router } from 'express'
import { UserController } from '../../user/controllers/userControllers.js'
import { authMiddleware } from '../../../features/auth/middleware/jwtMiddleware.js'

const router = Router()
const controller = new UserController()

// Deletar usuário por ID
router.delete('/:id', authMiddleware, controller.delete)

export { router as deleteUserRoutes }
