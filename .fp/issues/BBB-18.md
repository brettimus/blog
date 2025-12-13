---
id: 501750ae-4579-4cd9-ae2c-9745e258a6aa
short_id: BBB-18
title: Verify blog builds and deploys correctly
status: done
parent: BBB-12
branch: ""
range:
  base: &a1
    _tag: git
    sha: 6b7bd73ce5b886eb132a9db8d1105b5f1e0ff526
  tip: *a1
created_at: 2025-12-13T09:34:11.425Z
updated_at: 2025-12-13T09:51:26.573Z
---

Verify the blog still works after restructuring:

What:
- Run bun install from root
- Run bun run dev from apps/blog
- Run bun run build from apps/blog
- Verify Cloudflare deployment config still works

Done:
- Blog builds without errors
- Dev server runs correctly
- Deployment configuration is valid