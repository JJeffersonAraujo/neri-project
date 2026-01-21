import { Router } from 'express'
import { AdminController } from '../../user/controllers/userControllers'
import { authMiddleware } from '../../../features/auth/middleware/jwtMiddleware'
import { validateDto } from '../../../shared/middleware/validateDto.middleware'
import { createAdminSchema } from '../dtos/admin.dtos'

const router = Router()
const controller = new AdminController()

router.post(
  '/',
  validateDto(createAdminSchema), // 👈 ZOD AQUI
  controller.create
)

router.get('/', authMiddleware, controller.findAll)
router.get('/:id', authMiddleware, controller.findById)
router.put('/:id', authMiddleware, controller.update)
router.delete('/:id', authMiddleware, controller.delete)

export { router as adminRoutes }
