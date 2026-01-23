import { Router } from 'express';
import { gestorController } from '../controller/gestor.controller.js';
import { authMiddleware } from '../../../features/auth/middleware/jwtMiddleware.js';
import { validateDto } from '../../../shared/middleware/validateDto.middleware.js';
import { createGestorSchema } from '../dtos/gestor.dtos.js';
const router = Router();
const controller = new gestorController();
/**
 * @openapi
 * /gestores:
 *   post:
 *     summary: Criar Gestores
 *     tags:
 *       - Gestores
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
router.post('/', validateDto(createGestorSchema), controller.create);
router.get('/', authMiddleware, controller.findAll);
router.get('/:id', authMiddleware, controller.findById);
router.put('/:id', authMiddleware, controller.update);
router.delete('/:id', authMiddleware, controller.delete);
export { router as gestorRoutes };
