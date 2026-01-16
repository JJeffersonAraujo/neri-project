import 'dotenv/config';
import 'reflect-metadata';

import { createExpressServer } from 'routing-controllers';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../src/config/swagger';

const app = createExpressServer({
  controllers: [
    __dirname + '/features/**/controllers/*.{ts,js}',
  ],

  currentUserChecker: async (action) => {
    return action.request.user;
  },
});

// 📚 Swagger
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📚 Swagger em http://localhost:${PORT}/docs`);
});
