import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { jwtConfig } from '../../config/jwt.js'
import { Role } from '@prisma/client'

interface TokenPayload {
  sub: number
  role: Role
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: 'Token não informado' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = jwt.verify(token, jwtConfig.secret) as unknown as TokenPayload

    if (!decoded || !decoded.role || !Object.values(Role).includes(decoded.role)) {
      return res.status(401).json({ message: 'Token inválido ou expirado' })
    }

    req.user = {
      id: String(decoded.sub),
      role: decoded.role,
    }

    return next()
  } catch {
    return res.status(401).json({ message: 'Token inválido ou expirado' })
  }
}
