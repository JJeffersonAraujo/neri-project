import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { jwtConfig } from '../../../shared/utils/jwt.util'
import '../../../shared/types/express.types'

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
    const decoded = jwt.verify(token, jwtConfig.secret) as JwtPayload
    req.user = decoded
    next()
  } catch {
    return res.status(401).json({ message: 'Token inválido' })
  }
}
