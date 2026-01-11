import { Router } from 'express'
import { AdminController, profissionalSaudeController, gestorController, clienteController } from '../../user/controllers/userControllers'
import { authMiddleware } from '../../../features/auth/middleware/jwtMiddleware'

const router = Router()
const controller = new AdminController()
const controllerProfissional = new profissionalSaudeController()
const controllerGestor = new gestorController()
const controllerCliente = new clienteController()

router.delete('/admin/:id', authMiddleware, controller.delete)
router.delete('/profissional/:id', authMiddleware, controllerProfissional.delete)
router.delete('/gestor/:id', authMiddleware, controllerGestor.delete)
router.delete('/cliente/:id', authMiddleware, controllerCliente.delete)