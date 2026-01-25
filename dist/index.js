import 'dotenv/config';
import { app } from './app.js';
console.log('DATABASE_URL:', process.env.DATABASE_URL);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
app.listen(app, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/docs`);
});
