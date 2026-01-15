# Backend API – Setup Inicial

Projeto backend desenvolvido para fins corporativos, com foco em padronização de ambiente, organização de código e preparação para evolução futura da aplicação.

Atualmente, o projeto contempla a configuração inicial do servidor e um endpoint de validação (*Hello World*).

---

## 🚀 Como executar o projeto

### Pré-requisitos

- Node.js **24.12.0(LTS)**
- npm

### Instalação

npm install

### Executar em modo desenvolvimento

npm run dev

### A aplicação estará disponível em:

http://localhost:3000


### Endpoint disponível

GET / → Retorna: Hello World 

### Stack utilizada

Node.js 24.12.0(LTS)

Express.js ^4.18.2

TypeScript ^5.3.3


# RF001 - Autenticação JWT

🚀 Neri Project – Autenticação JWT com Access Token, Refresh Token e Proteção de Rotas

Este projeto implementa um sistema completo de autenticação usando:

Node.js + TypeScript

Express com routing-controllers

JWT (Access Token + Refresh Token)

Prisma + PostgreSQL

Proteção de rotas via decorators

Controle de tentativas de login

Bloqueio automático por excesso de erros

📌 Funcionalidades Implementadas

✅ Cadastro de usuário com senha criptografada (bcrypt)
✅ Login com JWT (Access Token)
✅ Proteção de rotas usando @EnsureAuth()
✅ Leitura automática do usuário logado (@CurrentUser())
✅ Controle de tentativas de login
✅ Bloqueio temporário após várias tentativas inválidas
✅ Estrutura preparada para Refresh Token
✅ Padrão profissional com decorators (routing-controllers)

🧱 Tecnologias

Node.js

TypeScript

Express

routing-controllers

Prisma ORM

PostgreSQL

JSON Web Token (JWT)

bcrypt

⚙️ Requisitos

Node.js >= 18

PostgreSQL

npm ou yarn

🛠️ Instalação (em qualquer máquina)
1️⃣ Clonar o repositório
git clone https://github.com/JJeffersonAraujo/neri-project.git
cd neri-project

2️⃣ Instalar dependências
npm install

🔐 Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto:

DATABASE_URL="postgresql://postgres:123@localhost:5432/neri_db20"

JWT_SECRET="super_access_secret"
JWT_REFRESH_SECRET="super_refresh_secret"


⚠️ Ajuste usuário, senha e nome do banco conforme seu ambiente.

🗄️ Banco de Dados (Prisma)
3️⃣ Gerar e aplicar migrations
npx prisma migrate dev

4️⃣ Gerar o Prisma Client
npx prisma generate

▶️ Executar o projeto
npm run dev


Servidor disponível em:

http://localhost:3000

🧩 Estrutura Importante
src/
├── config/
│   └── jwt.ts
├── features/
│   ├── auth/
│   │   ├── controllers/
│   │   ├── services/
│   │   └── dtos/
│   └── user/
│       ├── controllers/
│       ├── services/
│       └── repositories/
├── shared/
│   └── middlewares/
│       └── EnsureAuthMiddleware.ts
├── server.ts

🔑 Autenticação JWT
🔐 Access Token

Curta duração (15 minutos)

Usado para acessar rotas protegidas

🔁 Refresh Token

Longa duração (30 dias)

Preparado para renovação automática do access token

📡 Rotas da API
🧑 Criar usuário
POST /users


Body

{
  "name": "Luca",
  "email": "luca@email.com",
  "password": "12345678"
}

🔓 Login
POST /auth/login


Body

{
  "email": "luca@email.com",
  "password": "12345678"
}


Resposta

{
  "accessToken": "jwt_token_aqui",
  "user": {
    "id": "uuid",
    "name": "Luca",
    "email": "luca@email.com"
  }
}

🔒 Rota protegida – Perfil do usuário
GET /users/me


Headers

Authorization: Bearer SEU_ACCESS_TOKEN


Resposta

{
  "userId": "uuid",
  "email": "luca@email.com"
}

🛡️ Proteção de Rotas

As rotas protegidas utilizam o decorator:

@EnsureAuth()


E o usuário autenticado é acessado via:

@CurrentUser()

🚫 Controle de Tentativas de Login

Cada erro incrementa loginAttempts

Após atingir o limite, o usuário é bloqueado temporariamente

Login correto reseta as tentativas

Campos no banco:

loginAttempts Int      @default(0)
lockedUntil   DateTime?

🧪 Testes com Postman

1️⃣ Criar usuário
2️⃣ Fazer login
3️⃣ Copiar accessToken
4️⃣ Usar Bearer Token nas rotas protegidas
5️⃣ Testar bloqueio errando a senha repetidamente

🚧 Próximos Upgrades Planejados

🔁 Persistir Refresh Token no banco
📧 Enviar email automático ao bloquear usuário
🧾 Log de tentativas de login
🧑‍💻 Logout global (revogação de tokens)

👨‍💻 Padrão adotado

Este projeto não usa Express puro, e sim:

routing-controllers, que interpreta decorators corretamente
(diferente do Express tradicional)

Isso permite um código mais limpo, escalável e profissional.

✅ Status Atual

✔ Autenticação funcional
✔ Rotas protegidas funcionando
✔ Tokens válidos
✔ Sistema pronto para evoluir