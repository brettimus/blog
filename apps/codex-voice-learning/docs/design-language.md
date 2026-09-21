# codex-voice-learning Deck — Design Language

A light, engineering-notebook aesthetic synthesized from **fiberplane.com** and
**fp.dev**.
The feeling: a crisp technical spec printed on graph paper. Restraint over decoration,
monospace as texture, one confident blue accent, and lots of air.

## North Star

> Looks like the Fiberplane brand wrote the slides. Quiet, precise, a little nerdy.
> Black ink on warm paper, mono labels, a single electric-blue spark.

Opposite of the old "Terminal Luxe" dark deck. We flip to **light mode** and let
whitespace + typography do the work instead of glow and gradients.

## Color

Off-white paper, near-black ink, one blue. Semantic colors stay muted and are used
only for small chips, never as slide backgrounds.

| Token | Value | Use |
|-------|-------|-----|
| `--paper` | `#f4f4f2` | Slide canvas (warm off-white) |
| `--paper-pure` | `#ffffff` | Cards, code surfaces |
| `--ink` | `#0a0a0a` | Headlines, primary text |
| `--ink-soft` | `#3f3f43` | Body text |
| `--ink-mute` | `#71717a` | Captions, eyebrows, secondary |
| `--ink-faint` | `#a1a1aa` | Page numbers, disabled |
| `--line` | `#e4e4e1` | Hairline borders |
| `--line-strong` | `#d4d4d1` | Card borders, dividers |
| `--accent` | `#1a5cff` | Links, markers, the one spark |
| `--accent-soft` | `#1a5cff14` | Accent tint backgrounds |
| `--grid` | `#0a0a0a08` | Graph-paper rules |

Statement/contrast surface (the "DRIFT" black card on fiberplane.com):
`--ink` background, `--paper` text. Use sparingly — one per slide, max.

Muted semantic chips: green `#15803d`, amber `#b45309`, red `#b91c1c`, violet `#6d28d9`,
each on a `~8%` tint with a `~20%` border. Never full-saturation, never as a fill.

## Typography

Two families, both from the Geist superfamily — the exact brand fonts.

- **Geist** (sans) — headlines and body. Regular/medium weights, **tight tracking**,
  large and confident. This is what makes the big fiberplane headline feel calm.
- **Geist Mono** — eyebrows, kickers, nav, labels, page numbers, code, captions.
  Mono is the signature *texture* of the brand; use it liberally for chrome, sparingly
  for running prose.

Scale (canvasWidth 840):

| Role | Font | Size | Weight | Tracking |
|------|------|------|--------|----------|
| Display (cover/section) | Geist | 3.4rem | 600 | -0.03em |
| H1 | Geist | 2.4rem | 600 | -0.025em |
| H2 | Geist | 1.6rem | 500 | -0.015em |
| H3 | Geist Mono | 0.8rem | 500 | +0.08em, UPPERCASE |
| Body | Geist | 1.05rem | 400 | normal |
| Eyebrow / label | Geist Mono | 0.72rem | 500 | +0.12em, UPPERCASE |
| Code / caption | Geist Mono | 0.85rem | 400 | normal |

H3 doubles as a section label (mono uppercase) rather than a third heading size —
matches the `STATUS / PRIORITY / LABELS` labels on fp.dev.

## Motifs

These are what make it unmistakably Fiberplane:

1. **Graph-paper grid** — a faint `32px` square grid behind every slide
   (`--grid` lines). Subtle; you feel it more than see it.
2. **Pixel-square cluster** — a small 3×3 grid of squares in a slide corner, mostly
   `--line` with one `--accent` blue square lit. The brand's signature decorative tile.
3. **Mono kicker** — every content slide opens with a small uppercase mono eyebrow
   above the H1 (e.g. `01 — WORKING FRAME`).
4. **Hairline cards** — white, `1px --line-strong` border, `14px` radius, generous
   padding, near-flat shadow. The occasional **black card** for a single key idea.
5. **Pill tag** — mono text, full radius, `--line` border on white — like the
   `Issue tracking for coding agents` chip.
6. **Blue `$` prompt** — terminal/command samples use a blue `$` and blue command names,
   black args, on white. Mac traffic-light dots optional for "product" framing.

## Components

- **Buttons / CTAs**: solid black (`--ink` bg, white text, radius 8px) primary;
  hairline-outlined secondary. Rare on slides but used on the cover.
- **Page number**: bottom-right, Geist Mono, `--ink-faint`, formatted like an ID
  (`CVL · 03`).
- **Lists**: blue square `▪` markers (not discs), tight leading.
- **Blockquote**: left blue rule, `--ink-soft`, not italic.
- **Tables**: hairline rows, mono headers, no zebra fill.

## Layout & Spacing

- Slide padding `2.5rem 3rem`. Generous left gutter for the editorial feel.
- Headlines left-aligned by default (fiberplane is left-aligned, not centered).
- Section/divider slides: centered, big Geist display on graph paper + a pixel cluster.
- Asymmetry welcome: content can sit left with air on the right.

## Anti-goals

- No glow, no neon, no dark gradients, no `oklch` electric-blue washes.
- No gradient text. No drop shadows heavier than a hairline.
- No centered-everything. No full-bleed colored backgrounds.
- Blue is a spark, not a theme — if a slide looks blue, pull it back.
