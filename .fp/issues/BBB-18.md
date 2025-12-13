---
id: 501750ae-4579-4cd9-ae2c-9745e258a6aa
short_id: BBB-18
title: Verify blog builds and deploys correctly
status: todo
parent: BBB-12
branch: ""
range: null
created_at: 2025-12-13T09:34:11.425Z
updated_at: 2025-12-13T09:34:11.425Z
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