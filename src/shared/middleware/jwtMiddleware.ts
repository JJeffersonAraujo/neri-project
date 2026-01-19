import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { jwtConfig } from '../../shared/utils/jwt.util.js'

import '../types/express.types.js'

interface TokenPayload {
  id: string
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
      id: decoded.id
    }

    return next()
  } catch {
    return res.status(401).json({ message: 'Token inválido' })
  }
}
