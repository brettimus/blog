---
id: 4d3ff4dd-db9c-459f-ab9d-ca77e1180625
short_id: BBB-11
title: Set up Playwright visual inspection for Claude
status: done
parent: null
branch: ""
range:
  base:
    _tag: git
    sha: f73eabd00a55ee957d5372c61760a493f7a11f41
  tip:
    _tag: git
    sha: f73eabd00a55ee957d5372c61760a493f7a11f41
created_at: 2025-12-13T09:25:46.001Z
updated_at: 2025-12-13T09:32:18.773Z
---

Create a system for Claude to visually inspect and verify work on the Astro site using Playwright screenshots.

## Goals
- Allow Claude to quickly snapshot and inspect pages locally
- Minimize context impact through subagent or dedicated workflow
- Document the approach in CLAUDE.md

## Tasks
1. **Create Playwright harness/scripts**
   - Install Playwright as dev dependency
   - Create utility script(s) to capture screenshots of specified routes
   - Support capturing full page and specific viewport sizes
   - Output screenshots to a temp/inspectable location

2. **Create subagent or minimal-context workflow**
   - Design approach to run visual inspection with minimal context overhead
   - Could be a dedicated Task subagent, slash command, or standalone script
   - Should return concise summary of what was captured

3. **Update CLAUDE.md**
   - Add instructions on when/how to use visual inspection
   - Document available scripts and their usage
   - Include examples of typical inspection workflows

## Acceptance Criteria
- [ ] Can capture screenshots of any route in the Astro dev server
- [ ] Process is lightweight and doesn't bloat conversation context
- [ ] Instructions in CLAUDE.md are clear and actionable