// src/shared/decorators/swagger/ApiAuth.ts
import 'reflect-metadata';

export function ApiAuth() {
  return (target: any, propertyKey: string) => {
    Reflect.defineMetadata(
      'swagger:auth',
      true,
      target,
      propertyKey
    );
  };
}
