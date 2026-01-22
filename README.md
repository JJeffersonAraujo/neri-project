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
