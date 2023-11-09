# Faculty Activity Tracker (FAT)

FAT is a dashboard-driven app to be used by the faculty and merit committee of Northeastern College of Arts, Media and Design (CAMD) at Northeastern University to log and view their extra curricular activities. Faculty members report their extra curricular involvement through their view of the app, and merit committee reviews and scores all submissions through their dashboard.

## Features

- [Next.js](https://nextjs.org) - Web development framework
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Prisma](https://www.prisma.io/) - ORM
- [PostgreSQL](https://www.postgresql.org/) - Database

## Project structure

```
.
├── prisma
│   └── schema.prisma
├── public
│   └── media/
├── src
│   ├── client/
│   ├── components/
│   ├── middleware.ts
│   ├── models/
│   ├── pages/
│   ├── services/
│   ├── shared/
│   ├── store/
│   └── styles/
```

- `prisma/` - Prisma-related files, including schemas and seed scripts.
- `public/`- Static content, including any images used in app.
- `src/`
  - `client/` - Functions for making calls to API.
  - `components/` - React components used in the frontend pages.
  - `middleware.ts` - Middleware for authentication (protecting routes).
  - `models/` - Type definitions for models, dtos, and any other necessary types.
  - `pages/` - Contains all pages/routes for both frontend and backend (uses the [Pages Router](https://nextjs.org/docs/pages)).
  - `services/` - Functions for interacting with Prisma/database.
  - `shared/` - Various shared items, including components and utils.
  - `store/` - [Redux](https://redux.js.org/) store logic.
  - `styles/` - Any necessary stylesheets.

## Running Locally

Before you start you will need the following:

- [Node.js](https://nodejs.org/en)
- [Docker](https://www.docker.com/)

1. Clone the repo.

```bash
git clone git@github.com:sandboxnu/faculty-activity-tracker.git
cd faculty-activity-tracker
```

2. Install the necessary dependencies.

```bash
npm install
```

3. Configure the `.env` file by following the template in `.env.example`. See [Setting up the environment](#setting-up-the-environment).

4. Run the docker container.

```bash
docker compose up -d
```

> **Note:** The `docker-compose.yml` file sets the `POSTGRES_USER` as "sandbox", `POSTGRES_PASSWORD` as "chongus", and `POSTGRES_DB` as "fat" by default.

5. Sync your database.

```bash
npx prisma migrate dev
```

6. Run the application.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the results!

### Setting up the environment

1. Create a new file called `.env` or copy the `.env.example` and rename it to `.env`.

```bash
cp .env.example .env
```

2. Complete the file to add your environment variables.

```env
DATABASE_URL="postgresql://sandbox:chongus@localhost:5432/fat?schema=public"

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

NEXTAUTH_SECRET=
```

To generate `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`, see [Setting up OAuth 2.0](https://support.google.com/cloud/answer/6158849?hl=en). To generate a new `NEXTAUTH_SECRET`, run the following command in your terminal and add it to the `.env` file.

```bash
openssl rand -base64 32
```
