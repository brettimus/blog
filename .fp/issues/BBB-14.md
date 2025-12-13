---
id: 99ce273d-a560-4efa-aba2-e5ec3b7ba950
short_id: BBB-14
title: Update blog paths and scripts
status: done
parent: BBB-12
branch: ""
range:
  base:
    _tag: git
    sha: 6b7bd73ce5b886eb132a9db8d1105b5f1e0ff526
  tip:
    _tag: git
    sha: 6b7bd73ce5b886eb132a9db8d1105b5f1e0ff526
created_at: 2025-12-13T09:33:43.620Z
updated_at: 2025-12-13T09:51:16.713Z
---

Update the blog app after moving to apps/blog/:

What:
- Update any relative paths in config files
- Update package.json scripts if needed
- Ensure astro.config.mjs works from new location
- Update screenshot script paths

Files:
- apps/blog/package.json
- apps/blog/astro.config.mjs
- apps/blog/scripts/screenshot.ts

Done:
- bun run dev works from apps/blog/
- bun run build produces correct output
- Screenshot script finds correct paths