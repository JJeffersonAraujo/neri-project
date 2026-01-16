/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Cadastro e informações do usuário
 */

import {
  JsonController,
  Get,
  Post,
  Body,
  CurrentUser,
  UseBefore,
} from 'routing-controllers';

import { UserService } from '../services/userService';
import { EnsureAuthMiddleware } from '../../../shared/middleware/EnsureAuthMiddleware';

@JsonController('/users')
export class UserController {
  private userService = new UserService();

  /**
   * @swagger
   * /users:
   *   post:
   *     summary: Criação de usuário
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 example: user@email.com
   *               password:
   *                 type: string
   *                 example: 123456
   *     responses:
   *       201:
   *         description: Usuário criado com sucesso
   *       400:
   *         description: Erro de validação
   */
  @Post()
  async create(@Body() body: any) {
    const user = await this.userService.createUser(body);
    return user;
  }

  /**
   * @swagger
   * /users/me:
   *   get:
   *     summary: Retorna os dados do usuário autenticado
   *     tags: [Users]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Dados do usuário
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 userId:
   *                   type: number
   *                   example: 1
   *                 email:
   *                   type: string
   *                   example: user@email.com
   *       401:
   *         description: Não autorizado
   */
  @Get('/me')
  @UseBefore(EnsureAuthMiddleware)
  async profile(@CurrentUser() user: any) {
    return {
      userId: user.id,
      email: user.email,
    };
  }
}
