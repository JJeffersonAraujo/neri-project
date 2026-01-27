export const LoginRequestSchema = {
  type: 'object',
  required: ['email', 'senha'],
  properties: {
    email: {
      type: 'string',
      example: 'gabriel@email.com',
    },
    senha: {
      type: 'string',
      example: '123456',
    },
  },
}

export const LoginResponseSchema = {
  type: 'object',
  properties: {
    accessToken: {
      type: 'string',
      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    },
    refreshToken: {
      type: 'string',
      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    },
  },
}

export const ForgotPasswordSchema = {
  type: 'object',
  required: ['email'],
  properties: {
    email: {
      type: 'string',
      example: 'gabriel@email.com',
    },
  },
}

export const ResetPasswordSchema = {
  type: 'object',
  required: ['token', 'senha'],
  properties: {
    token: {
      type: 'string',
      example: 'reset-token-aqui',
    },
    senha: {
      type: 'string',
      example: 'novaSenha123',
    },
  },
}
