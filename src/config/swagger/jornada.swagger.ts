import {
  CreateJornadaSchema,
  UpdateJornadaSchema,
  JornadaResponseSchema,
  JornadaListSchema,
} from '../swagger/jornada.schema.js'
import { IdParamSchema } from '../swagger/schemas/idParam.schema.js'
import { ErrorSchema } from '../../schemas/error.schema.js'

export const jornadaSwagger = {
  tags: [
    {
      name: 'Jornada',
      description: 'Gestão de jornadas de trabalho',
    },
  ],

  paths: {
    '/jornada': {
      post: {
        tags: ['Jornada'],
        summary: 'Registrar jornada',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: CreateJornadaSchema,
            },
          },
        },
        responses: {
          201: {
            description: 'Jornada criada',
            content: {
              'application/json': {
                schema: JornadaResponseSchema,
              },
            },
          },
          400: { description: 'Dados inválidos' },
        },
      },

      get: {
        tags: ['Jornada'],
        summary: 'Listar jornadas',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Lista de jornadas',
            content: {
              'application/json': {
                schema: JornadaListSchema,
              },
            },
          },
        },
      },
    },

    '/jornada/{id}': {
      get: {
        tags: ['Jornada'],
        summary: 'Buscar jornada por ID',
        security: [{ bearerAuth: [] }],
        parameters: [IdParamSchema],
        responses: {
          200: {
            description: 'Jornada encontrada',
            content: {
              'application/json': {
                schema: JornadaResponseSchema,
              },
            },
          },
          404: {
            description: 'Jornada não encontrada',
            content: {
              'application/json': {
                schema: ErrorSchema,
              },
            },
          },
        },
      },

      put: {
        tags: ['Jornada'],
        summary: 'Atualizar jornada',
        security: [{ bearerAuth: [] }],
        parameters: [IdParamSchema],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: UpdateJornadaSchema,
            },
          },
        },
        responses: {
          200: {
            description: 'Jornada atualizada',
            content: {
              'application/json': {
                schema: JornadaResponseSchema,
              },
            },
          },
          404: {
            description: 'Jornada não encontrada',
          },
        },
      },

      delete: {
        tags: ['Jornada'],
        summary: 'Remover jornada',
        security: [{ bearerAuth: [] }],
        parameters: [IdParamSchema],
        responses: {
          200: {
            description: 'Jornada removida com sucesso',
          },
          404: {
            description: 'Jornada não encontrada',
          },
        },
      },
    },
  },
}
