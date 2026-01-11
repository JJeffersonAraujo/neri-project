import { Router } from 'express'
import { authMiddleware } from '../../../features/auth/middleware/jwtMiddleware'

const router = Router()

// Crie as sub-rotas
const adminRoutes = Router()
const profissionalRoutes = Router()
const gestorRoutes = Router()
const clienteRoutes = Router()

// Adicione seus endpoints nas sub-rotas
// Exemplo:
// adminRoutes.post('/', AdminController.create)
// adminRoutes.get('/', AdminController.getAll)

router.use('/admins', authMiddleware, adminRoutes)
router.use('/profissionais', authMiddleware, profissionalRoutes)
router.use('/gestores', authMiddleware, gestorRoutes)
router.use('/clientes', clienteRoutes) // sem auth se for cadastro público
export { router as userRoutes }


