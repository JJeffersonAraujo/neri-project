// src/features/jornada/routes/jornadaRoutes.ts
import { Router } from 'express'
import { JornadaController } from '../controllers/jornadaController.js'
import { authMiddleware } from '../../../shared/middleware/jwtMiddleware.js'

const jornadaRoutes = Router()
const jornadaController = new JornadaController()

jornadaRoutes.post('/', authMiddleware, (req, res) =>
  jornadaController.registrar(req, res)
)

jornadaRoutes.get('/', authMiddleware, (req, res) =>
  jornadaController.listarTodas(req, res)
)

jornadaRoutes.get('/:id', authMiddleware, (req, res) =>
  jornadaController.buscarPorId(req, res)
)

jornadaRoutes.put('/:id', authMiddleware, (req, res) =>
  jornadaController.atualizar(req, res)
)

jornadaRoutes.delete('/:id', authMiddleware, (req, res) =>
  jornadaController.deletar(req, res)
)

export { jornadaRoutes }
