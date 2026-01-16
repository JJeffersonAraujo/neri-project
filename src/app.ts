import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './shared/types/express.types'
import { userRoutes } from './features/user/routes/userRoures'

const app = express()

app.use(express.json())

// ROTAS DA API
app.use('/api', userRoutes)

// SWAGGER (TEM QUE SER DEPOIS DO EXPRESS.JSON)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export { app }
