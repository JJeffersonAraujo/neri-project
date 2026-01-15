import jwt from 'jsonwebtoken';
import { UnauthorizedError } from 'routing-controllers';

import { jwtConfig } from '../../../config/jwt';
import { UserRepository } from '../../user/repositories/userRepository';

interface RefreshPayload {
  sub: string;
}

export class RefreshService {
  private userRepository = new UserRepository();

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedError('Refresh token missing');
    }

    let payload: RefreshPayload;

    try {
      payload = jwt.verify(
        refreshToken,
        jwtConfig.refresh.secret
      ) as RefreshPayload;
    } catch {
      throw new UnauthorizedError('Invalid refresh token');
    }

    const user = await this.userRepository.findById(payload.sub);

    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    const newAccessToken = jwt.sign(
      { sub: user.id },
      jwtConfig.access.secret,
      jwtConfig.access.options
    );

    return {
      accessToken: newAccessToken,
    };
  }
}
