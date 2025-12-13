---
id: 7c2343c4-3a63-420b-9ca2-1c843cf4b288
short_id: BBB-3
title: Wire up social links in nav
status: done
parent: BBB-1
branch: ""
range:
  base:
    _tag: git
    sha: df5fd179cca31d2b591aa83c33275b56c2683312
  tip:
    _tag: git
    sha: 613ae7fdde3666aa1e4efb822fba36177a4a8daf
created_at: 2025-12-13T08:24:16.543Z
updated_at: 2025-12-13T08:30:19.720Z
---

Replace boilerplate Astro social links with Brett's personal accounts:
- Twitter: @lastgoodhandle (https://twitter.com/lastgoodhandle)
- GitHub: @brettimus (https://github.com/brettimus)

Files to modify:
- src/components/Header.astro (update href and sr-only text)

Optional: Remove Mastodon link or replace with another platform.