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

  @Post()
  async create(@Body() body: any) {
    const user = await this.userService.createUser(body);
    return user;
  }

  @Get('/me')
  @UseBefore(EnsureAuthMiddleware)
  async profile(@CurrentUser() user: any) {
    return {
      userId: user.id,
      email: user.email,
    };
  }
}
