import { Request, Response, NextFunction } from 'express'

type Role =
  | 'ADMIN'
  | 'GESTOR'
  | 'CLIENTE'
  | 'PROFISSIONAL'

export function authorize(...allowedRoles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' })
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Acesso negado' })
    }

    return next()
  }
}
