// src/app.ts
import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './shared/types/express.types.js'

import { userRoutes } from './features/user/routes/userRoures.js'
import { authRoutes } from './features/auth/routes/authRoutes.js'
import { jornadaRoutes } from './features/jornada/routes/jornadaRoutes.js'

const app = express()

app.use(express.json())

// Prefixo /api para todas as rotas
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/jornada', jornadaRoutes)

// Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export { app }
