import { JsonController, Post, Body } from 'routing-controllers';
import { AuthService } from '../services/authService';
import { RefreshService } from '../services/refreshService';

@JsonController('/auth')
export class AuthController {
  private authService = new AuthService();
  private refreshService = new RefreshService();

  @Post('/login')
  login(@Body() body: any) {
    return this.authService.login(body);
  }

  @Post('/refresh')
  refresh(@Body() body: { refreshToken: string }) {
    return this.refreshService.refresh(body.refreshToken);
  }
}
