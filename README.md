# BACKEND API – PROJETO NERICARE
======================================================================

## 1. VISÃO GERAL
----------------------------------------------------------------------
O projeto NERICARE é uma API backend desenvolvida com foco corporativo,
priorizando padronização, escalabilidade, segurança, tipagem forte e
documentação automática.

A aplicação foi construída seguindo boas práticas modernas de mercado,
com arquitetura orientada a features (Feature-Driven Architecture),
visando fácil manutenção, evolução contínua e integração com times
multidisciplinares.

----------------------------------------------------------------------

## 2. STACK TECNOLÓGICA
----------------------------------------------------------------------

BACKEND
- Node.js 24.12.0 (LTS)
- Express.js ^4.18
- TypeScript ^5.3
- TSOA (controllers tipados + geração automática de rotas e Swagger)

BANCO DE DADOS
- PostgreSQL 15+
- Prisma ORM ^6.x
- Docker e Docker Compose (ambiente local)
- Banco remoto para homologação/produção

AUTENTICAÇÃO, VALIDAÇÃO E DOCUMENTAÇÃO
- JWT (jsonwebtoken v8)
- Access Token + Refresh Token
- Swagger OpenAPI 3 (gerado via TSOA)
- Zod (validação de variáveis de ambiente)

----------------------------------------------------------------------

## 3. ARQUITETURA DO PROJETO
----------------------------------------------------------------------

Padrão adotado:
- Feature-Driven Architecture

Principais conceitos aplicados:
- Organização por domínio (features)
- Controllers enxutos (sem regra de negócio)
- Services responsáveis pelas regras de negócio
- Repositórios isolando acesso a dados
- Tipagem forte ponta a ponta (TS + Prisma + TSOA)
- Soft delete (deletedAt)
- Auditoria automática (createdAt, updatedAt)
- Enums para regras de negócio (roles)
- Separação clara entre bootstrap, config e domínio

----------------------------------------------------------------------

## 4. ESTRUTURA DE PASTAS (RESUMO)
----------------------------------------------------------------------

src/
├── app.ts                     -> Configuração do Express
├── index.ts                   -> Bootstrap da aplicação
├── routes/                    -> Rotas geradas automaticamente (TSOA)
├── features/                  -> Domínios da aplicação
│   └── auth/
│       ├── controllers/
│       ├── services/
│       └── dtos/
├── shared/                    -> Código compartilhado
│   ├── database/
│   ├── middleware/
│   │   └── ensureAuth.ts
│   ├── utils/
│   │   └── jwtUtils.ts
│   └── types/
├── config/
│   ├── env.ts
│   └── swagger/

OBSERVAÇÕES IMPORTANTES:
- O arquivo routes.ts é gerado automaticamente pelo TSOA
- Nunca editar arquivos gerados manualmente
- Autenticação do Swagger utiliza expressAuthentication

----------------------------------------------------------------------

## 5. PRÉ-REQUISITOS
----------------------------------------------------------------------

- Node.js 24.12.0 (LTS)
- npm
- Docker
- Docker Compose

----------------------------------------------------------------------

## 6. CONFIGURAÇÃO DO AMBIENTE
----------------------------------------------------------------------

6.1 Clonar o repositório

git clone <url-do-repositorio>
cd neri-project

----------------------------------------------------------------------

6.2 Instalar dependências

npm install

----------------------------------------------------------------------

6.3 Variáveis de ambiente

Criar um arquivo .env na raiz do projeto:

DATABASE_URL="postgresql://developer:dev_password_123@localhost:5432/project_db"

# JWT
JWT_ACCESS_SECRET="access_secret_super_seguro"
JWT_REFRESH_SECRET="refresh_secret_super_seguro"

# Server
PORT=3000
NODE_ENV=development

OBSERVAÇÕES:
- Access Token e Refresh Token utilizam SEGREDOS DIFERENTES
- Nunca versionar o arquivo .env
- Nunca reutilizar secrets em produção

----------------------------------------------------------------------

6.4 Subir banco local (opcional)

docker compose up -d

----------------------------------------------------------------------

6.5 Prisma

npx prisma validate
npx prisma migrate dev
npx prisma generate

----------------------------------------------------------------------

## 7. SWAGGER E ROTAS (TSOA)
----------------------------------------------------------------------

Gerar documentação e rotas automaticamente:

npx tsoa spec
npx tsoa routes

Executar sempre que:
- Controllers forem alterados
- DTOs forem modificados
- Autenticação ou security mudar

----------------------------------------------------------------------

## 8. EXECUÇÃO DA APLICAÇÃO
----------------------------------------------------------------------

Ambiente de desenvolvimento:

npm run dev

Endereços disponíveis:
- API: http://localhost:3000
- Health Check: http://localhost:3000/health
- Swagger UI: http://localhost:3000/docs

----------------------------------------------------------------------

## 9. AUTENTICAÇÃO E SEGURANÇA
----------------------------------------------------------------------

A API utiliza autenticação JWT no padrão Bearer Token.

Fluxo de autenticação:
1. Login em /api/auth/login
2. Recebe accessToken e refreshToken
3. Enviar accessToken no header:

Authorization: Bearer <access_token>

Características:
- Access Token com curta duração
- Refresh Token com duração maior
- Tokens assinados com jsonwebtoken v8
- Payload mínimo (id, email, role)
- Tokens verificados via JwtUtils
- Swagger protegido via expressAuthentication

----------------------------------------------------------------------

## 10. TESTES MANUAIS
----------------------------------------------------------------------

Ferramentas recomendadas:
- Swagger UI
- Postman
- Insomnia

Testes essenciais:
- Login válido e inválido
- Acesso a rotas protegidas sem token
- Acesso com token inválido
- Refresh token
- Logout e revogação de sessão

----------------------------------------------------------------------

## 11. BOAS PRÁTICAS ADOTADAS
----------------------------------------------------------------------

- Tipagem forte
- Separação de responsabilidades
- Arquitetura orientada a domínio
- Soft delete
- Auditoria automática
- JWT seguro (access + refresh)
- Documentação automática
- Código preparado para CI/CD e testes

----------------------------------------------------------------------

## 12. PRÓXIMOS PASSOS
----------------------------------------------------------------------

- Testes automatizados (unitários e integração)
- Rate limit no login
- Logs estruturados
- Observabilidade
- Pipeline CI/CD
- Deploy em cloud

======================================================================
