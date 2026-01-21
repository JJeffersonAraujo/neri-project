import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NeriCare API',
      version: '1.0.0',
      description: 'API de gerenciamento de saúde e cuidados NeriCare'
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor de desenvolvimento'
      },
      {
        url: 'https://api.nericare.com/api',
        description: 'Servidor de produção'
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
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/features/**/routes/*.ts']
}

export const swaggerSpec = swaggerJsdoc(options)
