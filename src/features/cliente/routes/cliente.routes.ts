import { Router } from 'express'
import { ClienteController } from '../controller/cliente.controller.js'
import { authMiddleware } from '../../../features/auth/middleware/jwtMiddleware.js'
import { validateDto } from '../../../shared/middleware/validateDto.middleware.js'
import { createClienteSchema } from '../dtos/cliente.dtos.js'

const router = Router()
const controller = new ClienteController()

/**
 * @openapi
 * /clientes:
 *   post:
 *     summary: Criar Clientes
 *     tags:
 *       - Clientes
 *   
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 example: Pedro Souza
 *               email:
 *                 type: string
 *                 format: email
 *                 example: cliente@email.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *       400:
 *         description: Erro de validação
 */
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