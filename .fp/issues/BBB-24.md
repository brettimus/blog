---
id: 8cd63ce7-ff81-4d2b-8ee1-af99adf72bf3
short_id: BBB-24
title: Change dev port to something bootsy
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
created_at: 2025-12-13T11:52:55.570Z
updated_at: 2025-12-13T12:03:19.218Z
---

Change the default Astro dev server port from 4321 to something more memorable and 'boots'-themed.

Constraints:
- Avoid common defaults: 3000, 4321, 5173, 5432, 8080, etc.
- Should be easy to remember
- Ideally relates to 'boots' somehow

Ideas:
- 8007 (BOOT upside down on calculator)
- 2007 (boot-ish?)
- Pick something fun

Files:
- apps/blog/astro.config.mjs (add server.port config)

Done:
- Dev server runs on new port
- Port is memorable and unique