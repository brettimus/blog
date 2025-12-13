---
id: 66540381-e93f-4c16-a287-6db3873b4224
short_id: BBB-17
title: Rewrite root CLAUDE.md for monorepo
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
created_at: 2025-12-13T09:34:03.607Z
updated_at: 2025-12-13T09:52:42.189Z
---

Update root CLAUDE.md with monorepo instructions:

What:
- Update to describe Bun monorepo structure
- Document apps/ and packages/ conventions
- Add instructions for creating new apps/packages
- Specify Biome usage for new packages
- Require bun format and bun lint scripts in new packages
- Point to apps/blog/CLAUDE.md for blog-specific work

Content:
- Monorepo overview
- Directory structure (apps/, packages/)
- How to add a new app
- How to add a new package
- Biome configuration
- Required scripts (bun format, bun lint)
- Reference to app-specific CLAUDE.md files

Done:
- CLAUDE.md accurately describes monorepo
- Instructions for adding apps/packages are clear
- Biome requirement is documented