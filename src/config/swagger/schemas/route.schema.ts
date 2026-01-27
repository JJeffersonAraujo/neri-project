export const OptimizeRouteRequestSchema = {
  type: 'object',
  required: ['origem', 'destinos'],
  properties: {
    origem: {
      type: 'object',
      required: ['lat', 'lng'],
      properties: {
        lat: { type: 'number', example: -23.55052 },
        lng: { type: 'number', example: -46.633308 },
      },
    },
    destinos: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        required: ['lat', 'lng'],
        properties: {
          lat: { type: 'number', example: -23.561684 },
          lng: { type: 'number', example: -46.625378 },
        },
      },
    },
  },
}

export const OptimizeRouteResponseSchema = {
  type: 'object',
  properties: {
    distanciaTotal: {
      type: 'number',
      example: 12.5,
    },
    duracaoEstimada: {
      type: 'number',
      example: 35,
      description: 'Duração em minutos',
    },
    rotaOtimizadas: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          lat: { type: 'number' },
          lng: { type: 'number' },
        },
      },
    },
  },
}
