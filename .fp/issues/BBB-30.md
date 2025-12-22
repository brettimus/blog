---
id: aa9e0403-7aa7-4a27-8b72-aa06201dbce8
short_id: BBB-30
title: Add .envrc to .gitignore and document setup
status: done
parent: "8fab119b-f046-4796-8dde-1a9277bfba46"
dependencies: []
branch: ""
revisions: null
created_at: "2025-12-13T12:09:15.608Z"
updated_at: "2025-12-13T12:18:17.435Z"
---

Ensure .envrc is not committed and document the setup for future reference.

## Add to .gitignore

```bash
echo ".envrc" >> .gitignore
```

Or add manually to `.gitignore`:
```
# direnv
.envrc
```

## Create .envrc.example

Create a template others can copy:

```bash
# .envrc.example
# Copy to .envrc and fill in your values
# Then run: direnv allow

export CLOUDFLARE_API_TOKEN="your-api-token-here"
export CLOUDFLARE_ACCOUNT_ID="your-account-id-here"
```

## Document in CLAUDE.md

Add a section to the root CLAUDE.md about deployment setup:

```markdown
## Deployment

Uses direnv for per-project Cloudflare credentials.

### Setup (first time)

1. Install direnv: `brew install direnv`
2. Add shell hook to ~/.zshrc: `eval "$(direnv hook zsh)"`
3. Copy `.envrc.example` to `.envrc`
4. Fill in your Cloudflare API token and account ID
5. Run `direnv allow`

### Deploy

```bash
bun run deploy  # Deploys blog to Cloudflare
```
```

## Done when

- .envrc is in .gitignore
- .envrc.example exists as a template
- CLAUDE.md documents the setup process
