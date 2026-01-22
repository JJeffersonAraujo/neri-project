import { Router } from 'express'
/*import { authRoutes } from './features/auth/routes/authRoutes'*/
import { adminRoutes } from '../../Admin/routes/admin.routes.js'
import { clienteRoutes } from '../../cliente/routes/cliente.routes.js'
import { gestorRoutes } from '../../gestor/routes/gestor.routes.js'
import { profissionalSaudeRoutes } from '../../profissionalSaude/routes/profissionalSaude.routes.js'

const routes = Router()

/*routes.use('/auth', authRoutes)*/
routes.use('/admins', adminRoutes)
routes.use('/cliente', clienteRoutes)
routes.use('/gestor', gestorRoutes)
routes.use('/profissionalSaude', profissionalSaudeRoutes)

export { routes }


/*import { Router } from 'express'
import { UserController } from '../controllers/userControllers.js'
import { authMiddleware } from '../../../shared/middleware/authMiddlewares.js'

const router = Router()
const controller = new UserController()

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Usuários
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Criar usuário
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - senha
 *               - role
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Jefferson
 *               email:
 *                 type: string
 *                 example: admin@email.com
 *               senha:
 *                 type: string
 *                 example: 123456
 *               role:
 *                 type: string
 *                 enum: [ADMIN, GESTOR, PROFISSIONAL, USER]
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
//router.post('/users', controller.create.bind(controller))

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Listar usuários
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
//router.get('/users', authMiddleware, controller.findAll.bind(controller))

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
//router.get('/users/:id', authMiddleware, controller.findById.bind(controller))

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualizar usuário
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
//router.put('/users/:id', authMiddleware, controller.update.bind(controller))

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remover usuário (soft delete)
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
 *         description: Usuário removido
 */
//router.delete('/users/:id', authMiddleware, controller.delete.bind(controller))

//export { router as userRoutes }*/