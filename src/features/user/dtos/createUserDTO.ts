import { Router } from 'express'
import { AdminController, profissionalSaudeController, gestorController, clienteController } from '../../user/controllers/userControllers'
import { authMiddleware } from '../../../features/auth/middleware/jwtMiddleware'

const router = Router()
const controller = new AdminController()
const controllerProfissional = new profissionalSaudeController()
const controllerGestor = new gestorController()
const controllerCliente = new clienteController()

router.put('/admin/:id', authMiddleware, controller.create)
router.put('/profissional/:id', authMiddleware, controllerProfissional.create)
router.put('/gestor/:id', authMiddleware, controllerGestor.create)
router.put('/cliente/:id', authMiddleware, controllerCliente.create)