import 'dotenv/config';
import 'reflect-metadata';

import { createExpressServer } from 'routing-controllers';

import { EnsureAuthMiddleware } from '../src/shared/middleware/EnsureAuthMiddleware';

const app = createExpressServer({
  controllers: [
    __dirname + '/features/**/controllers/*.{ts,js}',
  ],

  // 🔐 valida se a requisição está autenticada
  authorizationChecker: async (action) => {
    const authHeader = action.request.headers.authorization;
    if (!authHeader) return false;

    try {
      // reutiliza o mesmo middleware
      await new EnsureAuthMiddleware().use(
        action.request,
        action.response,
        () => {}
      );
      return true;
    } catch {
      return false;
    }
  },

  // 👤 injeta o usuário no @CurrentUser()
  currentUserChecker: async (action) => {
    return action.request.user;
  },
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

