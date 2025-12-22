---
id: fb84219f-5c6a-42b8-8302-498998a96251
short_id: BBB-6
title: Remove boilerplate content, preserve Astro docs
status: done
parent: "5de63065-835b-45b0-9107-71103b811509"
dependencies: []
branch: ""
revisions: null
created_at: "2025-12-13T08:24:21.660Z"
updated_at: "2025-12-13T08:35:39.155Z"
---

Clean up starter template content while preserving useful documentation.

Remove:
- Placeholder blog posts (src/content/blog/*.md except keep one as template reference)
- Placeholder images (src/assets/blog-placeholder-*.jpg)
- Generic site title/description in src/consts.ts

Preserve:
- README.md (Astro documentation)
- Component structure and patterns for reference
- markdown-style-guide.md (useful reference for blog formatting)

Update src/consts.ts:
- SITE_TITLE: appropriate blog title
- SITE_DESCRIPTION: brief description of blog focus
