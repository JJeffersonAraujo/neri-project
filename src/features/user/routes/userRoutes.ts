// src/features/user/routes/userRoutes.ts
import { Router } from 'express'
import { UserController } from '../../user/controllers/userControllers.js'
import { authMiddleware } from '../../../shared/middleware/jwtMiddleware.js'

const userRoutes = Router()
const controller = new UserController()

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Rotas de gerenciamento de usuários
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Criar um novo usuário
 *     tags: [Users]
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
userRoutes.post('/users', (req, res) => controller.create(req, res))

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Listar todos os usuários
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
userRoutes.get('/users', authMiddleware, (req, res) => controller.findAll(req, res))

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Buscar usuário por ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */
userRoutes.get('/users/:id', authMiddleware, (req, res) => controller.findById(req, res))

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualizar um usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
 *       200:
 *         description: Usuário atualizado
 */
userRoutes.put('/users/:id', authMiddleware, (req, res) => controller.update(req, res))

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deletar um usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Usuário deletado
 */
userRoutes.delete('/users/:id', authMiddleware, (req, res) => controller.delete(req, res))

export { userRoutes }
