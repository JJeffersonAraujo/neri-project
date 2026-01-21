import { Router } from 'express'
import { clienteController } from '../controller/cliente.controller'
import { authMiddleware } from '../../../features/auth/middleware/jwtMiddleware'
import { validateDto } from '../../../shared/middleware/validateDto.middleware'
import { createClienteSchema } from '../dtos/cliente.dtos'

const router = Router()
const controller = new clienteController()

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
