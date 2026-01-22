// src/features/jornada/routes/jornadaRoutes.ts
import { Router } from 'express';
import { JornadaController } from '../controllers/jornadaController.js';
import { authMiddleware } from '../../../shared/middleware/jwtMiddleware.js';
const jornadaRoutes = Router();
const jornadaController = new JornadaController();
/**
 * @swagger
 * tags:
 *   name: Jornadas
 *   description: Rotas de gerenciamento de jornadas
 */
// Registrar execução de jornada
/**
 * @swagger
 * /jornada:
 *   post:
 *     summary: Registrar uma nova execução de jornada
 *     tags: [Jornadas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               escalaId:
 *                 type: number
 *               inicioExecutado:
 *                 type: string
 *                 format: date-time
 *               fimExecutado:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Jornada registrada com sucesso
 *       400:
 *         description: Dados obrigatórios não informados
 */
jornadaRoutes.post('/', authMiddleware, (req, res) => jornadaController.registrar(req, res));
// Listar todas as jornadas
/**
 * @swagger
 * /jornada:
 *   get:
 *     summary: Listar todas as jornadas
 *     tags: [Jornadas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de jornadas
 */
jornadaRoutes.get('/', authMiddleware, (req, res) => jornadaController.listarTodas(req, res));
// Buscar jornada por ID
/**
 * @swagger
 * /jornada/{id}:
 *   get:
 *     summary: Buscar jornada por ID
 *     tags: [Jornadas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID da jornada
 *     responses:
 *       200:
 *         description: Jornada encontrada
 *       404:
 *         description: Jornada não encontrada
 */
jornadaRoutes.get('/:id', authMiddleware, (req, res) => jornadaController.buscarPorId(req, res));
// Atualizar jornada
/**
 * @swagger
 * /jornada/{id}:
 *   put:
 *     summary: Atualizar uma jornada
 *     tags: [Jornadas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID da jornada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               inicioExecutado:
 *                 type: string
 *                 format: date-time
 *               fimExecutado:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Jornada atualizada
 *       400:
 *         description: Erro na atualização
 */
jornadaRoutes.put('/:id', authMiddleware, (req, res) => jornadaController.atualizar(req, res));
// Deletar jornada
/**
 * @swagger
 * /jornada/{id}:
 *   delete:
 *     summary: Deletar uma jornada
 *     tags: [Jornadas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID da jornada
 *     responses:
 *       204:
 *         description: Jornada deletada
 */
jornadaRoutes.delete('/:id', authMiddleware, (req, res) => jornadaController.deletar(req, res));
export { jornadaRoutes };
