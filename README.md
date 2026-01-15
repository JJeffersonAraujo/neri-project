# Backend API – Setup Inicial

Projeto backend desenvolvido para fins corporativos, com foco em padronização de ambiente,
organização de código e preparação para evolução futura da aplicação.

O projeto encontra-se em **fase inicial de desenvolvimento**, com arquitetura preparada
para crescimento gradual e integração contínua.

---

## 🚀 Stack Tecnológica

### Backend
- Node.js **24.12.0 (LTS)**
- Express.js **^4.18.2**
- TypeScript **^5.3.3**

### Banco de Dados
- PostgreSQL **15+**
- Prisma ORM **6.19.2**
- Docker Compose (ambiente local)

---

## 🗂️ Arquitetura do Projeto

O projeto segue uma abordagem **Feature-Driven**, com separação clara de responsabilidades,
permitindo fácil manutenção e evolução.

O banco de dados foi projetado seguindo:
- Normalização até 3FN
- Soft delete (`deletedAt`)
- Auditoria (`createdAt`, `updatedAt`)
- Índices em campos críticos
- Migrations versionadas com Prisma

---

## 🐘 Banco de Dados (Desenvolvimento Local)

### Serviços utilizados
- PostgreSQL (container Docker)
- pgAdmin (opcional)

### Subir os containers

docker compose up -d

### Acesso

PostgreSQL: localhost:5432

pgAdmin: http://localhost:5050

Credenciais do banco

Usuário: developer

Senha: dev_password_123

Database: project_db

### Prisma ORM

Validar schema:
npx prisma validate

### Criar e aplicar migrations
npx prisma migrate dev --name init_database

### Abrir Prisma Studio
npx prisma studio

###  Como executar o projeto
Pré-requisitos:
Node.js 24.12.0 (LTS)
npm
Docker + Docker Compose

### Instalação
npm install

### Executar em modo desenvolvimento
npm run dev

### Aplicação disponível em
http://localhost:3000