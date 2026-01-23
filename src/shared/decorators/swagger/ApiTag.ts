// src/shared/decorators/swagger/ApiTag.ts
import 'reflect-metadata'

export function ApiTag(tag: string) {
  return (target: any) => {
    Reflect.defineMetadata(
      'swagger:tag',
      tag,
      target
    )
  }
}
