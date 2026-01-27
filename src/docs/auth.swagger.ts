import {
  LoginRequestSchema,
  LoginResponseSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from '../schemas/auth.schema.js'
import { ErrorSchema } from '../schemas/error.schema.js'

export const authSwagger = {
  tags: [
    {
      name: 'Auth',
      description: 'Autenticação e recuperação de senha',
    },
  ],

  paths: {
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login do usuário',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: LoginRequestSchema,
            },
          },
        },
        responses: {
          200: {
            description: 'Login realizado com sucesso',
            content: {
              'application/json': {
                schema: LoginResponseSchema,
              },
            },
          },
          401: {
            description: 'Credenciais inválidas',
            content: {
              'application/json': {
                schema: ErrorSchema,
              },
            },
          },
        },
      },
    },

    '/auth/forgot-password': {
      post: {
        tags: ['Auth'],
        summary: 'Solicitar recuperação de senha',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: ForgotPasswordSchema,
            },
          },
        },
        responses: {
          200: {
            description: 'E-mail de recuperação enviado',
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

    '/auth/reset-password': {
      post: {
        tags: ['Auth'],
        summary: 'Resetar senha do usuário',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: ResetPasswordSchema,
            },
          },
        },
        responses: {
          200: {
            description: 'Senha alterada com sucesso',
          },
          400: {
            description: 'Token inválido ou expirado',
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
