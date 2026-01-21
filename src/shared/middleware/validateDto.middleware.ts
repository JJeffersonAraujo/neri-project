import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'

export function validateDto(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      return res.status(400).json({
        message: 'Erro de validação',
        errors: result.error.format()
      })
    }

    req.body = result.data
    next()
  }
}
