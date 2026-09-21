# codex-voice-learning

A Slidev talk deployed to `walks.boots.lol`.

## Development

```bash
bun install
bun run dev
```

## Build

```bash
bun run build
```

## Deploy

```bash
direnv exec . bun run deploy
```

(Cloudflare credentials come from the monorepo root `.envrc` via direnv.)

## Export to PDF

```bash
bun run export
```

## Structure

- `slides.md` — the deck
- `style.css` + `docs/design-language.md` — engineering-notebook design system
- `worker/index.ts` — Cloudflare Worker serving the SPA + reactions WebSocket
- `components/` — Vue slide components
- `.claude/skills/slidedev` — Slidev skill (symlinked from `.agents/skills/slidedev`)
