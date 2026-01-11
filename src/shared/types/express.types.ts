import { JwtPayload } from 'jsonwebtoken'
import swaggerJsdoc from 'swagger-jsdoc'

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
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

  // ⚠️ ISSO É CRÍTICO
  apis: ['src/features/**/routes/*.ts']
})
