# Brett's Blog

Personal blog site for Brett Beutell (@brettimus), a fullstack TypeScript software engineer writing about AI and web development.

## Tech Stack

- **Framework**: Astro
- **Deployment**: Cloudflare Workers
- **Domain**: blog.boots.lol (pending configuration)

## Project Structure

```
src/
├── components/     # Astro components (Header, Footer, etc.)
├── content/blog/   # Markdown/MDX blog posts
├── layouts/        # Page layouts (BlogPost)
├── pages/          # Route pages
├── styles/         # Global CSS
└── assets/         # Images and static assets
docs/
└── DESIGN_SYSTEM.md  # Design language reference
```

## Development

This is a **bun** project. Always prefer `bun` over `npm`/`node`.

```bash
bun run dev      # Start dev server
bun run build    # Build for production
bun run preview  # Preview production build
```

## Content

Blog posts go in `src/content/blog/` as `.md` or `.mdx` files with frontmatter:

```md
---
title: "Post Title"
description: "Brief description"
pubDate: "Dec 13 2024"
heroImage: "/blog-placeholder.jpg"
---
```

## Design System

See [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) for the complete design language:
- Mid-century Scandinavian aesthetic
- Color palette: warm cream, burnt sienna, muted teal
- Typography: Fraunces (headings), Source Serif 4 (body), JetBrains Mono (code)

## Social Links

- Twitter: [@lastgoodhandle](https://twitter.com/lastgoodhandle)
- GitHub: [@brettimus](https://github.com/brettimus)

## Visual Inspection (for Claude)

Use Playwright screenshots to verify visual changes. The dev server must be running (`bun run dev`).

### Quick Usage

```bash
# Screenshot homepage and blog
bun run screenshot / /blog

# Screenshot specific route
bun run screenshot /blog/markdown-style-guide

# Screenshot all main routes with mobile viewport
bun run screenshot --all --mobile
```

### Slash Command

Use `/screenshot [routes]` to capture and inspect pages:
- `/screenshot` - Captures homepage and /blog
- `/screenshot /about` - Captures specific route
- `/screenshot --all --mobile` - All routes, desktop + mobile

### When to Use

- After making CSS/layout changes
- After modifying components that affect multiple pages
- To verify responsive design (use `--mobile` flag)
- Before completing design-related tasks

### How It Works

1. Auto-detects the running Astro dev server port
2. Captures full-page screenshots to `/tmp/screenshots/`
3. Read the output PNG files to visually verify changes

The script looks for "blog.boots.lol" or "Brett Beutell" in the HTML to find the correct dev server among multiple running servers.
