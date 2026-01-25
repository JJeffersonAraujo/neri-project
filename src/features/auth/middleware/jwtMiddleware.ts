import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { jwtConfig } from '../../../shared/utils/jwt.util.js'
import '../../../shared/types/express.types.js'

interface CustomJwtPayload extends JwtPayload {
  sub: string 
  role: string
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
    const decoded = jwt.verify(token, jwtConfig.secret) as CustomJwtPayload

    req.user = {
      id: decoded.sub.toString(),
      role: decoded.role,
    }

    return next()
  } catch {
    return res.status(401).json({ message: 'Token inválido' })
  }
}
