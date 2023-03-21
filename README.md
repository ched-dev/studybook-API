# Studybook API

> An API for studying terms, topics, and questions

[studybook-app.firebaseapp.com/](https://studybook-app.firebaseapp.com/)

# API Endpoints

## Authentication

Authentication is only required for write actions.

`POST` requests require `Authorization: Bearer github_access_token`

`GET /auth/login`

`POST /auth/token`  requires `code` in body

`GET /auth/validate` Requires `Authorization: Bearer github_access_token`

## Terms

`GET /terms`
```
[
  {
    "id": 1,
    "name": "Abstraction"
  },
  ...
]
```

`GET /terms/1`
```
{
  "id": 1,
  "name": "Abstraction"
}
```

`GET /terms/1/topics`
```
[
  {
    "id": 13,
    "name": "Design Patterns"
  },
  ...
]
```

## Topics

`GET /topics`
```
[
  {
    "id": 1,
    "name": "AJAX"
  },
  ...
]
```

`GET /topics/1`
```
{
  "id": 1,
  "name": "AJAX"
}
```

`GET /topics/1/terms`
```
[
  {
    "id": 1,
    "name": "Abstraction"
  },
  ...
]
```

## Questions

`GET /questions`
```
[
  {
    "id": 1,
    "title": "What is the difference between Git and Github?",
    "answer": "Git is a Source Control system while Github is a hosting platform for Git repositories. Github has features like Forks, Pull Requests, and Issues."
  },
  ...
]
```

`GET /questions/1`
```
{
  "id": 1,
  "title": "What is the difference between Git and Github?",
  "answer": "Git is a Source Control system while Github is a hosting platform for Git repositories. Github has features like Forks, Pull Requests, and Issues."
}
```

`GET /questions/1/terms`
```
[
  {
    "id": 10,
    "name": "Github"
  },
  ...
]
```

`GET /questions/1/topics`
```
[
  {
    "id": 10,
    "name": "Git & Github"
  },
  ...
]
```

# Dev Setup

Create an `.env` file with the following info:

```
DATABASE_URL=postgres://postgres:@localhost:5432/studybook
PRODUCTION_DATABASE_URL=postgres://.../studybook
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

## Hosting: ...

This app is hosted on ...

# Backup

A backup will save all tables from the `production` environment

```
npm run backup
```

Files output to `backups/*.json`
