// src/shared/middleware/jwtMiddleware.ts
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { jwtConfig } from '../utils/jwt.util.js'


interface TokenPayload {
  id: number
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
    const decoded = jwt.verify(token, jwtConfig.secret) as TokenPayload

    req.user = {
      id: String(decoded.id)
    }

    return next()
  } catch {
    return res.status(401).json({ message: 'Token inválido' })
  }
}
