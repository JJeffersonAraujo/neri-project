import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './shared/types/express.types.js'

import { userRoutes } from './features/user/routes/userRoutes.js'
import { authRoutes } from './features/auth/routes/authRoutes.js'
import { jornadaRoutes } from './features/jornada/routes/jornadaRoutes.js'

const app = express()

app.use(express.json())

// Prefixo /api para todas as rotas
app.use('/api', userRoutes)      // /api/users
app.use('/api/auth', authRoutes) // /api/auth/login
app.use('/api/jornada', jornadaRoutes)

// Swagger disponível em /docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export { app }
