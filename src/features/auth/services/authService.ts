import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
} from 'routing-controllers';

import { LoginDTO } from '../dtos/loginDTO';
import { UserRepository } from '../../user/repositories/userRepository';
import { jwtConfig } from '../../../config/jwt';

const MAX_ATTEMPTS = 5;
const LOCK_MINUTES = 15;

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

    // 🔒 Verifica se está bloqueado
    if (user.lockedUntil && user.lockedUntil > new Date()) {
      throw new ForbiddenError(
        `Account locked. Try again later.`
      );
    }

    const passwordMatch = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!passwordMatch) {
      const attempts = user.loginAttempts + 1;

      await this.userRepository.incrementLoginAttempts(user.id);

      // 🔐 Bloqueia após 5 tentativas
      if (attempts >= MAX_ATTEMPTS) {
        await this.userRepository.lockUser(user.id, LOCK_MINUTES);
        throw new ForbiddenError(
          `Account locked after ${MAX_ATTEMPTS} failed attempts`
        );
      }

      throw new UnauthorizedError('Invalid email or password');
    }

    // ✅ Login correto → limpa tentativas
    await this.userRepository.resetLoginAttempts(user.id);

    const token = jwt.sign(
      { sub: user.id },
      jwtConfig.secret,
      jwtConfig.signOptions
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
