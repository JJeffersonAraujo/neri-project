
BACKEND API – PROJETO NERICARE
============================================================

1. VISÃO GERAL
------------------------------------------------------------
Projeto backend desenvolvido com foco corporativo, priorizando
padronização, escalabilidade, segurança, documentação automática
e boas práticas de mercado.

A aplicação utiliza arquitetura orientada a features (Feature-Driven),
com separação clara de responsabilidades e pronta para evolução
contínua.

------------------------------------------------------------

2. STACK TECNOLÓGICA
------------------------------------------------------------

BACKEND
- Node.js 24.12.0 (LTS)
- Express.js ^4.18.2
- TypeScript ^5.3.3
- TSOA (controllers tipados + geração automática de rotas)

BANCO DE DADOS
- PostgreSQL 15+
- Prisma ORM 6.19.2
- Docker + Docker Compose (ambiente local)
- PostgreSQL remoto (produção/homologação)

AUTENTICAÇÃO E DOCUMENTAÇÃO
- JWT (jsonwebtoken)
- Swagger OpenAPI 3 (gerado automaticamente via TSOA)
- Zod (validação de dados)

------------------------------------------------------------

3. ARQUITETURA DO PROJETO
------------------------------------------------------------

Padrão adotado:
- Feature-Driven Architecture

Principais conceitos:
- Organização por domínio (features)
- Controllers finos
- Services com regras de negócio
- Repositories para acesso a dados
- Tipagem forte (TypeScript + Prisma + TSOA)
- Soft delete (deletedAt)
- Auditoria (createdAt, updatedAt)
- Enums para regras de negócio (roles)
- Separação entre bootstrap e configuração

------------------------------------------------------------

4. ESTRUTURA DE PASTAS (RESUMO)
------------------------------------------------------------

src/
├── app.ts                -> Configuração do Express
├── index.ts              -> Bootstrap da aplicação
├── routes/               -> Rotas geradas automaticamente (TSOA)
├── features/             -> Domínios da aplicação
├── shared/               -> Código compartilhado
│   ├── database/
│   ├── middleware/
│   ├── utils/
│   └── types/
├── config/
│   └── swagger/

OBSERVAÇÃO:
- O arquivo routes.ts é gerado automaticamente pelo TSOA.
- Nunca edite manualmente este arquivo.

------------------------------------------------------------

5. PRÉ-REQUISITOS
------------------------------------------------------------

- Node.js 24.12.0 (LTS)
- npm
- Docker
- Docker Compose

------------------------------------------------------------

6. CONFIGURAÇÃO DO AMBIENTE
------------------------------------------------------------

6.1 Clonar o repositório

git clone <url-do-repositorio>
cd neri-project

------------------------------------------------------------

6.2 Instalar dependências

npm install

------------------------------------------------------------

6.3 Variáveis de ambiente

Criar arquivo .env na raiz do projeto:

DATABASE_URL="postgresql://developer:dev_password_123@localhost:5432/project_db"


# JWT
JWT_SECRET="neri_secret_super_segura"
JWT_EXPIRES_IN="1d"

# Server
PORT=3000

#Swagger
NODE_ENV=development

------------------------------------------------------------

6.4 Subir banco local (opcional)

docker compose up -d

------------------------------------------------------------

6.5 Prisma

npx prisma validate
npx prisma migrate dev
npx prisma generate

------------------------------------------------------------

7. SWAGGER E ROTAS (TSOA)
------------------------------------------------------------

Gerar documentação e rotas:

npx tsoa spec
npx tsoa routes

Sempre executar após:
- Alterar controllers
- Alterar DTOs
- Alterar autenticação

------------------------------------------------------------

8. EXECUÇÃO DA APLICAÇÃO
------------------------------------------------------------

Ambiente de desenvolvimento:

npm run dev

Endereços:
- API: http://localhost:3000
- Health: http://localhost:3000/health
- Swagger: http://localhost:3000/docs

------------------------------------------------------------

9. AUTENTICAÇÃO
------------------------------------------------------------

A API utiliza JWT Bearer Token.

Fluxo:
1. Login em /api/auth/login
2. Receber accessToken e refreshToken
3. Enviar o token no header:

Authorization: Bearer <token>

Rotas protegidas utilizam @Security("bearerAuth").

------------------------------------------------------------

10. TESTES MANUAIS
------------------------------------------------------------

Ferramentas recomendadas:
- Swagger UI
- Postman
- Insomnia

------------------------------------------------------------

11. BOAS PRÁTICAS ADOTADAS
------------------------------------------------------------

- Tipagem forte
- Separação de responsabilidades
- Soft delete
- Auditoria automática
- Segurança com JWT
- Documentação automática
- Código preparado para testes e CI/CD

------------------------------------------------------------

12. PRÓXIMOS PASSOS
------------------------------------------------------------

- Testes automatizados
- Rate limit
- Logs estruturados
- Observabilidade
- CI/CD
- Deploy em cloud

------------------------------------------------------------