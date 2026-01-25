import { Router } from 'express'
import { gestorController } from '../controller/gestor.controller.js'
import { authMiddleware } from '../../../features/auth/middleware/jwtMiddleware.js'
import { authorize } from '@/shared/middleware/authorize.middleware.js'
import { validateDto } from '../../../shared/middleware/validateDto.middleware.js'
import { createGestorSchema } from '../dtos/gestor.dtos.js'

const router = Router()
const controller = new gestorController()

/**
 * @swagger
 * /gestores:
 *   post:
 *     summary: Criar Gestores
 *     tags:
 *       - [Gestores]
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
 *                 example: Maria Silva
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
 *         description: Gestor criado com sucesso
 *       400:
 *         description: Erro de validação
 */
router.post(
  '/',authMiddleware,authorize('GESTOR', 'ADMIN'),
  validateDto(createGestorSchema),
  controller.create
)

/**
 * @swagger
 * /gestores:
 *   get:
 *     summary: Listar gestores
 *     tags:
 *       - [Gestores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de gestores
 *       401:
 *        description: Não autorizado
 *       400:
 *        description: Erro de validação
 *       404:
 *        description: Gestor não encontrado
 */
router.get('/', authMiddleware, authorize('GESTOR', 'ADMIN'), controller.findAll)

/**
 * @swagger
 * /gestores/{id}:
 *   get:
 *     summary: Buscar gestor por ID
 *     tags:
 *       - [Gestores]
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
 *         description: Gestor encontrado
 *       404:
 *        description: Gestor não encontrado
 */
router.get('/:id', authMiddleware, authorize('GESTOR', 'ADMIN'), controller.findById)

/**
 * @swagger
 * /gestores/{id}:
 *   put:
 *     summary: Atualizar gestor
 *     tags:
 *       - [Gestores]
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
 *         description: Gestor atualizado
 *       404:
 *         description: Gestor não encontrado
 */
router.put('/:id', authMiddleware, authorize('GESTOR', 'ADMIN'), controller.update)

/**
 * @swagger
 * /gestores/{id}:
 *   delete:
 *     summary: Remover gestor
 *     tags:
 *       - [Gestores]
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
 *         description: Gestor removido
 *       404:
 *         description: Gestor não encontrado
 */
router.delete('/:id', authMiddleware, authorize('ADMIN'), controller.delete)

export { router as gestorRoutes }