---
id: "8ae40d4e-39ff-453d-8fb2-c2ce44fb5273"
short_id: BBB-19
title: Update screenshot command for monorepo structure
status: done
parent: "898ce015-c8c3-4fdb-8421-2931e949aa01"
dependencies: []
branch: ""
revisions: null
created_at: "2025-12-13T09:45:57.130Z"
updated_at: "2025-12-13T09:51:17.090Z"
---

Update the /screenshot slash command and scripts for the monorepo structure.

Current state:
- .claude/commands/screenshot.md uses 'npm run screenshot'
- scripts/screenshot.ts lives at repo root
- Command assumes running from repo root

Changes needed:

1. Move script to apps/blog/scripts/screenshot.ts (covered by BBB-13)

2. Update .claude/commands/screenshot.md:
   - Change 'npm run screenshot' to 'bun run screenshot'
   - Run from apps/blog directory: 'bun --cwd apps/blog run screenshot'
   - OR move command to apps/blog/.claude/commands/ if Claude Code supports nested commands

3. Decision: Where should the slash command live?
   Option A: Keep at root, run with --cwd apps/blog
   Option B: Move to apps/blog/.claude/commands/screenshot.md
   
   Recommendation: Option A (root) for now since it's the only app with visual inspection needs, and root commands are more discoverable.

4. Update package.json in apps/blog to have the screenshot script

Files:
- .claude/commands/screenshot.md
- apps/blog/scripts/screenshot.ts (moved)
- apps/blog/package.json

Done:
- /screenshot command works from repo root
- Screenshots capture apps/blog pages correctly
- Command uses bun instead of npm
