---
id: 3863a1c0-ea34-47d2-ba67-c9dc9860056f
short_id: BBB-7
title: "Fix footer: update social links and remove placeholder text"
status: done
parent: BBB-1
branch: ""
range:
  base:
    _tag: git
    sha: 4c034d36f835f04c8e57d77a58931c46c1495128
  tip:
    _tag: git
    sha: 4c034d36f835f04c8e57d77a58931c46c1495128
created_at: 2025-12-13T08:36:28.321Z
updated_at: 2025-12-13T08:41:10.412Z
---

The blog footer still contains Astro's default social links (Twitter/GitHub) instead of Brett's personal social links that are correctly configured in the header. It also has placeholder text like "Your name here" that needs to be updated.

**Current behavior:** 
- Footer shows Astro's social links
- Footer has placeholder text ("Your name here")

**Expected behavior:** 
- Footer should show Brett's social links:
  - Twitter: @lastgoodhandle
  - GitHub: @brettimus
- Footer should have proper attribution (Brett Beutell / @brettimus)

The header already has the correct links configured, so this is likely just an oversight in the Footer component.