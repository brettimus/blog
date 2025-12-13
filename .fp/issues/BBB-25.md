---
id: f1bdb750-37b2-4183-ade2-c9b5a9fe8bd9
short_id: BBB-25
title: Improve boot icon with AI-generated design
status: todo
parent: null
branch: ""
range: null
created_at: 2025-12-13T12:08:13.783Z
updated_at: 2025-12-13T12:08:13.783Z
---

The current boot icon is a simple hand-coded SVG. It works but could be much more distinctive and charming.

## Current state
- Basic geometric boot shape in `apps/blog/src/components/BootIcon.astro`
- Uses design system colors (deep-charcoal body, burnt-sienna heel)
- Tilts on hover

## Goals
- More personality and character
- Better fit with mid-century Scandinavian aesthetic
- Could be playful/whimsical while staying clean

## AI tools to investigate

### Image generators (raster → trace to SVG)
- **Midjourney** - High quality, good at style adherence
- **DALL-E 3** - Good at following detailed prompts
- **Ideogram** - Strong with text/logos
- **Recraft** - Specifically designed for icons/vectors

### Vector-native tools
- **Recraft V3** - Generates actual SVG output
- **Figma AI** - Icon generation features
- **IconifyAI** - Specialized for icons

### Workflow options
1. Generate raster with AI → trace to SVG (Figma, Illustrator, potrace)
2. Use vector-native AI tool directly
3. Use AI as reference/inspiration, redraw manually

## Design directions to explore
- Cartoon/illustrated boot with personality
- Abstract geometric mark inspired by boot shape
- Typographic treatment (boot-shaped B?)
- Vintage/retro boot illustration style

## Files
- `apps/blog/src/components/BootIcon.astro`
- `apps/blog/public/` (if adding raster assets)

## Done when
- Icon has more character and visual interest
- Maintains clean look at small sizes (24-32px)
- Works well in header context
