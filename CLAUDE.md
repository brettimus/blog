# Brett's Monorepo

Bun monorepo for Brett Beutell's projects.

## Structure

```
.
├── apps/           # Deployable applications
│   └── blog/       # Personal blog (blog.boots.lol)
├── packages/       # Shared packages
├── .claude/        # Claude Code commands
└── .fp/            # Fiberplane issue tracking
```

## Development

```bash
bun install        # Install all dependencies
bun run dev        # Run blog dev server
bun run build      # Build blog for production
```

## Apps

Applications live in `apps/`. Each app is independently deployable.

### Blog (`apps/blog/`)

Personal blog for Brett Beutell (@brettimus). Fullstack TypeScript, AI, and web development.

**Tech Stack**: Astro, Cloudflare Workers, blog.boots.lol

**Social**: [@lastgoodhandle](https://twitter.com/lastgoodhandle) / [@brettimus](https://github.com/brettimus)

```bash
bun --cwd apps/blog run dev      # Start dev server
bun --cwd apps/blog run build    # Build for production
bun --cwd apps/blog run deploy   # Deploy to Cloudflare
```

#### Blog Structure

```
apps/blog/
├── src/
│   ├── components/     # Astro components (Header, Footer, etc.)
│   ├── content/blog/   # Markdown/MDX blog posts
│   ├── layouts/        # Page layouts (BlogPost)
│   ├── pages/          # Route pages
│   ├── styles/         # Global CSS
│   └── assets/         # Images and static assets
├── docs/
│   └── DESIGN_SYSTEM.md  # Design language reference
├── public/             # Static files served as-is
└── scripts/            # Utility scripts (screenshot.ts)
```

#### Writing Blog Posts

Posts go in `src/content/blog/` as `.md` or `.mdx` files:

```md
---
title: "Post Title"
description: "Brief description"
pubDate: "Dec 13 2024"
heroImage: "/blog-placeholder.jpg"
draft: true
---
```

Set `draft: true` to hide from production. Drafts are visible in dev but excluded from builds.

#### Design System

See [apps/blog/docs/DESIGN_SYSTEM.md](apps/blog/docs/DESIGN_SYSTEM.md):
- Mid-century Scandinavian aesthetic
- Colors: warm cream, burnt sienna, muted teal
- Fonts: Fraunces (headings), Source Serif 4 (body), JetBrains Mono (code)

#### Visual Inspection

Use `/screenshot [routes]` to capture pages (dev server must be running):
- `/screenshot` - Homepage and /blog
- `/screenshot /about` - Specific route
- `/screenshot --all --mobile` - All routes with mobile

## Adding a New App

1. Create the app directory:
   ```bash
   mkdir apps/my-app
   cd apps/my-app
   ```

2. Initialize with a `package.json`:
   ```json
   {
     "name": "my-app",
     "private": true,
     "scripts": {
       "dev": "...",
       "build": "...",
       "lint": "biome lint .",
       "format": "biome format . --write"
     }
   }
   ```

3. Set up Biome for linting/formatting:
   ```bash
   bun add -d @biomejs/biome
   ```

4. Create `biome.json`:
   ```json
   {
     "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
     "organizeImports": { "enabled": true },
     "linter": { "enabled": true },
     "formatter": { "enabled": true }
   }
   ```

5. Create app-specific `CLAUDE.md` with instructions for working on that app.

6. Run `bun install` from monorepo root.

## Adding a New Package

1. Create the package directory:
   ```bash
   mkdir packages/my-package
   cd packages/my-package
   ```

2. Initialize with a `package.json`:
   ```json
   {
     "name": "@brett/my-package",
     "version": "0.0.1",
     "main": "src/index.ts",
     "types": "src/index.ts",
     "scripts": {
       "lint": "biome lint .",
       "format": "biome format . --write"
     }
   }
   ```

3. Set up Biome (same as apps).

4. Run `bun install` from monorepo root.

5. Use in apps:
   ```bash
   # In an app's directory
   bun add @brett/my-package
   ```

## Deployment

Uses direnv for per-project Cloudflare credentials. This avoids needing to switch between `wrangler login` sessions for personal vs work accounts.

### Setup (first time)

1. Install direnv: `brew install direnv`
2. Add shell hook to ~/.zshrc: `eval "$(direnv hook zsh)"`
3. Copy `.envrc.example` to `.envrc`
4. Fill in your Cloudflare API token and account ID
5. Run `direnv allow`

### Deploy

```bash
bun --cwd apps/blog run deploy  # Deploys blog to Cloudflare
```

Wrangler automatically uses `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` from the environment.

## Standards

### Required for New Apps/Packages

- **Biome** for linting and formatting (unless app framework specifies otherwise)
- **Scripts**: Must include `bun lint` and `bun format`
- **CLAUDE.md**: Apps should have their own CLAUDE.md with app-specific instructions

### Conventions

- Apps in `apps/` are deployable applications
- Packages in `packages/` are shared libraries
- Use `@brett/` namespace for internal packages
- Each app manages its own deployment config
