/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticação e autorização
 */

import { JsonController, Post, Body } from 'routing-controllers';
import { AuthService } from '../services/authService';
import { RefreshService } from '../services/refreshService';

@JsonController('/auth')
export class AuthController {
  private authService = new AuthService();
  private refreshService = new RefreshService();

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
   *             properties:
   *               email:
   *                 type: string
   *                 example: user@email.com
   *               password:
   *                 type: string
   *                 example: 123456
   *     responses:
   *       200:
   *         description: Login realizado com sucesso
   *       401:
   *         description: Credenciais inválidas
   */
  @Post('/login')
  login(@Body() body: any) {
    return this.authService.login(body);
  }

  /**
   * @swagger
   * /auth/refresh:
   *   post:
   *     summary: Gera novo access token
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               refreshToken:
   *                 type: string
   *     responses:
   *       200:
   *         description: Token renovado
   *       401:
   *         description: Refresh token inválido
   */
  @Post('/refresh')
  refresh(@Body() body: { refreshToken: string }) {
    return this.refreshService.refresh(body.refreshToken);
  }
}
