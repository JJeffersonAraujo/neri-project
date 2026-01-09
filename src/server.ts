import express, { Request, Response } from 'express';
import { userRoutes } from './features/user/routes/userRoutes';
import { authRoutes } from './features/auth/routes/authRoutes';



const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.use('/users', userRoutes);
app.use('/auth', authRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
