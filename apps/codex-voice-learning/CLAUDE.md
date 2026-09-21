# codex-voice-learning

Slidev talk deployed to `walks.boots.lol`. Light
engineering-notebook aesthetic (Geist + Geist Mono, graph-paper canvas, one blue
accent). Issue tracking is handled by fp at the monorepo root — do not create a
nested fp project here.

## Design language (read before any slide/styling work)

The deck uses a **light, engineering-notebook aesthetic** (off-white graph-paper
canvas, black ink, one electric-blue accent, hairline cards, mono kickers,
pixel-square clusters). The authoritative style bible lives at
**`docs/design-language.md`** and is implemented in `style.css`.

Before adding or restyling slides, read it and stay inside it — match the tokens,
the typographic scale, the motifs, and the anti-goals. If a change needs to break
from the bible, update `docs/design-language.md` in the same change so the doc and
the deck never drift apart.

@docs/design-language.md

## Skills

- `.claude/skills/slidedev/` — Slidev authoring skill (syntax, layouts, animations,
  CLI, hosting). Read `SKILL.md` before writing slides; dig into `references/` as
  needed. `.agents/skills/slidedev` is a symlink to this directory so both agent
  skill directories resolve.

## Slidev workflow

```bash
bun install
bun run dev      # dev server (fast iteration)
bun run build    # build SPA to dist/
bun run deploy   # build + wrangler deploy to walks.boots.lol
bun run export   # PDF export
```

## Visual iteration with agent-browser

Build, serve locally, and inspect with agent-browser while iterating:

1. `bun run build`
2. `cd dist && python3 -m http.server 3031 &`
3. `agent-browser open http://localhost:3031`
4. `agent-browser snapshot -i` / `agent-browser screenshot slide.png`
5. `agent-browser close` when done

Navigation refs in the built deck: `@e2` prev, `@e3` next, `@e4` overview.

A task is not done until the deployed version has been checked. Final checks go
against the production URL, not just the local dev server — Cloudflare routing,
static assets, and refresh behavior are part of the presentation surface.

## Known quirks

- **`Failed to patch FloatingVue` console error (intermittent):** the
  `@shikijs/vitepress-twoslash/client` plugin wraps an optional FloatingVue
  monkey-patch in try/catch, and a registration race occasionally logs this
  error. It exists in this dependency matrix (Slidev 52.x +
  `@shikijs/vitepress-twoslash`); it is harmless (the deck has no twoslash code
  blocks) and goes away on reload. Verified flaky across versions — don't chase
  it with dependency pins.

## Placeholders pending content

- `slides.md` — outline deck with placeholder slides (motivation, Level 1, Level 2,
  benefits/drawbacks, closing). Brett will supply the real content.
- `public/` — needs one or two photos of Brett's dog (expected names: `dog-1.jpg`,
  `dog-2.jpg`) plus a regenerated QR code once content lands.
- Emoji reaction set in `worker/index.ts` + `global-top.vue` — currently the
  template defaults (🐢 🙋 🍟); swap for something talk-appropriate before
  publishing.
