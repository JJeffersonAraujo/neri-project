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




### Stack utilizada

Node.js 24.12.0(LTS)

Express.js ^4.18.2

TypeScript ^5.3.3


# RF001 - Autenticação JWT

🚀 **Neri Project – Autenticação JWT com Swagger, Access Token, Refresh Token e Proteção de Rotas**

Este projeto implementa um sistema completo de autenticação usando:

- Node.js + TypeScript
- Express com routing-controllers
- JWT (Access Token + Refresh Token)
- Prisma + PostgreSQL
- Swagger (OpenAPI)
- Proteção de rotas via decorators
- Controle de tentativas de login
- Bloqueio automático por excesso de erros

---

## 📌 Funcionalidades Implementadas

✅ Cadastro de usuário com senha criptografada (bcrypt)  
✅ Login com JWT (Access Token)  
✅ Proteção de rotas usando middleware (`EnsureAuthMiddleware`)  
✅ Leitura automática do usuário logado (`@CurrentUser`)  
✅ Controle de tentativas de login  
✅ Bloqueio temporário após várias tentativas inválidas  
✅ Estrutura preparada para Refresh Token  
✅ Documentação automática com Swagger  
✅ Padrão profissional com decorators (routing-controllers)  

---

## 🧱 Tecnologias

- Node.js
- TypeScript
- Express
- routing-controllers
- Prisma ORM
- PostgreSQL
- JSON Web Token (JWT)
- bcrypt
- Swagger (OpenAPI)

---

## ⚙️ Requisitos

- Node.js >= 18
- PostgreSQL
- npm ou yarn

---

## 🛠️ Instalação (em qualquer máquina)

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/JJeffersonAraujo/neri-project.git
cd neri-project
2️⃣ Instalar dependências
bash
Copiar código
npm install
🔐 Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto:

env
Copiar código
DATABASE_URL="postgresql://postgres:123@localhost:5432/neri_db20"

JWT_SECRET="super_access_secret"
JWT_REFRESH_SECRET="super_refresh_secret"
⚠️ Ajuste usuário, senha e nome do banco conforme seu ambiente.

🗄️ Banco de Dados (Prisma)
3️⃣ Rodar migrations
bash
Copiar código
npx prisma migrate dev
4️⃣ Gerar Prisma Client
bash
Copiar código
npx prisma generate
▶️ Executar o projeto
bash
Copiar código
npm run dev
Servidor disponível em:

arduino
Copiar código
http://localhost:3000
📘 Swagger (Documentação da API)
🔗 Acessar Swagger UI
Após subir o projeto, acesse:

bash
Copiar código
http://localhost:3000/docs
🧪 Como testar pelo Swagger
1️⃣ Abra /docs no navegador
2️⃣ Vá em POST /auth/login
3️⃣ Faça login com um usuário válido
4️⃣ Copie o accessToken retornado
5️⃣ Clique em Authorize 🔓
6️⃣ Cole o token no formato:

nginx
Copiar código
Bearer SEU_ACCESS_TOKEN
7️⃣ Agora teste rotas protegidas como:

GET /users/me

✔️ O Swagger enviará o token automaticamente nas requisições protegidas

🧩 Estrutura Importante
pgsql
Copiar código
src/
├── config/
│   ├── jwt.ts
│   └── swagger.ts
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
│   └── middleware/
│       └── EnsureAuthMiddleware.ts
├── server.ts
📡 Rotas da API
🧑 Criar usuário
POST /users

json
Copiar código
{
  "name": "Luca",
  "email": "luca@email.com",
  "password": "12345678"
}
🔓 Login
POST /auth/login

json
Copiar código
{
  "email": "luca@email.com",
  "password": "12345678"
}
Resposta:

json
Copiar código
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

Header:

makefile
Copiar código
Authorization: Bearer SEU_ACCESS_TOKEN
Resposta:

json
Copiar código
{
  "userId": "uuid",
  "email": "luca@email.com"
}
🚫 Controle de Tentativas de Login
Cada erro incrementa loginAttempts

Após atingir o limite, o usuário é bloqueado temporariamente

Login correto reseta as tentativas

Campos no banco:

prisma
Copiar código
loginAttempts Int      @default(0)
lockedUntil   DateTime?
🚧 Próximos Upgrades Planejados
🔁 Persistir Refresh Token no banco
📧 Enviar email automático ao bloquear usuário
🧾 Log de tentativas de login
🧑‍💻 Logout global (revogação de tokens)

👨‍💻 Padrão adotado
Este projeto utiliza routing-controllers, permitindo:

Uso de decorators

Código limpo e organizado

Escalabilidade

Integração direta com Swagger

✅ Status Atual
✔ Autenticação funcional
✔ Rotas protegidas funcionando
✔ Swagger ativo
✔ Tokens válidos
✔ Sistema pronto para evoluir 🚀

yaml
Copiar código

---

# 2️⃣ COMO TESTAR O SWAGGER (RESUMO RÁPIDO)

```text
1. npm run dev
2. http://localhost:3000/docs
3. POST /auth/login
4. Copiar accessToken
5. Authorize → Bearer TOKEN
6. Testar GET /users/me
