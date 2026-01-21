import { Router } from 'express'
import { gestorController} from '../../user/controllers/userControllers'
import { authMiddleware } from '../../../features/auth/middleware/jwtMiddleware'

const router = Router()
const controller = new gestorController()
router.post('/', controller.create)
router.get('/', authMiddleware, controller.findAll)
router.get('/:id', authMiddleware, controller.findById)
router.put('/:id', authMiddleware, controller.update)
router.delete('/:id', authMiddleware, controller.delete)

export { router as gestorRoutes }