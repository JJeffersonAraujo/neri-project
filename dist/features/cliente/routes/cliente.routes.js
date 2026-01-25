import { Router } from 'express';
import { ClienteController } from '../controller/cliente.controller.js';
import { authMiddleware } from '../../../features/auth/middleware/jwtMiddleware.js';
import { validateDto } from '../../../shared/middleware/validateDto.middleware.js';
import { createClienteSchema } from '../dtos/cliente.dtos.js';
const router = Router();
const controller = new ClienteController();
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
router.post('/', validateDto(createClienteSchema), controller.create);
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
router.get('/', authMiddleware, controller.findAll);
/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Buscar cliente por ID
 *     tags:
 *       - [Clientes]
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
 *         description: Cliente encontrado
 *       404:
 *        description: Cliente não encontrado
 */
router.get('/:id', authMiddleware, controller.findById);
/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Atualizar cliente
 *     tags:
 *       - [Clientes]
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
 *         description: Cliente atualizado
 *       404:
 *         description: Cliente não encontrado
 */
router.put('/:id', authMiddleware, controller.update);
/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Remover cliente
 *     tags:
 *       - [Clientes]
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
 *         description: Cliente removido
 *       404:
 *         description: Cliente não encontrado
 */
router.delete('/:id', authMiddleware, controller.delete);
export { router as clienteRoutes };
