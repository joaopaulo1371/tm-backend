<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Um framework progressivo em <a href="http://nodejs.org" target="_blank">Node.js</a> para construir aplicações de servidor eficientes e escaláveis.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Descrição

[Nest](https://github.com/nestjs/nest) — repositório inicial em TypeScript para aplicações Node.js usando o framework Nest.

## Configuração do projeto

Instale as dependências:

```bash
$ npm install
```

## Compilar e executar o projeto

```bash
# desenvolvimento
$ npm run start

# modo observação (watch)
$ npm run start:dev

# modo produção
$ npm run start:prod
```

## Executar testes

```bash
# testes unitários
$ npm run test

# testes end-to-end
$ npm run test:e2e

# cobertura de testes
$ npm run test:cov
```

## Implantação

Ao preparar a aplicação NestJS para produção, há passos importantes para rodá-la de forma eficiente. Consulte a [documentação de implantação](https://docs.nestjs.com/deployment) para mais detalhes.

Se deseja uma plataforma em nuvem para implantar rapidamente sua aplicação NestJS, confira o [Mau](https://mau.nestjs.com), a plataforma oficial para deploy no AWS. Com o Mau você pode implantar com poucos passos:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

## Recursos

Alguns links úteis para trabalhar com NestJS:

- Visite a [Documentação do NestJS](https://docs.nestjs.com) para aprender mais sobre o framework.
- Para dúvidas e suporte, acesse nosso canal no [Discord](https://discord.gg/G7Qnnhy).
- Para cursos e conteúdo oficial, veja os [cursos NestJS](https://courses.nestjs.com/).
- Faça deploy na AWS usando o [NestJS Mau](https://mau.nestjs.com).
- Visualize o grafo da aplicação e interaja em tempo real com o [NestJS Devtools](https://devtools.nestjs.com).
- Procura por suporte profissional? Veja o [enterprise support](https://enterprise.nestjs.com).
- Para novidades siga-nos em [X](https://x.com/nestframework) e [LinkedIn](https://linkedin.com/company/nestjs).
- Vagas e oportunidades: [Jobs board](https://jobs.nestjs.com).

## Executando PostgreSQL (desenvolvimento)

Se você utiliza o arquivo `.env` com os valores abaixo, a aplicação espera um servidor PostgreSQL acessível no host/porta configurados:

```
NODE_ENV=development
PORT=3000

# Configurações do Banco PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=123456
DB_NAME=tm_crm
```

Existem algumas formas recomendadas de rodar o Postgres localmente para desenvolvimento:

Opção A — Docker Compose (recomendado): crie um arquivo `docker-compose.yml` ao lado deste projeto e execute `docker compose up -d`.

```yaml
version: '3.8'
services:
  db:
    image: postgres:15
    restart: unless-stopped
    env_file:
      - .env
    environment:
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASS}
    ports:
      - "${DB_PORT}:5432"
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
```

Esse `docker-compose.yml` irá ler `DB_NAME`, `DB_USER`, `DB_PASS` e `DB_PORT` do arquivo `.env`.

Opção B — Docker (container único):

```bash
docker run --name tm-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=123456 \
  -e POSTGRES_DB=tm_crm \
  -p 5432:5432 \
  -v tm_pgdata:/var/lib/postgresql/data \
  -d postgres:15
```

Opção C — PostgreSQL instalado localmente: crie o usuário e o banco via `psql`:

```bash
# como superusuário postgres
psql -U postgres -h localhost -c "CREATE USER postgres WITH PASSWORD '123456';"
psql -U postgres -h localhost -c "CREATE DATABASE tm_crm OWNER postgres;"
# (ajuste usuário/senha conforme necessário)
```

Depois que o banco estiver rodando, verifique se os valores em `.env` batem com a configuração do servidor e então inicie o backend:

```bash
npm run start:dev
```

Se o projeto exige criação automática de tabelas/migrações, execute os scripts de migração ou seed (veja `populate-db.js` / `test-db.js` no repositório).

## Suporte

O Nest é um projeto open source licenciado sob MIT. Ele cresce graças ao suporte de patrocinadores e contribuintes. Se quiser apoiar, leia mais em [docs.nestjs.com/support](https://docs.nestjs.com/support).

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Running PostgreSQL (development)

If you use the provided `.env` (example below) the application expects a PostgreSQL server reachable at the configured host/port:

```
NODE_ENV=development
PORT=3000

# Configurações do Banco PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=123456
DB_NAME=tm_crm
```

You can run Postgres locally for development in a few ways.

Option A — Docker Compose (recommended): create a `docker-compose.yml` next to this project and run `docker compose up -d`.

```yaml
version: '3.8'
services:
  db:
    image: postgres:15
    restart: unless-stopped
    env_file:
      - .env
    environment:
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASS}
    ports:
      - "${DB_PORT}:5432"
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
```

This will read `DB_NAME`, `DB_USER`, `DB_PASS` and `DB_PORT` from the `.env` file.

Option B — Docker (single container):

```bash
docker run --name tm-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=123456 \
  -e POSTGRES_DB=tm_crm \
  -p 5432:5432 \
  -v tm_pgdata:/var/lib/postgresql/data \
  -d postgres:15
```

Option C — Local system PostgreSQL: create user and database via `psql`:

```bash
# as the postgres superuser
psql -U postgres -h localhost -c "CREATE USER postgres WITH PASSWORD '123456';"
psql -U postgres -h localhost -c "CREATE DATABASE tm_crm OWNER postgres;"
# (adjust user/password as needed)
```

After the database is running, ensure your `.env` values match the DB server and then start the backend:

```bash
npm run start:dev
```

If you need the application to automatically create/migrate tables, run your project's migration or seed script (see `populate-db.js` / `test-db.js` in the repo).


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

