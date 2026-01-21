import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'

export function validateDto(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.safeParse(req.body)

    if (!parsed.success) {
      return res.status(400).json({
        message: 'Erro de validação',
        errors: parsed.error.format()
      })
    }

    req.body = parsed.data
    next()
  }
}
