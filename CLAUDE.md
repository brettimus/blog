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
```

## Development

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
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

## Social Links

- Twitter: [@lastgoodhandle](https://twitter.com/lastgoodhandle)
- GitHub: [@brettimus](https://github.com/brettimus)
