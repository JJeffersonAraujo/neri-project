import swaggerJsdoc from 'swagger-jsdoc'

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string
      }
    }
  }
}

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Saúde',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:3000/api'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },

  apis: ['src/features/**/routes/*.ts']
})
