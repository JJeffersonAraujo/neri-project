import 'reflect-metadata';

export function ApiResponse(status: number, description: string) {
  return (target: any, propertyKey: string) => {
    const responses =
      Reflect.getMetadata('swagger:responses', target, propertyKey) || [];

    responses.push({ status, description });

    Reflect.defineMetadata(
      'swagger:responses',
      responses,
      target,
      propertyKey
    );
  };
}
