import { Router } from 'express'
/*import { authRoutes } from './features/auth/routes/authRoutes'*/
import { adminRoutes } from '../../Admin/routes/admin.routes'
import { clienteRoutes } from '../../cliente/routes/cliente.routes'
import { gestorRoutes } from '../../gestor/routes/gestor.routes'
import { profissionalSaudeRoutes } from '../../profissionalSaude/routes/profissionalSaude.routes'

const routes = Router()

/*routes.use('/auth', authRoutes)*/
routes.use('/admins', adminRoutes)
routes.use('/cliente', clienteRoutes)
routes.use('/gestor', gestorRoutes)
routes.use('/profissionalSaude', profissionalSaudeRoutes)

export { routes }

