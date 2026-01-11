import express, { Request, Response } from 'express';


const app = express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.listen(app, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/docs`);
});
