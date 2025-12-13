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

Personal blog site. See [apps/blog/CLAUDE.md](apps/blog/CLAUDE.md) for blog-specific instructions.

```bash
bun --cwd apps/blog run dev      # Start dev server
bun --cwd apps/blog run build    # Build for production
bun --cwd apps/blog run deploy   # Deploy to Cloudflare
```

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
