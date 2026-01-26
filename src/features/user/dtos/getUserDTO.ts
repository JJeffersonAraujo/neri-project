import { Router } from 'express'
import { AdminController, profissionalSaudeController, gestorController, clienteController } from '../../user/controllers/userControllers.js'
import { authMiddleware } from '../../../features/auth/middleware/jwtMiddleware'

const router = Router()
const controller = new AdminController()
const controllerProfissional = new profissionalSaudeController()
const controllerGestor = new gestorController()
const controllerCliente = new clienteController()

router.get('/admin', authMiddleware, controller.findAll)
router.get('/profissional', authMiddleware, controllerProfissional.findAll)
router.get('/gestor', authMiddleware, controllerGestor.findAll)
router.get('/cliente', authMiddleware, controllerCliente.findAll)

router.get('/admin/:id', authMiddleware, controller.findById)
router.get('/profissional/:id', authMiddleware, controllerProfissional.findById)
router.get('/gestor/:id', authMiddleware, controllerGestor.findById)
router.get('/cliente/:id', authMiddleware, controllerCliente.findById)