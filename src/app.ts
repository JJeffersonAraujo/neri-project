import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger'
import { routes } from './features/user/routes/userRoutes'

const app = express()

app.use(express.json())

// API Routes
app.use('/api', routes)

// Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export { app }
