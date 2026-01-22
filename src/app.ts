/*import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger'
import { routes } from './features/user/routes/userRoutes'

const app = express()

app.use(express.json())

// API Routes
app.use('/api', routes)

// Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export { app }*/

import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger.js'

import { userRoutes } from './features/user/routes/userRoutes.js'
import { authRoutes } from './features/auth/routes/authRoutes.js'
import { jornadaRoutes } from './features/jornada/routes/jornadaRoutes.js'

const app = express()

// ==========================
// Middlewares globais
// ==========================
app.use(express.json())

// ==========================
// Rotas base
// ==========================
app.get('/', (_req, res) => {
  return res.status(200).json({
    status: 'OK',
    message: 'Neri Project API está rodando 🚀',
    docs: '/docs'
  })
})

app.get('/health', (_req, res) => {
  return res.status(200).send('OK')
})

// ==========================
// Rotas da aplicação
// ==========================
app.use('/api/auth', authRoutes)   // /api/auth/login
app.use('/api', userRoutes)        // /api/users
app.use('/api/jornada', jornadaRoutes)

// ==========================
// Swagger
// ==========================
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export { app }

