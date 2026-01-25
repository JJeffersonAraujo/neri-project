import express from 'express'
import type { Express } from 'express'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs'
import path from 'path'

// ==========================
// Rotas TSOA
// ==========================
import { RegisterRoutes } from './routes/routes.js'

const app: Express = express()

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
    docs: '/docs',
  })
})

app.get('/health', (_req, res) => res.status(200).send('OK'))

// ==========================
// Registrar rotas TSOA
// ==========================
// ⚠️ basePath do tsoa.json = /api
app.use('/api', (req, res, next) => {
  RegisterRoutes(req.app)
  next()
})

// ==========================
// Swagger
// ==========================
const swaggerPath = path.resolve(
  process.cwd(),
  'src/config/swagger/swagger.json'
)

if (fs.existsSync(swaggerPath)) {
  const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, 'utf-8'))
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
} else {
  console.warn('⚠ Swagger não encontrado em src/config/swagger/swagger.json')
}

export { app }
