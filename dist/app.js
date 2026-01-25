import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.js';
import { authRoutes } from './features/auth/routes/authRoutes.js';
import { routes as userRoutes } from './features/user/routes/userRoutes.js';
const app = express();
// ==========================
// Middlewares globais
// ==========================
app.use(express.json());
// ==========================
// Rotas da API
// ==========================
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
// ==========================
// Swagger
// ==========================
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
export { app };
