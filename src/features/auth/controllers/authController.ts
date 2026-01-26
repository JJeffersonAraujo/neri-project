import {
  Body,
  Controller,
  Post,
  Route,
  SuccessResponse,
  Response,
  Example,
  Tags,
} from 'tsoa'

import { AuthService } from '../services/authService'
import type { LoginDTO } from '../dtos/loginDTO'

interface AuthResponse {
  token: string
  refreshToken: string
  user: {
    id: number
    nome: string
    email: string
    role: string
  }
}

interface ErrorResponse {
  message: string
}

@Route('auth')
@Tags('Autenticação')
export class AuthController extends Controller {
  private authService = new AuthService()

  @SuccessResponse('200', 'Login realizado com sucesso')
  @Response<ErrorResponse>('401', 'Credenciais inválidas')
  @Post('login')
  @Example<AuthResponse>({
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    user: {
      id: 1,
      nome: 'Jefferson',
      email: 'admin@email.com',
      role: 'ADMIN',
    },
  })
  public async login(
    @Body() body: LoginDTO
  ): Promise<AuthResponse> {
    try {
      const result = await this.authService.login({
        email: body.email,
        senha: body.senha,
      })

      this.setStatus(200)
      return result
    } catch {
      this.setStatus(401)
      return {
        message: 'Credenciais inválidas',
      } as any
    }
  }
}
