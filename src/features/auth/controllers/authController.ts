import { JsonController, Post, Body, HttpCode } from 'routing-controllers';
import { AuthService } from '../services/authService';
import { LoginDTO } from '../dtos/loginDTO';

@JsonController('/auth')
export class AuthController {
  private authService = new AuthService();

  @Post('/login')
  @HttpCode(200)
  async login(@Body() body: LoginDTO) {
    return this.authService.login(body);
  }
}
