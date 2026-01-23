// src/shared/decorators/swagger/ApiBody.ts
import 'reflect-metadata'
import { ZodTypeAny } from 'zod'

export function ApiBody(schema: ZodTypeAny) {
  return (target: any, propertyKey: string) => {
    Reflect.defineMetadata(
      'swagger:body',
      schema,
      target,
      propertyKey
    )
  }
}
