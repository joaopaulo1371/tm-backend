# TM Digital — API (Backend)

API REST construída com NestJS + TypeORM para gerenciamento de leads e propriedades rurais.

## ✅ Principais tecnologias

- Node.js + NestJS
- TypeORM
- PostgreSQL
- class-validator (validação)
- Swagger (documentação)

## Pré-requisitos

- Node.js 18+
- PostgreSQL 12+
- npm ou yarn

## Instalação

1. Clone o repositório e entre na pasta do backend:

```bash
git clone <repository-url>
cd tm/tm-backend
```

2. Crie o banco de dados (ex.: PostgreSQL):

```sql
CREATE DATABASE tm_crm;
```

3. Crie um arquivo `.env` com as variáveis necessárias (exemplo):

```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=tm_crm
```

4. Instale dependências e execute em modo desenvolvimento:

```bash
npm install
npm run start:dev
```

## Scripts úteis

- `npm run start:dev` — inicia com hot-reload
- `npm run build` — build para produção
- `npm run test` — executa testes unitários

## Endpoints principais

- `GET /api/leads` — listar leads (com filtros e paginação)
- `POST /api/leads` — criar lead
- `GET /api/leads/:id` — obter lead por ID
- `PATCH /api/leads/:id` — atualizar lead
- `DELETE /api/leads/:id` — remover lead
- `GET /api/leads/dashboard` — métricas do dashboard

- `GET /api/properties` — listar propriedades
- `POST /api/properties` — criar propriedade

> Observação: consulte o Swagger (se habilitado) em `/api/docs` para documentação completa.

## Seeds / Dados de teste

O projeto inclui seeds que populam dados de exemplo (leads, propriedades). Verifique `src/database/seeds`.

## Deploy (resumo)

1. Ajuste variáveis de ambiente para produção.
2. Execute `npm run build`.
3. Provisione PostgreSQL e configure as credenciais.
4. Faça o deploy em sua plataforma preferida (Heroku, AWS, DigitalOcean, etc.).

---

Se quiser que eu gere um `README-FRONTEND.md` e `README-BACKEND.md` separados no repositório, eu posso criar os arquivos agora.