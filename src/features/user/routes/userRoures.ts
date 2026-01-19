import { Router } from 'express'
import { UserController } from '../../user/controllers/userControllers.js'

const userRoutes = Router()
const controller = new UserController()

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Criar um novo usuário
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [ADMIN, GESTOR, PROFISSIONAL, USER]
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
userRoutes.post('/users', controller.create)

export { userRoutes }
