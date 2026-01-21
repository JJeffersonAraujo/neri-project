import { Router } from 'express'
import { profissionalSaudeController} from '../../user/controllers/userControllers'
import { authMiddleware } from '../../auth/middleware/jwtMiddleware'

const router = Router()
const controller = new profissionalSaudeController()
router.post('/', controller.create)
router.get('/', authMiddleware, controller.findAll)
router.get('/:id', authMiddleware, controller.findById)
router.put('/:id', authMiddleware, controller.update)
router.delete('/:id', authMiddleware, controller.delete)

export { router as profissionalRoutes }