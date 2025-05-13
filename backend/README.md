# Backend

The REST _-ish_ backend for Bugberus.

## Installation

Within the `/backend` directory, run the following command:

```bash
npm install
```

## Setting up the environment variables

Before we begin, we will need some environment variables similar to the following:

```.env
SECRET="seduce panning detest art sapling scuff french"
DATABASE_URL="postgresql://user:password@host:5432/dbname?"
```

- Description for each one:
  - **`SECRET`**: a relatively long set of random words used to compute the hash.
  - **`DATABASE_URL`**: A PostgreSQL connection string URI.

## Syncing Prisma ORM with local database

We will need to apply the Prisma schema into the local database:

```bash
npx prisma db push
```

## Running

At this stage, it should run:

```bash
npm run dev
```
