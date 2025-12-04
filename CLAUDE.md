# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Weipu 2.0 is the source code for viewp.com.au - a Next.js static site with Supabase authentication. The project is configured for static export to deploy on GitHub Pages, using client-side authentication without server APIs.

## Development Commands

### Core Commands

```bash
yarn dev              # Start development server on http://localhost:3000
yarn build            # Build static export to out/ directory
yarn start            # Start production server
yarn lint             # Run ESLint
```

### Testing

```bash
yarn test             # Run Jest in watch mode
yarn test:ci          # Run Jest in CI mode (no watch)
```

To run a single test file:

```bash
yarn test <path-to-test-file>
```

### Release Management

```bash
yarn semver           # Run semantic-release locally
```

## Architecture

### Static Export Configuration

The project uses Next.js static export (`output: 'export'`) for GitHub Pages deployment. Key points:

- No API routes - all backend operations use Supabase client directly
- Environment variables are injected at build time via `env-config.js`
- The `env-config.js` script runs during webpack build to generate `public/env-config.js`
- Client code accesses env vars via `window.ENV` or `process.env`

### Authentication System

**Location:** `lib/supabase.ts`, `contexts/auth.tsx`

- Uses Supabase Auth with email/password
- AuthProvider wraps the entire app in `_app.tsx`
- Auth state management via React Context (`useAuth` hook)
- Role-based access control with admin role support
- Session persistence across page reloads

**Key Functions:**

- `signUp()`, `signIn()`, `signOut()` - Auth operations
- `getCurrentUser()` - Get current session user
- `isAdmin()` - Check if user has admin role (via app_metadata)
- `subscribeToAuthChanges()` - Listen for auth state changes

**Protected Routes:**

- Use `ProtectedRoute` component wrapper (in `components/ProtectedRoute.tsx`)
- Redirects unauthenticated users to `/auth/signin` with callback URL
- Shows loading spinner while checking auth state

### Layout System

**Location:** `pages/_app.tsx`, `components/layout.tsx`

- Pages can define custom layouts via `getLayout` method
- Three layout types:
  - Default layout (`components/layout.tsx`) - Marketing pages
  - Auth layout (`components/auth/layout.tsx`) - Authentication pages
  - Dashboard layout (`components/dashboard/layout.tsx`) - Protected dashboard pages
- Dark mode toggle component (`components/DarkSystemLight.tsx`) updates theme on mount

### Path Aliases

TypeScript path aliases are configured in `tsconfig.json`:

```typescript
"@/*": ["./*"]
```

Example usage:

```typescript
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
```

### Pages Structure

- `/` - Landing page
- `/pricing` - Pricing page
- `/auth/*` - Authentication flows (signin, signup, reset-password, callback, verify-email)
- `/blog` - Blog listing and individual posts (dynamic route `[id]`)
- `/dashboard` - Protected dashboard (requires authentication)

### Database Types

**Location:** `lib/supabase-types.ts`

Contains TypeScript types generated from Supabase schema. Regenerate when database schema changes.

### CSRF Protection

**Location:** `lib/csrf.ts`

Uses `next-csrf` for CSRF token generation. Configured with `NEXTAUTH_SECRET` environment variable.

## Commit Convention

This project follows Conventional Commits. All commits must use the format:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**

- `feat:` - New feature (MINOR version bump)
- `fix:` - Bug fix (PATCH version bump)
- `chore:` - Maintenance tasks
- `docs:` - Documentation changes
- `refactor:` - Code refactoring
- `test:` - Test additions/changes
- `style:` - Code style changes
- `perf:` - Performance improvements
- `ci:` - CI/CD changes
- `build:` - Build system changes

**Breaking changes:** Add `BREAKING CHANGE:` in footer or append `!` after type (MAJOR version bump)

Commits are validated by Husky + commitlint. Semantic versioning is automated via semantic-release.

## Testing Guidelines

- Tests are located in `__tests__/` directory
- Uses Jest with React Testing Library
- Test environment configured in `jest.config.js` and `jest.setup.js`
- Component imports use `@/` aliases (configured in jest moduleNameMapper)

## Environment Setup

1. Copy `.env.example` to `.env`
2. Create a Supabase project at https://supabase.io
3. Fill in:
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon public key
4. Enable Email auth in Supabase dashboard

## Important Notes

- Always use `NEXT_PUBLIC_` prefix for environment variables that need to be available in the browser
- Images are unoptimized (`unoptimized: true`) for static export compatibility
- The project uses Pages Router, not App Router
- Supabase operations are client-side only - no server-side API routes
- Admin role checks use both session metadata and RPC fallback for reliability
