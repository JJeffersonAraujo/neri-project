import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
const app = express();
// ==========================
// Middlewares globais
// ==========================
app.use(express.json());
// ROTAS DA API
app.use('/api', userRoutes);
// SWAGGER (TEM QUE SER DEPOIS DO EXPRESS.JSON)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
export { app };
