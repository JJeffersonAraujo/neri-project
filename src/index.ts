import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs'
import path from 'path'

import { RegisterRoutes } from './routes/routes'
import { env } from './config/env' // 👈 IMPORTANTE

const app = express()

// ==========================
// Middlewares globais
// ==========================
app.use(cors())
app.use(helmet())
app.use(express.json())

// ==========================
// Rotas TSOA
// ==========================
RegisterRoutes(app)

// ==========================
// Swagger
// ==========================
const swaggerPath = path.resolve(
  process.cwd(),
  'src/config/swagger/swagger.json'
)

if (fs.existsSync(swaggerPath)) {
  const swaggerDocument = JSON.parse(
    fs.readFileSync(swaggerPath, 'utf-8')
  )

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  console.log(`📄 Swagger disponível em http://localhost:${env.PORT}/docs`)
} else {
  console.warn('⚠️ swagger.json não encontrado em src/config/swagger')
}

// ==========================
// Health check
// ==========================
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

// ==========================
// Start server
// ==========================
app.listen(env.PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${env.PORT}`)
})
