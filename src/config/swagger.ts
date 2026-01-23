import swaggerJSDoc from 'swagger-jsdoc'
import path from 'path'

const apiUrl = process.env.API_BASE_URL || 'http://localhost:3000'

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NeriCare API',
      version: '1.0.0',
      description: 'API Backend NeriCare – Express + Prisma + JWT',
    },
    servers: [
      {
        url: `${apiUrl}/api`,
        description: apiUrl.includes('localhost')
          ? 'Servidor local'
          : 'Servidor online',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },

  // 🔥 AQUI ESTÁ O SEGREDO
  apis: [
    path.resolve(process.cwd(), 'src/features/**/routes/*.{ts,js}'),
  ],
})
