---
id: 41a5c6a6-51f8-4f7a-aea9-753dd43b7ca4
short_id: BBB-5
title: Install and configure Shiki for syntax highlighting
status: done
parent: BBB-1
branch: ""
range:
  base:
    _tag: git
    sha: 613ae7fdde3666aa1e4efb822fba36177a4a8daf
  tip:
    _tag: git
    sha: 701c853409631d2704576235f7ae407dbf4ee8b6
created_at: 2025-12-13T08:24:20.005Z
updated_at: 2025-12-13T08:30:48.684Z
---

Set up Shiki for code syntax highlighting in blog posts.

Astro has built-in Shiki support. Steps:
1. Configure shiki in astro.config.mjs
2. Choose a theme (dracula, github-dark, nord, etc.)
3. Test with a code block in a blog post

Reference: https://docs.astro.build/en/guides/syntax-highlighting/

Files:
- astro.config.mjs