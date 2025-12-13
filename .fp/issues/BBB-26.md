---
id: 8fab119b-f046-4796-8dde-1a9277bfba46
short_id: BBB-26
title: Set up direnv for per-project Cloudflare credentials
status: done
parent: null
branch: ""
range:
  base:
    _tag: git
    sha: 068638e9bbb58c06250a7164bb5d63cdc86c45bf
  tip:
    _tag: git
    sha: 068638e9bbb58c06250a7164bb5d63cdc86c45bf
created_at: 2025-12-13T12:09:02.601Z
updated_at: 2025-12-13T12:18:18.066Z
---

Set up per-project Cloudflare credentials using direnv to avoid "logout/login" thrash between personal and work accounts.

## Why direnv?

- **Per-directory identity** - credentials auto-load when you `cd` into the project
- **No global state** - doesn't pollute `~/.wrangler` or require `wrangler login` switching
- **CI-friendly** - same pattern works in CI (tokens per repo/environment)
- **Shell-agnostic** - works with bash, zsh, fish, etc.

## How it works

```bash
cd ~/fiber/brett-blog
# direnv automatically exports:
# - CLOUDFLARE_API_TOKEN (scoped to personal account)
# - CLOUDFLARE_ACCOUNT_ID (personal account ID)

wrangler deploy  # Just works, uses env vars
```

## Environment variables Wrangler respects

- `CLOUDFLARE_API_TOKEN` - API token with Workers permissions
- `CLOUDFLARE_ACCOUNT_ID` - Target account for deployment

## Alternative: Multiple wrangler configs

Could also use `--config` flag with separate configs:
- `wrangler.personal.jsonc`
- `wrangler.work.jsonc`

But direnv is cleaner since it handles auth transparently.

## Done when

- `cd` into this repo automatically sets Cloudflare credentials
- `wrangler deploy` uses personal account without manual auth
- Credentials not committed to git