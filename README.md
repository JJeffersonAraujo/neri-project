# Backend API – Setup Inicial

Projeto backend desenvolvido para fins corporativos, com foco em padronização de ambiente,
organização de código e preparação para evolução futura da aplicação.

O projeto encontra-se em fase inicial de desenvolvimento, com arquitetura preparada
para crescimento gradual e integração contínua.

======================================================================
### STACK TECNOLÓGICA
======================================================================

Backend:
- Node.js 24.12.0 (LTS)
- Express.js ^4.18.2
- TypeScript ^5.3.3

Banco de Dados:
- PostgreSQL 15+
- Prisma ORM 6.19.2
- Docker + Docker Compose (ambiente local)
- Banco PostgreSQL online (ambiente remoto)

Autenticação e Documentação:
- JWT (jsonwebtoken)
- Swagger (swagger-jsdoc + swagger-ui-express)
- Zod (validação de dados)

======================================================================
### ARQUITETURA DO PROJETO
======================================================================

O projeto segue o padrão Feature-Driven Architecture, com separação clara
de responsabilidades por domínio/feature.

Boas práticas adotadas:
- Normalização do banco até 3FN
- Soft delete (deletedAt)
- Auditoria (createdAt, updatedAt)
- Índices em campos críticos
- Migrations versionadas com Prisma
- Separação entre app (configuração) e index (bootstrap)

======================================================================
### PRÉ-REQUISITOS
======================================================================

Antes de iniciar, certifique-se de ter instalado:

- Node.js 24.12.0 (LTS)
- npm
- Docker
- Docker Compose

======================================================================
### CONFIGURAÇÃO DO AMBIENTE
======================================================================

1) Clonar o repositório

git clone <url-do-repositorio>
cd neri-project

--------------------------------------------------
2) Instalar dependências

npm install

--------------------------------------------------
3) Configurar variáveis de ambiente

Crie um arquivo .env na raiz do projeto:

DATABASE_URL="postgresql://user:password@host:5432/database"
JWT_SECRET="chave_secreta_jwt"
JWT_EXPIRES_IN="1d"

Observação:
- O banco pode ser local (Docker) ou remoto (online)
- A API continuará local enquanto não for feito deploy

--------------------------------------------------
4) Subir banco local (opcional)

docker compose up -d

--------------------------------------------------
5) Prisma

npx prisma validate
npx prisma migrate dev
npx prisma generate

======================================================================
### EXECUÇÃO DA API
======================================================================

Ambiente de desenvolvimento:

npm run dev

Aplicação disponível em:
http://localhost:3000

Health check:
http://localhost:3000/health

Swagger:
http://localhost:3000/docs

==================================================


📌 README (Resumido) - Neri Project API (Em Construção)
✅ Descrição

API em Node.js + TypeScript + Express + Prisma com autenticação JWT e CRUD de usuários.
⚠️ Projeto ainda em desenvolvimento — funcionalidades estão sendo implementadas.

🔐 Autenticação

POST /api/auth/login → gera token JWT

Token necessário para acessar rotas protegidas

👤 CRUD Usuários

POST /api/users → criar usuário

GET /api/users → listar usuários

GET /api/users/:id → buscar por id

PUT /api/users/:id → atualizar usuário

DELETE /api/users/:id → deletar (soft delete)

🔑 Password (Em implementação)

Estamos implementando recuperação de senha, com rotas como:

POST /api/auth/forgot-password

POST /api/auth/reset-password

A senha é armazenada com hash usando bcrypt, garantindo segurança.

⚙️ Configuração

Crie .env com:

DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=1d

🚀 Rodando o Projeto
npm install
npm run dev

📌 Prisma
npx prisma migrate dev
npx prisma generate
