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

## Funcionalidades
- Criação de usuário
- Login com JWT
- Middleware de autenticação
- Repositório em memória (temporário)

## Rotas

### Criar usuário
POST /users

### Login
POST /auth/login

## Autenticação
Usar header:
Authorization: Bearer <token>

## Observações
- Autenticação implementada sem banco de dados
- Persistência em memória até integração com Prisma
