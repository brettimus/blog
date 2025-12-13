---
id: 765f0c43-cb72-40bf-9f26-c29f056bc4b7
short_id: BBB-22
title: Remove Astro placeholder posts
status: done
parent: BBB-20
branch: ""
range:
  base:
    _tag: git
    sha: dc7cae682cd97bfc4deda534efb58125d71deaa9
  tip:
    _tag: git
    sha: dc7cae682cd97bfc4deda534efb58125d71deaa9
created_at: 2025-12-13T11:52:51.638Z
updated_at: 2025-12-13T12:00:57.104Z
---

Remove the two default Astro blog posts that are just documentation/examples.

Files to remove:
- apps/blog/src/content/blog/markdown-style-guide.md
- apps/blog/src/content/blog/using-mdx.mdx

Done:
- No placeholder content on the blog
- Blog index shows only real posts (or empty state)