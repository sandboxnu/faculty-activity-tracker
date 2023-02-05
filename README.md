## Installation

```bash
yarn install
```

## Running the app

```bash
# start database with docker
yarn dev:db:up

# start development server
yarn dev
```

### Starting the app for the first time

[ TODO ]

## Database

```bash
# start database with docker
yarn dev:db:up

# stop database with docker
yarn dev:db:down
```

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

- `prisma/` - prisma-related files, including schemas and seed scripts
- `public/`- static content, including any images used in app
- `src/`
  - `client/` - functions for making calls to API
  - `components/` - React components used in the frontend pages
  - `middleware.ts` - middleware for authentication (protecting routes)
  - `models/` - type definitions for models, dtos, and any other necessary types
  - `pages/` - contains all pages/routes for both frontend and backend (more details explained below)
  - `services/` - functions for interacting with prisma/database
  - `shared/` - various shared items, including components (e.g. Navbar) and utils
  - `store/` - redux store logic
  - `styles/` - any necessary stylesheets

### Pages

In NextJS apps, pages within the `pages/` directory are automatically connected to url routes. Each page is associated with a route based on its file name. Additionally, folders correspond to url paths. Some examples include:

- `pages/index.tsx` is found at `/`
- `pages/dashboard.tsx` is found at `/dashboard`
- `pages/submissions/index.tsx` is found at `/submissions`
- `pages/submissions/new.tsx` is found at `/submissions/new`

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as **API routes** instead of React pages. For more details, reference the NextJS documentation on [API routes](https://nextjs.org/docs/api-routes/introduction).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
