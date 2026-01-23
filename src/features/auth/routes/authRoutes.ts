import { Router } from 'express'
import { AuthController } from '../../auth/controllers/authController.js'
import { PasswordResetController } from '../../auth/controllers/passwordResetController.js'

const authRoutes = Router()
const authController = new AuthController()
const passwordResetController = new PasswordResetController()

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticação e recuperação de senha
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@email.com
 *               senha:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
authRoutes.post('/login', (req, res) => authController.login(req, res))

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Solicitar recuperação de senha
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@email.com
 *     responses:
 *       200:
 *         description: Email de recuperação enviado
 *       404:
 *         description: Usuário não encontrado
 */
authRoutes.post(
  '/forgot-password',
  (req, res) => passwordResetController.forgotPassword(req, res)
)

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Resetar senha do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - senha
 *             properties:
 *               token:
 *                 type: string
 *                 example: 7a9c1c1a-xxxx-xxxx
 *               senha:
 *                 type: string
 *                 example: novaSenha123
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 *       400:
 *         description: Token inválido ou expirado
 */
authRoutes.post(
  '/reset-password',
  (req, res) => passwordResetController.resetPassword(req, res)
)

export default authRoutes
