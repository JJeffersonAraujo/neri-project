import {
  OptimizeRouteRequestSchema,
  OptimizeRouteResponseSchema,
} from '../swagger/schemas/route.schema.js'
import { ErrorSchema } from '../../schemas/error.schema.js'

export const routeSwagger = {
  tags: [
    {
      name: 'Route',
      description: 'Otimização de rotas e cálculo de distância',
    },
  ],

  paths: {
    '/route/optimize': {
      post: {
        tags: ['Route'],
        summary: 'Otimizar rota',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: OptimizeRouteRequestSchema,
            },
          },
        },
        responses: {
          200: {
            description: 'Rota otimizada com sucesso',
            content: {
              'application/json': {
                schema: OptimizeRouteResponseSchema,
              },
            },
          },
          400: {
            description: 'Dados inválidos',
            content: {
              'application/json': {
                schema: ErrorSchema,
              },
            },
          },
          401: {
            description: 'Não autenticado',
          },
        },
      },
    },
  },
}
