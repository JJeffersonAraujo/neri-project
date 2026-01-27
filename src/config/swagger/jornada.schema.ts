export const CreateJornadaSchema = {
  type: 'object',
  required: ['inicio', 'fim'],
  properties: {
    inicio: {
      type: 'string',
      example: '2026-01-26T08:00:00Z',
    },
    fim: {
      type: 'string',
      example: '2026-01-26T17:00:00Z',
    },
    observacao: {
      type: 'string',
      example: 'Jornada normal',
    },
  },
}

export const UpdateJornadaSchema = {
  type: 'object',
  properties: {
    inicio: {
      type: 'string',
      example: '2026-01-26T09:00:00Z',
    },
    fim: {
      type: 'string',
      example: '2026-01-26T18:00:00Z',
    },
    observacao: {
      type: 'string',
      example: 'Horário ajustado',
    },
  },
}

export const JornadaResponseSchema = {
  type: 'object',
  properties: {
    id: { type: 'number', example: 1 },
    inicio: { type: 'string' },
    fim: { type: 'string' },
    totalHoras: { type: 'number', example: 8 },
    observacao: { type: 'string' },
    createdAt: { type: 'string' },
  },
}

export const JornadaListSchema = {
  type: 'array',
  items: JornadaResponseSchema,
}
