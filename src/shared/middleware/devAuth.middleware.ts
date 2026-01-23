import { Request, Response, NextFunction } from 'express'

export function devAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.user = {
    id: 'dev-user',
  }

  next()
}
