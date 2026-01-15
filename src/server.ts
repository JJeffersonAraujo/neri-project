import express, { Request, Response } from 'express';
import { userRoutes } from './features/user/routes/userRoute';
import { authRoutes } from './features/auth/routes/authRoutes';
import { ensureAuth } from './features/auth/middleware/ensureAuth';

const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

/* 🔒 ROTA DE TESTE PROTEGIDA */
app.get('/protected', ensureAuth, (req: Request, res: Response) => {
  return res.json({
    message: 'Access granted',
    userId: req.user?.id,
  });
});

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
