import { Request, Response } from 'express'
import { AuthService } from '../services/authService.js'
import {
  ApiBody,
  ApiResponse,
  ApiTag,
} from '../../../shared/decorators/swagger/index.js'
import { loginSchema } from '../dtos/loginDTO.js'

@ApiTag('Auth')
export class AuthController {
  private authService = new AuthService()

  @ApiBody(loginSchema)
  @ApiResponse(200, 'Login realizado com sucesso')
  @ApiResponse(401, 'Credenciais inválidas')
  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body

      const result = await this.authService.login({
        email,
        senha,
      })

      return res.status(200).json(result)
    } catch (error: any) {
      return res.status(401).json({ message: error.message })
    }
  }
}
