import { Router } from 'express'
import { authMiddleware } from '../../../features/auth/middleware/jwtMiddleware'

const router = Router()

const adminRoutes = Router()
const profissionalRoutes = Router()
const gestorRoutes = Router()
const clienteRoutes = Router()

router.use('/admins', authMiddleware, adminRoutes)
router.use('/profissionais', authMiddleware, profissionalRoutes)
router.use('/gestores', authMiddleware, gestorRoutes)
router.use('/clientes', authMiddleware, clienteRoutes)
export { router as userRoutes }

