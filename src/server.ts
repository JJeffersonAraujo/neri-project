import 'dotenv/config';
import 'reflect-metadata';

import { createExpressServer } from 'routing-controllers';

const app = createExpressServer({
  controllers: [
    __dirname + '/features/**/controllers/*.{ts,js}',
  ],

  currentUserChecker: async (action) => {
    return action.request.user;
  },
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
