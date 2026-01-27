export const CreateUserRequestSchema = {
  type: 'object',
  required: ['nome', 'email', 'senha'],
  properties: {
    nome: {
      type: 'string',
      example: 'Gabriel',
    },
    email: {
      type: 'string',
      example: 'gabriel@email.com',
    },
    senha: {
      type: 'string',
      example: '123456',
    },
    role: {
      type: 'string',
      example: 'USER',
    },
  },
}

export const UserResponseSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'number',
      example: 1,
    },
    nome: {
      type: 'string',
      example: 'Gabriel',
    },
    email: {
      type: 'string',
      example: 'gabriel@email.com',
    },
    role: {
      type: 'string',
      example: 'USER',
    },
    createdAt: {
      type: 'string',
      example: '2026-01-26T10:00:00.000Z',
    },
  },
}

export const UserListResponseSchema = {
  type: 'array',
  items: UserResponseSchema,
}
