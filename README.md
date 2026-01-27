Backend API – Setup Inicial

Projeto backend desenvolvido para fins corporativos, com foco em padronização de ambiente, organização de código e preparação para evolução futura da aplicação.

O projeto encontra-se em fase inicial de desenvolvimento, com arquitetura preparada para crescimento gradual e integração contínua.

STACK TECNOLÓGICA
Backend

Node.js 24.12.0 (LTS)

Express.js ^4.18.2

TypeScript ^5.3.3

Banco de Dados

PostgreSQL 15+

Prisma ORM 6.19.2

Docker + Docker Compose (ambiente local)

Banco PostgreSQL online (ambiente remoto)

Autenticação e Documentação

JWT (jsonwebtoken)

Swagger (swagger-jsdoc + swagger-ui-express)

Zod (validação de dados)

ARQUITETURA DO PROJETO

O projeto segue o padrão Feature-Driven Architecture, com separação clara de responsabilidades por domínio/feature.

Boas práticas adotadas

Normalização do banco até 3FN

Soft delete (deletedAt)

Auditoria (createdAt, updatedAt)

Índices em campos críticos

Migrations versionadas com Prisma

Separação entre app (configuração) e index (bootstrap)

DOCUMENTAÇÃO COM SWAGGER

A API possui documentação interativa utilizando Swagger (OpenAPI 3.0).

Acesso
http://localhost:3000/docs

Estrutura adotada

servers.url: /api

paths: definidos sem /api (ex: /users, /auth/login)

Organização por tags (Auth, Users, Jornada, etc.)

Suporte a autenticação JWT via Bearer Token

📌 Todas as rotas documentadas refletem exatamente as rotas reais da API Express.

PRÉ-REQUISITOS

Antes de iniciar, certifique-se de ter instalado:

Node.js 24.12.0 (LTS)

npm

Docker

Docker Compose

CONFIGURAÇÃO DO AMBIENTE
1) Clonar o repositório
git clone <url-do-repositorio>
cd neri-project

2) Instalar dependências
npm install

3) Configurar variáveis de ambiente

Crie um arquivo .env na raiz do projeto:

DATABASE_URL="postgresql://user:password@host:5432/database"
JWT_SECRET="chave_secreta_jwt"
JWT_EXPIRES_IN="1d"


Observações:

O banco pode ser local (Docker) ou remoto

A API roda localmente enquanto não houver deploy

4) Subir banco local (opcional)
docker compose up -d

5) Prisma
npx prisma validate
npx prisma migrate dev
npx prisma generate

EXECUÇÃO DA API
Ambiente de desenvolvimento
npm run dev

Endpoints básicos

API: http://localhost:3000

Health check: http://localhost:3000/health

Swagger: http://localhost:3000/docs

FUNCIONALIDADES ATUAIS
🔐 Autenticação

POST /api/auth/login → gera token JWT

Token obrigatório para rotas protegidas

👤 CRUD de Usuários

POST /api/users → criar usuário

GET /api/users → listar usuários

GET /api/users/:id → buscar por ID

PUT /api/users/:id → atualizar usuário

DELETE /api/users/:id → soft delete

🔑 Recuperação de Senha (em implementação)

Estamos implementando recuperação de senha com as rotas:

POST /api/auth/forgot-password

POST /api/auth/reset-password

A senha é armazenada com hash (bcrypt), garantindo segurança.

STATUS DO PROJETO

⚠️ Projeto em desenvolvimento
Funcionalidades estão sendo implementadas e evoluídas gradualmente.