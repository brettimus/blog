---
id: fb84219f-5c6a-42b8-8302-498998a96251
short_id: BBB-6
title: Remove boilerplate content, preserve Astro docs
status: in-progress
parent: BBB-1
branch: ""
range:
  base: &a1
    _tag: git
    sha: 7b713dc51ceca785224556374da52b7eb6b78143
  tip: *a1
created_at: 2025-12-13T08:24:21.660Z
updated_at: 2025-12-13T08:34:30.531Z
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