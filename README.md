
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

Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

DATABASE_URL="postgresql://developer:dev_password_123@localhost:5432/project_db"

--------------------------------------------------
4) Subir o banco de dados (Docker)

docker compose up -d

Serviços iniciados:
- PostgreSQL
- pgAdmin

Acessos:
- PostgreSQL: localhost:5432
- pgAdmin: http://localhost:5050

Credenciais do banco:
Usuário: developer
Senha: dev_password_123
Database: project_db

--------------------------------------------------
5) Validar schema do Prisma

npx prisma validate

--------------------------------------------------
6) Criar/aplicar migrations (se necessário)

npx prisma migrate dev --name init_database

--------------------------------------------------
7) Gerar cliente Prisma

npx prisma generate

--------------------------------------------------
8) (Opcional) Abrir Prisma Studio

npx prisma studio

======================================================================
### EXECUÇÃO DA API
======================================================================

Para executar a API em ambiente de desenvolvimento:

npm run dev

O servidor será iniciado utilizando tsx e ficará observando alterações.

Aplicação disponível em:
http://localhost:3000

======================================================================
### TESTANDO OS ENDPOINTS
======================================================================

Ferramenta recomendada:
- Postman ou Insomnia

Fluxo básico para testes:

1) Subir os containers do banco
2) Executar a API (npm run dev)
3) Garantir que o banco esteja acessível
4) Executar requisições HTTP para os endpoints disponíveis

Exemplo de base URL:
http://localhost:3000/user

Observações importantes:
- Certifique-se de que o Docker esteja rodando
- A API depende do banco ativo para funcionar corretamente
- Erros de conexão geralmente indicam banco parado

======================================================================
### TROUBLESHOOTING
======================================================================

Erro: Can't reach database server at localhost:5432
Solução:
- Verifique se o docker compose está rodando
- Confirme se o container postgres está ativo
- Verifique o DATABASE_URL no .env

Erro: Cannot find module src/server.ts
Solução:
- O entrypoint da aplicação é src/index.ts
- Verifique o script "dev" no package.json

======================================================================
### PADRÕES ADOTADOS
======================================================================

- Commits semânticos
- Versionamento controlado por migrations
- Separação clara de responsabilidades
- Código preparado para testes e CI/CD

======================================================================
### STATUS DO PROJETO
======================================================================

Projeto em fase inicial de desenvolvimento, com estrutura preparada
para crescimento gradual e adição de novas features.
