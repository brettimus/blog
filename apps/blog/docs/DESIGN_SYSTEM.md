# Design System

**Mid-Century Scandinavian Technical Blog**

A design language inspired by 1950s-60s Nordic design: functional minimalism, warm natural tones, and clean geometric precision. The "retro-technical" aspect manifests through monospace accents and structured layouts that feel like vintage technical documentation with modern polish.

---

## Color Palette

### CSS Custom Properties

```css
:root {
  /* Primary */
  --warm-cream: #F7F3EB;
  --deep-charcoal: #2A2A28;
  --burnt-sienna: #C45D3A;

  /* Secondary */
  --muted-teal: #4A7C7E;
  --warm-stone: #8B8178;
  --pale-birch: #E8E2D6;

  /* Functional */
  --forest-shadow: #3D4A3F;
  --dusty-rose: #B8847C;
}
```

### Color Reference

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Warm Cream** | `#F7F3EB` | `247, 243, 235` | Page background |
| **Deep Charcoal** | `#2A2A28` | `42, 42, 40` | Primary text |
| **Burnt Sienna** | `#C45D3A` | `196, 93, 58` | Links, accents, interactive elements |
| **Muted Teal** | `#4A7C7E` | `74, 124, 126` | Code accents, secondary links |
| **Warm Stone** | `#8B8178` | `139, 129, 120` | Dates, metadata, muted text |
| **Pale Birch** | `#E8E2D6` | `232, 226, 214` | Inline code backgrounds, subtle cards |
| **Forest Shadow** | `#3D4A3F` | `61, 74, 63` | Code block backgrounds |
| **Dusty Rose** | `#B8847C` | `184, 132, 124` | Hover states, soft accents |

### Rationale

This palette evokes Danish furniture catalogs and Finnish design journals from the 1960s:
- **Warm cream** replaces cold white for a paper-like reading experience
- **Burnt sienna** provides energy and warmth without harshness
- **Muted teal** adds sophisticated contrast for technical elements
- **Forest shadow** creates a cozy, focused environment for code

---

## Typography

### Font Stack

```css
:root {
  --font-display: "Fraunces", Georgia, serif;
  --font-body: "Source Serif 4", Georgia, serif;
  --font-mono: "JetBrains Mono", "Fira Code", monospace;
}
```

### Font Sources

All fonts loaded from Google Fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=JetBrains+Mono:wght@400;500&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600&display=swap" rel="stylesheet">
```

### Font Roles

| Font | Role | Weights | Character |
|------|------|---------|-----------|
| **Fraunces** | Headings, display | 400, 500, 600, 700 | Soft old-style serif with organic curves, optical sizing |
| **Source Serif 4** | Body text | 400, 600 | Contemporary serif optimized for screen reading |
| **JetBrains Mono** | Code, technical | 400, 500 | Developer-focused monospace with ligatures |

### Type Scale (Major Third - 1.25)

```css
:root {
  --font-size-xs: 0.64rem;    /* 10.24px - fine print */
  --font-size-sm: 0.8rem;     /* 12.8px - metadata, dates */
  --font-size-base: 1rem;     /* 16px - body text */
  --font-size-md: 1.25rem;    /* 20px - lead paragraphs */
  --font-size-lg: 1.563rem;   /* 25px - h4 */
  --font-size-xl: 1.953rem;   /* 31.25px - h3 */
  --font-size-2xl: 2.441rem;  /* 39px - h2 */
  --font-size-3xl: 3.052rem;  /* 48.8px - h1 */
}
```

### Line Heights

| Context | Line Height |
|---------|-------------|
| Headings | 1.2 |
| Body text | 1.7 |
| Monospace/code | 1.5 |

### Typography Usage

```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  line-height: 1.2;
  color: var(--deep-charcoal);
}

body {
  font-family: var(--font-body);
  font-size: var(--font-size-base);
  line-height: 1.7;
  color: var(--deep-charcoal);
}

code, pre {
  font-family: var(--font-mono);
  line-height: 1.5;
}
```

---

## Spacing

### Spacing Scale

```css
:root {
  --space-xs: 0.25rem;   /* 4px */
  --space-sm: 0.5rem;    /* 8px */
  --space-md: 1rem;      /* 16px */
  --space-lg: 1.5rem;    /* 24px */
  --space-xl: 2rem;      /* 32px */
  --space-2xl: 3rem;     /* 48px */
  --space-3xl: 4rem;     /* 64px */
}
```

### Content Width

```css
:root {
  --content-width: 720px;
  --content-width-wide: 960px;
}
```

---

## Components

### Links

```css
a {
  color: var(--burnt-sienna);
  text-decoration: none;
  transition: color 200ms ease-out;
}

a:hover {
  color: var(--dusty-rose);
}
```

### Inline Code

```css
code {
  font-family: var(--font-mono);
  font-size: 0.9em;
  background: var(--pale-birch);
  padding: 0.2em 0.4em;
  border-radius: 3px;
}
```

### Code Blocks

```css
pre {
  background: var(--forest-shadow);
  color: #e8e2d6;
  padding: 1.5rem;
  border-radius: 4px;
  border-left: 3px solid var(--muted-teal);
  overflow-x: auto;
}

pre code {
  background: none;
  padding: 0;
  border-radius: 0;
}
```

### Blockquotes

```css
blockquote {
  border-left: 3px solid var(--burnt-sienna);
  padding-left: 1.5rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: var(--warm-stone);
}
```

### Horizontal Rules

```css
hr {
  border: none;
  border-top: 1px solid var(--pale-birch);
  margin: 2rem 0;
}
```

### Buttons (if needed)

```css
.button {
  font-family: var(--font-body);
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  background: var(--burnt-sienna);
  color: var(--warm-cream);
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background 200ms ease-out;
}

.button:hover {
  background: var(--dusty-rose);
}
```

---

## Layout Patterns

### Post List Item

```
┌─────────────────────────────────────────┐
│ Post Title (Fraunces, burnt sienna)     │
│ Description text in Source Serif...     │
│ Dec 13, 2024 (warm stone, small)        │
└─────────────────────────────────────────┘
```

- Title: `var(--font-display)`, links to post
- Description: 1-2 lines, `var(--deep-charcoal)`
- Date: `var(--font-size-sm)`, `var(--warm-stone)`
- Separator: 1px `var(--pale-birch)` between items

### Blog Post Header

```
┌─────────────────────────────────────────┐
│ Dec 13, 2024                            │
│                                         │
│ Post Title Here                         │
│ ═══════════════                         │
│                                         │
└─────────────────────────────────────────┘
```

- Date above title (European style)
- Title in Fraunces, large
- Decorative underline: 2px `var(--burnt-sienna)`

### Navigation

- Clean horizontal layout
- Site title in Fraunces
- Nav links: uppercase, letter-spaced
- Active: 2px bottom border in burnt sienna

---

## Transitions

All interactive elements use consistent timing:

```css
:root {
  --transition-fast: 150ms ease-out;
  --transition-base: 200ms ease-out;
  --transition-slow: 300ms ease-out;
}
```

---

## Accessibility

- Color contrast ratios meet WCAG AA
- Focus states visible with burnt sienna outline
- Font sizes minimum 16px base
- Line heights generous for readability

```css
:focus-visible {
  outline: 2px solid var(--burnt-sienna);
  outline-offset: 2px;
}
```

---

## Dark Mode (Future)

Reserved custom properties for future dark mode:

```css
/* Future dark mode palette */
:root.dark {
  --warm-cream: #1a1a18;
  --deep-charcoal: #e8e2d6;
  --burnt-sienna: #d4826a;
  --pale-birch: #2a2a28;
  --forest-shadow: #0f0f0e;
}
```
