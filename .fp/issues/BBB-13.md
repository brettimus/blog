---
id: "5e2932d5-151d-45d9-99e5-8d9de0bf81f4"
short_id: BBB-13
title: Set up Bun workspace structure
status: done
parent: "898ce015-c8c3-4fdb-8421-2931e949aa01"
dependencies: []
branch: ""
revisions: null
created_at: "2025-12-13T09:33:36.061Z"
updated_at: "2025-12-13T09:50:14.059Z"
---

Create the foundational monorepo structure:

What:
- Create apps/ and packages/ directories
- Move existing blog code to apps/blog/
- Create root package.json with bun workspaces config
- Create root bun.lockb (regenerate from workspace)

Files:
- package.json (root - new)
- apps/blog/* (moved from root)

Done:
- Blog code is in apps/blog/
- Root package.json has workspaces: ['apps/*', 'packages/*']
- bun install works from root
