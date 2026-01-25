import { Body, Controller, Post, Route, SuccessResponse, Response, Example } from "tsoa";
import { AuthService } from "../services/authService.js";
import type { LoginDTO } from "../dtos/loginDTO.js";
import { Tags } from 'tsoa';

interface AuthResponse {
  token: string;
  refreshToken: string;
  user: {
    id: number;
    nome: string;
    email: string;
    role: string;
  };
}

@Tags("Autenticação")
@Route("auth")
export class AuthController extends Controller {
  private authService = new AuthService();

  @SuccessResponse("200", "Login realizado com sucesso")
  @Response<Error>("401", "Credenciais inválidas")
  @Post("login")
  @Example<AuthResponse>({
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    user: {
      id: 1,
      nome: "Jefferson",
      email: "admin@email.com",
      role: "ADMIN"
    }
  })
  public async login(@Body() body: LoginDTO): Promise<AuthResponse> {
    return this.authService.login({
      email: body.email,
      password: body.senha
    });
  }
}
