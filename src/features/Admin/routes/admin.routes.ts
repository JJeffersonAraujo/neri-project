import { Router } from 'express'
import { AdminController } from '../controllers/admin.controllers.js'
import { authMiddleware } from '../../../features/auth/middleware/jwtMiddleware.js'
import { validateDto } from '../../../shared/middleware/validateDto.middleware.js'
import { createAdminSchema } from '../dtos/admin.dtos.js'

const router = Router()
const controller = new AdminController()

/**
 * @openapi
 * /admins:
 *   post:
 *     summary: Criar administrador
 *     tags:
 *       - Administrador
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

router.get('/', authMiddleware, controller.findAll)
router.get('/:id', authMiddleware, controller.findById)
router.put('/:id', authMiddleware, controller.update)
router.delete('/:id', authMiddleware, controller.delete)

export { router as adminRoutes }
