import { Router } from 'express'
import { AdminController } from '../controllers/admin.controllers.js'
import { authMiddleware } from '../../../features/auth/middleware/jwtMiddleware.js'
import { validateDto } from '../../../shared/middleware/validateDto.middleware.js'
import { createAdminSchema } from '../dtos/admin.dtos.js'

import { devAuthMiddleware } from '../../../shared/middleware/devAuth.middleware.js'


const router = Router()
const controller = new AdminController()

/**
 * @swagger
 * /admins:
 *   post:
 *     summary: Criar administrador
 *     tags:
 *       - [Administrador]
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
 *                 example: João Silva
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@email.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Administrador criado com sucesso
 *       400:
 *         description: Erro de validação
 */
router.post(
  '/',
  validateDto(createAdminSchema),
  controller.create
)

/**
 * @swagger
 * /admins:
 *   get:
 *     summary: Listar administradores
 *     tags:
 *       - [Administrador]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de administradores
 *       401:
 *        description: Não autorizado
 *       400:
 *        description: Erro de validação
 *       404:
 *        description: Administrador não encontrado
 */
router.get('/', devAuthMiddleware, controller.findAll)
/*router.get('/', authMiddleware, controller.findAll)*/

/**
 * @swagger
 * /api/admins/{id}:
 *   get:
 *     summary: Buscar administrador por ID
 *     tags:
 *       - [Administrador]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Administrador encontrado
 *       404:
 *        description: Administrador não encontrado
 */
router.get('/:id', devAuthMiddleware, controller.findById)

router.get('/:id', devAuthMiddleware, controller.findById)
/*router.get('/:id', authMiddleware, controller.findById)*/


router.put('/:id', devAuthMiddleware, controller.update)
/*router.put('/:id', authMiddleware, controller.update)*/


router.delete('/:id', devAuthMiddleware, controller.delete)
/*router.delete('/:id', authMiddleware, controller.delete)*/

export { router as adminRoutes }