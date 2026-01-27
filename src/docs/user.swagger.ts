import {
  CreateUserRequestSchema,
  UserResponseSchema,
  UserListResponseSchema,
} from '../schemas/user.schema.js'
import { ErrorSchema } from '../schemas/error.schema.js'

export const userSwagger = {
  tags: [
    {
      name: 'Users',
      description: 'Gestão de usuários',
    },
  ],

  paths: {
    '/users': {
      post: {
        tags: ['Users'],
        summary: 'Criar usuário',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: CreateUserRequestSchema,
            },
          },
        },
        responses: {
          201: {
            description: 'Usuário criado com sucesso',
            content: {
              'application/json': {
                schema: UserResponseSchema,
              },
            },
          },
          409: {
            description: 'E-mail já cadastrado',
            content: {
              'application/json': {
                schema: ErrorSchema,
              },
            },
          },
        },
      },

      get: {
        tags: ['Users'],
        summary: 'Listar usuários',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Lista de usuários',
            content: {
              'application/json': {
                schema: UserListResponseSchema,
              },
            },
          },
        },
      },
    },

    '/users/me': {
      get: {
        tags: ['Users'],
        summary: 'Dados do usuário logado',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Usuário autenticado',
            content: {
              'application/json': {
                schema: UserResponseSchema,
              },
            },
          },
          401: {
            description: 'Token inválido',
            content: {
              'application/json': {
                schema: ErrorSchema,
              },
            },
          },
        },
      },
    },

    '/users/{id}': {
      get: {
        tags: ['Users'],
        summary: 'Buscar usuário por ID',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'number' },
          },
        ],
        responses: {
          200: {
            description: 'Usuário encontrado',
            content: {
              'application/json': {
                schema: UserResponseSchema,
              },
            },
          },
          404: {
            description: 'Usuário não encontrado',
            content: {
              'application/json': {
                schema: ErrorSchema,
              },
            },
          },
        },
      },

      put: {
        tags: ['Users'],
        summary: 'Atualizar usuário',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'number' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: CreateUserRequestSchema,
            },
          },
        },
        responses: {
          200: {
            description: 'Usuário atualizado',
            content: {
              'application/json': {
                schema: UserResponseSchema,
              },
            },
          },
          404: {
            description: 'Usuário não encontrado',
            content: {
              'application/json': {
                schema: ErrorSchema,
              },
            },
          },
        },
      },

      delete: {
        tags: ['Users'],
        summary: 'Remover usuário',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'number' },
          },
        ],
        responses: {
          200: {
            description: 'Usuário removido com sucesso',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Usuário removido com sucesso',
                    },
                  },
                },
              },
            },
          },
          404: {
            description: 'Usuário não encontrado',
            content: {
              'application/json': {
                schema: ErrorSchema,
              },
            },
          },
        },
      },
    },
  },
}
