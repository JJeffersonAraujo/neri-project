import express from 'express';
import { userRoutes } from './features/user/routes/userRoutes.js';
import { authRoutes } from './features/auth/routes/authRoutes.js';
import { ensureAuth } from './features/auth/middleware/ensureAuth.js';

const app = express();

/* Middleware para JSON */
app.use(express.json());

/* Rota pública de teste */
app.get('/', (_req, res) => {
  return res.send('Hello World');
});

/* 🔒 Rota protegida de teste */
app.get('/protected', ensureAuth, (req, res) => {
  return res.json({
    message: 'Access granted',
    userId: req.user?.id,
  });
});

/* Rotas da aplicação */
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

/* Porta */
const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
