import { Router } from 'express'
import { ClienteController } from '../controller/cliente.controller.js'
import { authMiddleware } from '../../../features/auth/middleware/jwtMiddleware.js'
import { validateDto } from '../../../shared/middleware/validateDto.middleware.js'
import { createClienteSchema } from '../dtos/cliente.dtos.js'

import { devAuthMiddleware } from '../../../shared/middleware/devAuth.middleware.js'

const router = Router()
const controller = new ClienteController()

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Criar Clientes
 *     tags:
 *       - [Clientes]
 *     security:
 *       - bearerAuth: []
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

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Listar clientes
 *     tags:
 *       - [Clientes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de clientes
 *       401:
 *        description: Não autorizado
 *       400:
 *        description: Erro de validação
 *       404:
 *        description: Cliente não encontrado
 */
router.get('/', devAuthMiddleware, controller.findAll)
/*router.get('/', authMiddleware, controller.findAll)*/


router.get('/:id', devAuthMiddleware, controller.findById)
/*router.get('/:id', authMiddleware, controller.findById)*/


router.put('/:id', devAuthMiddleware, controller.update)
/*router.put('/:id', authMiddleware, controller.update)*/


router.delete('/:id', devAuthMiddleware, controller.delete)
/*router.delete('/:id', authMiddleware, controller.delete)*/

export { router as clienteRoutes }