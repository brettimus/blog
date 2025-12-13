---
id: 60629539-8b9f-4ea1-a743-4604bcde08bf
short_id: BBB-15
title: Move blog docs to apps/blog/docs
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
created_at: 2025-12-13T09:33:59.862Z
updated_at: 2025-12-13T09:51:16.902Z
---

Relocate blog-specific documentation:

What:
- Move docs/ folder to apps/blog/docs/
- This includes DESIGN_SYSTEM.md and any other blog-specific docs
- Keep blog documentation with the blog app

Files:
- apps/blog/docs/DESIGN_SYSTEM.md (moved)

Done:
- Blog-specific docs live in apps/blog/docs/
- Links in any markdown files are updated