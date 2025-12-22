---
id: "4d76c584-26a4-4f9d-9a94-1954842e0e52"
short_id: BBB-9
title: Implement Font and Color Foundation
status: done
parent: "82c87688-0f97-4ef2-b652-50cc8a1d64e1"
dependencies: []
branch: ""
revisions: null
created_at: "2025-12-13T09:16:34.124Z"
updated_at: "2025-12-13T09:21:48.330Z"
---

Update the CSS foundation with the new design tokens:

**BaseHead.astro changes:**
- Add Google Fonts links for Fraunces, Source Serif 4, JetBrains Mono

**global.css changes:**
- Define CSS custom properties for all colors:
  --warm-cream, --deep-charcoal, --burnt-sienna, --muted-teal, etc.
- Update typography scale (Major Third 1.25)
- Set font-family declarations:
  - Headings: Fraunces
  - Body: Source Serif 4
  - Code: JetBrains Mono
- Apply warm cream background
- Update link colors to burnt sienna
- Style code blocks with forest shadow background
- Update blockquote styling

Files:
- src/components/BaseHead.astro
- src/styles/global.css
