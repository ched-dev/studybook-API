# Studybook API

> An API for studying terms, topics, and questions

[studybook-api.vercel.app/](https://studybook-api.vercel.app/)

# API Endpoints

## Authentication

Authentication is only required for write actions.

`POST` requests require `Authorization: Bearer github_access_token`

`GET /auth/login`

`POST /auth/token`  requires `code` in body

`GET /auth/validate` Requires `Authorization: Bearer github_access_token`

# Dev Setup

Create an `.env` file with the following info:

```
DATABASE_URL=postgres://postgres:@localhost:5432/studybook
# For `npm run backup` command
PRODUCTION_DATABASE_URL=postgres://.../studybook?ssl=true
PRODUCTION_DATABASE_CA=xxxOPTIONALxxx
# for `npm run backup-db` command
DB_HOST=
DB_PORT=5432
DB_DATABASE=postgres
DB_USER=postgres
DB_PASSWORD=
# Auth support
GITHUB_CLIENT_ID=xxx
GITHUB_CLIENT_SECRET=xxx
```

Then one time install commands:

- `npm install`
- `createdb studybook`
- `npm run migrate:dev`
- `npm run seed:dev`

For support Auth, add the `GITHUB_*` keys from a Github App.
The Github App will need `read:org` scope.

# Running

- `nodemon`
- `npm start`

Runs on `http://localhost:3001`


# Deployment

## Database: Heroku

Setup your local `.env` file with the `PRODUCTION_DATABASE_URL` from your Postgres, then run:

```
npm run migrate:production
npm run seed:production
```

## Hosting: Render.com

This app is hosted on Render.com at [studybook-api.vercel.app/](https://studybook-api.vercel.app/). It will auto-deploy with commits push to main github repo.

# Backup

A backup will save all tables from the `production` environment

```
npm run backup
```

Files output to `backups/*.json`
