import { Router } from 'express'
import { profissionalSaudeController } from '../controller/profissionalSaude.controller.js'
import { authMiddleware } from '../../../features/auth/middleware/jwtMiddleware.js'
import { validateDto } from '../../../shared/middleware/validateDto.middleware.js'
import { createProfissionalSaudeSchema } from '../dtos/profissionalSaude.dtos.js'

const router = Router()
const controller = new profissionalSaudeController()

/**
 * @openapi
 * /profsaude:
 *   post:
 *     summary: Criar Prof-Saúde
 *     tags:
 *       - Prof-Saúde
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
 *                 example: Ana Silva
 *               email:
 *                 type: string
 *                 format: email
 *                 example: prof-saude@email.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Prof-Saúde criado com sucesso
 *       400:
 *         description: Erro de validação
 */

router.post(
  '/',
  validateDto(createProfissionalSaudeSchema),
  controller.create
)

router.get('/', authMiddleware, controller.findAll)
router.get('/:id', authMiddleware, controller.findById)
router.put('/:id', authMiddleware, controller.update)
router.delete('/:id', authMiddleware, controller.delete)

export { router as profissionalSaudeRoutes }