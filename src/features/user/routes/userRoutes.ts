import { Router } from 'express'
import { UserController } from '../../user/controllers/userControllers.js'
import { authMiddleware } from '../../../shared/middleware/jwtMiddleware.js'

const userRoutes = Router()
const userController = new UserController()

userRoutes.post('/', (req, res) =>
  userController.create(req, res)
)

userRoutes.get('/', authMiddleware, (req, res) =>
  userController.findAll(req, res)
)

userRoutes.get('/me', authMiddleware, (req, res) =>
  userController.me(req, res)
)

userRoutes.get('/:id', authMiddleware, (req, res) =>
  userController.findById(req, res)
)

userRoutes.put('/:id', authMiddleware, (req, res) =>
  userController.update(req, res)
)

userRoutes.delete('/:id', authMiddleware, (req, res) =>
  userController.delete(req, res)
)

export { userRoutes }
