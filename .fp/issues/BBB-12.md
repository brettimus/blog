---
id: "898ce015-c8c3-4fdb-8421-2931e949aa01"
short_id: BBB-12
title: Convert to Bun monorepo
status: done
parent: null
dependencies: []
branch: ""
revisions: null
created_at: "2025-12-13T09:33:26.218Z"
updated_at: "2025-12-13T09:52:50.090Z"
---

Convert this repository into a Bun monorepo structure where the blog is one of multiple apps.

Goals:
- Support multiple applications in apps/ directory
- Support shared packages in packages/ directory
- Blog becomes apps/blog
- Use Bun workspaces for dependency management

Technical approach:
- Use bun workspace feature with root package.json
- Move existing blog code to apps/blog/
- Use Biome for linting/formatting in new packages
- Standard scripts: bun format, bun lint

Success criteria:
- Blog still builds and deploys correctly from apps/blog
- Can add new apps easily following documented patterns
- Can add new packages easily following documented patterns
- CLAUDE.md updated with monorepo instructions
