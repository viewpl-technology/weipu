# Weipu 2.0

Source code of viewpl.com/viewp.com.au started from: [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, set up your environment:

1. Create a Supabase account and project at [https://supabase.io](https://supabase.io)
2. Copy `.env.example` to `.env` and fill in your Supabase credentials
3. Install dependencies:

```bash
npm install
# or
yarn install
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Authentication

This project uses Supabase for authentication. The authentication system works without server APIs, making it compatible with static site hosting on GitHub Pages.

### Configuring Supabase

1. Create a new project on Supabase
2. Navigate to Authentication > Settings and make sure Email auth is enabled
3. Copy your project URL and anon key from the API section
4. Update `.env` file with these values

### Authentication Features

- User signup with email and password
- User signin with email and password
- Protected routes for authenticated users (dashboard)
- User session persistence

## Building for GitHub Pages

To build the project for GitHub Pages deployment:

```bash
npm run build
# or
yarn build
```

This will create a static export in the `out` directory, which can be deployed to GitHub Pages.

### Environment Variables for GitHub Pages

Since GitHub Pages hosts static files, we inject environment variables at build time:

1. Make sure all environment variables in `.env` that need to be available in the client start with `NEXT_PUBLIC_`
2. The build process will create a `public/env-config.js` file with these variables
3. This file will be included in the HTML and make the variables available via `window.ENV`

## Conventional Commits

Please follow conventional commits for this repository.

> The commit contains the following structural elements, to communicate intent to the consumers of your library:
> fix: a commit of the type fix patches a bug in your codebase (this correlates with PATCH in Semantic Versioning).
> feat: a commit of the type feat introduces a new feature to the codebase (this correlates with MINOR in Semantic Versioning).
> BREAKING CHANGE: a commit that has a footer BREAKING CHANGE:, or appends a ! after the type/scope, introduces a breaking API change (correlating with MAJOR in Semantic Versioning). A BREAKING CHANGE can be part of commits of any type.
> types other than fix: and feat: are allowed, for example @commitlint/config-conventional (based on the Angular convention) recommends build:, chore:, ci:, docs:, style:, refactor:, perf:, test:, and others.
> footers other than BREAKING CHANGE: <description> may be provided and follow a convention similar to git trailer format.

More details: https://www.conventionalcommits.org/

## Themesberg Landwind

Thanks to https://github.com/themesberg/landwind for web page theme design

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
