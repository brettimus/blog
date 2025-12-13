---
id: 33f3c551-302b-4147-b0cf-f66605801cf6
short_id: BBB-32
title: Fix page titles in HTML head
status: done
parent: null
branch: ""
range:
  base:
    _tag: git
    sha: 8f36f96db75ecab51ed12a31e3ec38b3170c5e0c
  tip:
    _tag: git
    sha: ec4fe8d67cdca02bed9d1f01d34255a8bdc84f78
created_at: 2025-12-13T15:33:09.832Z
updated_at: 2025-12-13T15:36:27.478Z
---

Page title is always 'blog.boots.lol' - should be dynamic based on the page content (e.g., post title for blog posts, 'About' for about page, etc.)