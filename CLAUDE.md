# CLAUDE.md - Hive.io Repository

## Project Overview

Hive.io is an informational website for the Hive blockchain ecosystem. It serves as a central hub showcasing:
- Hive ecosystem applications and dApps (games, social, NFTs, DeFi, etc.)
- Contributors and core developers
- Blockchain statistics and analytics
- Wallets, exchanges, and block explorers
- Educational content about Hive

The site is built as a static export for CDN hosting with multi-language support.

## Tech Stack

**Frontend:**
- Next.js 16.0.7 with React 19.2.0
- TypeScript 5 (strict mode)
- Tailwind CSS 4.1.17
- Radix UI + shadcn/ui (New York style)
- Zustand 5.0.8 (state management)
- next-intl 4.5.1 (internationalization)
- next-pwa 5.6.0

**Hive Libraries:**
- @hiveio/hive-lib (custom blockchain interaction library)
- @hiveio/auth-components (authentication UI)
- @hiveio/wax, @hiveio/wax-signers-keychain, @hiveio/wax-api-jsonrpc
- @hiveio/dhive

**Package Manager:** pnpm with workspaces

## Directory Structure

```
hive-io/
├── apps/
│   └── web/                      # Main Next.js application
│       ├── src/
│       │   ├── app/[locale]/     # Next.js app router with i18n
│       │   ├── components/       # React components (22 subdirectories)
│       │   │   ├── ui/           # shadcn/ui base components
│       │   │   ├── ecosystem/    # App showcase cards
│       │   │   ├── contributors/ # Contributor profiles
│       │   │   └── join/         # Auth/login flows
│       │   ├── lib/data/         # Data files (ecosystem, contributors, etc.)
│       │   ├── hooks/            # Custom hooks (useBlockchainActivity, useTVL, etc.)
│       │   ├── store/            # Zustand stores
│       │   ├── types/            # TypeScript interfaces
│       │   └── i18n/             # Internationalization config
│       ├── public/               # Static assets (images, favicons, messages)
│       └── scripts/post-build.js # Static export setup
├── packages/
│   ├── hive-lib/                 # Blockchain interaction library
│   │   └── src/engine/           # Hive Engine modules
│   └── auth-components/          # Authentication UI library
├── .gitlab-ci.yml
├── pnpm-workspace.yaml
└── package.json
```

## Development Commands

```bash
pnpm install          # Install dependencies
pnpm dev              # Start development server (Turbopack)
pnpm build            # Build for production (static export)
pnpm start            # Start production server
pnpm lint             # Run ESLint
```

## Key Files

**Configuration:**
- `apps/web/next.config.ts` - Next.js config (static export, i18n)
- `apps/web/tsconfig.json` - TypeScript config (strict, path aliases)
- `apps/web/components.json` - shadcn/ui configuration
- `apps/web/eslint.config.mjs` - ESLint rules
- `.prettierrc` - Code formatting (no semicolons, single quotes)

**Entry Points:**
- `apps/web/src/app/layout.tsx` - Root layout
- `apps/web/src/app/[locale]/page.tsx` - Main page
- `apps/web/src/lib/auth.tsx` - Auth context provider
- `apps/web/src/store/useMainStore.ts` - Global state

**Data Files (in `apps/web/src/lib/data/`):**
- `ecosystem.ts` - Registry of ~60+ Hive apps
- `contributors.ts` - Core developers and contributors
- `wallets.ts`, `exchanges.ts`, `blockexplorers.ts` - External integrations
- `navigation.ts` - Site navigation structure

## Coding Conventions

**Formatting (Prettier):**
- No semicolons
- Single quotes
- No bracket spacing (`{a}` not `{ a }`)
- 2-space indentation
- 80 character line width

**TypeScript:**
- Strict mode enabled
- Path alias: `@/*` → `./src/*`
- Interface-based design for data structures

**Component Patterns:**
- Functional components with React 19
- Custom hooks for blockchain data fetching
- Zustand for global state management
- shadcn/ui for base UI primitives
- Tailwind for styling

**Authentication:**
- Auth context provider pattern
- Cookie-based session persistence
- Supports Hive Keychain and Hive Auth protocols

## CI/CD Notes

**GitLab CI Pipeline (`.gitlab-ci.yml`):**

**Build Stage:**
- Node 24 image with pnpm
- Frozen lockfile enforcement
- Static export artifact

**Staging Deployment:**
- Triggers on `develop` branch
- AWS S3 sync → CloudFront invalidation

**Production Deployment:**
- Triggers on `master` branch
- AWS S3 with 30-day cache control → CloudFront invalidation

**Branch Strategy:**
- `master` - Production (protected)
- `develop` - Staging (protected)
- Feature branches → PR to develop first

**Caching:**
- .pnpm-store/
- apps/web/node_modules/
- apps/web/.next/
