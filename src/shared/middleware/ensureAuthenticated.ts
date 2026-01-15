import { ExpressMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { jwtConfig } from '../../config/jwt';
import { UserRepository } from '../../features/user/repositories/userRepository';

interface JwtPayload {
  sub: string;
}

export class EnsureAuthMiddleware
  implements ExpressMiddlewareInterface
{
  async use(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Token missing' });
    }

    const [, token] = authHeader.split(' ');

    try {
      const decoded = jwt.verify(
        token,
        jwtConfig.access.secret // ✅ AQUI ESTAVA O BUG
      ) as JwtPayload;

      const userRepository = new UserRepository();
      const user = await userRepository.findById(decoded.sub);

      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      (req as any).user = user;

      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}
