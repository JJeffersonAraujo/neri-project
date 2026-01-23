import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../../../../src/config/jwt.js';
import { Role } from '@prisma/client';

interface TokenPayload {
  sub: number;
  role: Role;
}

export function ensureAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, jwtConfig.secret) as unknown as TokenPayload;

    // Validação extra para garantir que role existe
    if (!decoded || !decoded.role) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = {
      id: String(decoded.sub),
      role: decoded.role
    };

    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
