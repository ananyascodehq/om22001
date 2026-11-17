# Vercel deployment

The app uses PostgreSQL for application data and a private Vercel Blob store for
uploaded documents. Local SQLite records and files are copied by the migration
script; they are not included in deployments.

## Provision services

1. Install the project dependencies with `npm install`.
2. Log in and link the project with `npx vercel login` and `npx vercel link`.
3. Add a PostgreSQL database integration (Neon is supported) and a private Blob
   store to the linked Vercel project.
4. Configure `DATABASE_URL` as the pooled PostgreSQL connection and
   `DATABASE_URL_UNPOOLED` as the direct connection, then connect the Blob
   store.
5. Pull the project environment into the local working copy with
   `npx vercel env pull .env.local`. Do not commit `.env.local`.

The document uploader remains public, matching the existing app. Anyone who can
reach it can upload allowed document types up to 50 MB; account for this when
setting storage limits and monitoring usage.

## Migrate and deploy

With the environment variables available locally:

1. Run `npm run db:deploy` to create the PostgreSQL schema.
2. Run `npm run migrate:vercel-data` to copy the local SQLite records, formula
   sheets, and referenced files from `storage/` into PostgreSQL and Blob.
   The importer refuses to write into a non-empty database.
3. Run `npm run build` to validate the production bundle.
4. Run `npx vercel --prod` to deploy.

The importer needs Python 3 and the Blob write token supplied by Vercel in the
local environment. It never writes a data export file. Keep the existing local
database and files until the deployed site has been checked.
