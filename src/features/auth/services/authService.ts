import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { LoginDTO } from '../dtos/loginDTO';
import { UserRepository } from '../../user/repositories/userRepository';
import { jwtConfig } from '../../../config/jwt';

export class AuthService {
  private userRepository = new UserRepository();

  async login(data: LoginDTO) {
    const user = await this.userRepository.findByEmail(data.email);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!passwordMatch) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign(
      { userId: user.id },
      jwtConfig.secret as jwt.Secret,
      {
        expiresIn: jwtConfig.expiresIn as jwt.SignOptions['expiresIn'],
      }
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
