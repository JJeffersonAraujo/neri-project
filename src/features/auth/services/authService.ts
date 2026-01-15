import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UnauthorizedError, BadRequestError } from 'routing-controllers';

import { LoginDTO } from '../dtos/loginDTO';
import { UserRepository } from '../../user/repositories/userRepository';
import { jwtConfig } from '../../../config/jwt';

export class AuthService {
  private userRepository = new UserRepository();

  async login(data: LoginDTO) {
    const email = data.email?.trim().toLowerCase();

    if (!email || !data.password) {
      throw new BadRequestError('Email and password are required');
    }

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!passwordMatch) {
      throw new UnauthorizedError('Invalid email or password');
    }

    const accessToken = jwt.sign(
      { sub: user.id },
      jwtConfig.access.secret,
      jwtConfig.access.options // ✅ NOME CORRETO
    );

    return {
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
