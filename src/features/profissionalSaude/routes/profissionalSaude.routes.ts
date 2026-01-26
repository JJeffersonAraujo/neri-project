import { Router } from 'express'
import { profissionalController } from '../controller/profissionalSaude.controller.js'
import { authMiddleware } from '../../../features/auth/middleware/jwtMiddleware.js'
import { authorize } from '@/shared/middleware/authorize.middleware.js'
import { validateDto } from '../../../shared/middleware/validateDto.middleware.js'
import { createProfissionalSaudeSchema } from '../dtos/profissionalSaude.dtos.js'

const router = Router()
const controller = new profissionalController()

/**
 * @swagger
 * /profsaude:
 *   post:
 *     summary: Criar Prof-Saúde
 *     tags:
 *       - [Prof-Saúde]
 *   security:
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
  '/',authMiddleware,authorize('PROFISSIONAL', 'ADMIN'),
  validateDto(createProfissionalSaudeSchema),
  controller.create
)

/**
 * @swagger
 * /profsaude:
 *   get:
 *     summary: Listar profissionais de saúde
 *     tags:
 *       - [Prof-Saúde]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de profissionais de saúde
 *       401:
 *        description: Não autorizado
 *       400:
 *        description: Erro de validação
 *       404:
 *        description: Profissional de saúde não encontrado
 */
router.get('/', authMiddleware, authorize('PROFISSIONAL', 'ADMIN'), controller.findAll)

/**
 * @swagger
 * /profSaude/{id}:
 *   get:
 *     summary: Buscar profissional de saúde por ID
 *     tags:
 *       - [Prof-Saúde]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Profissional de saúde encontrado
 *       404:
 *        description: Profissional de saúde não encontrado
 */
router.get('/:id', authMiddleware, authorize('PROFISSIONAL', 'ADMIN'), controller.findById)

/**
 * @swagger
 * /profsaude/{id}:
 *   put:
 *     summary: Atualizar profissional de saúde
 *     tags:
 *       - [Prof-Saúde]
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
 *         description: Profissional de saúde atualizado
 *       404:
 *         description: Profissional de saúde não encontrado
 */
router.put('/:id', authMiddleware, authorize('PROFISSIONAL', 'ADMIN'), controller.update)

/**
 * @swagger
 * /profsaude/{id}:
 *   delete:
 *     summary: Remover profissional de saúde
 *     tags:
 *       - [Prof-Saúde]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Profissional de saúde removido
 *       404:
 *         description: Profissional de saúde não encontrado
 */
router.delete('/:id', authMiddleware, authorize('ADMIN'), controller.delete)

export { router as profissionalRoutes }