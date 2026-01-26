import express, { type Express } from 'express'
import swaggerUi from 'swagger-ui-express'
import fs from 'fs'
import path from 'path'
import cors from 'cors'


import { authRoutes } from './features/auth/routes/authRoutes.js'
import { routes as userRoutes } from './features/../routes/user.routes.js'


// ==========================
// Rotas TSOA
// ==========================
import { RegisterRoutes } from './routes/routes'

const app: Express = express()

// ==========================
// Middlewares globais
// ==========================
app.use(cors())
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

app.get('/health', (_req, res) => res.status(200).send('OK'))

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)


// ==========================
// Registrar rotas TSOA
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
  const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, 'utf-8'))
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
} else {
  console.warn('⚠ Swagger não encontrado em src/config/swagger/swagger.json')
}

export { app }
