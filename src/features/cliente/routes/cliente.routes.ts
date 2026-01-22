import { Router } from 'express'
import { ClienteController } from '../controller/cliente.controller.js'
import { authMiddleware } from '../../../features/auth/middleware/jwtMiddleware.js'
import { validateDto } from '../../../shared/middleware/validateDto.middleware.js'
import { createClienteSchema } from '../dtos/cliente.dtos.js'

const router = Router()
const controller = new ClienteController()

router.post(
  '/',
  validateDto(createClienteSchema),
  controller.create
)

router.get('/', authMiddleware, controller.findAll)
router.get('/:id', authMiddleware, controller.findById)
router.put('/:id', authMiddleware, controller.update)
router.delete('/:id', authMiddleware, controller.delete)

export { router as clienteRoutes }
