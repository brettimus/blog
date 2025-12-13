---
id: 9ce25647-1421-47c9-b84c-2566cca9c123
short_id: BBB-29
title: Set up .envrc with Cloudflare credentials
status: done
parent: BBB-26
branch: ""
range:
  base: &a1
    _tag: git
    sha: 068638e9bbb58c06250a7164bb5d63cdc86c45bf
  tip: *a1
created_at: 2025-12-13T12:09:13.842Z
updated_at: 2025-12-13T12:17:52.603Z
---

Create the .envrc file with Cloudflare credentials.

## Create .envrc

In the repo root (`~/fiber/brett-blog/`):

```bash
# .envrc
export CLOUDFLARE_API_TOKEN="your-api-token-here"
export CLOUDFLARE_ACCOUNT_ID="your-account-id-here"
```

## Allow direnv

After creating the file:

```bash
direnv allow
```

This tells direnv it's safe to load this .envrc.

## Verify

```bash
# Should show your credentials are loaded
echo $CLOUDFLARE_API_TOKEN
echo $CLOUDFLARE_ACCOUNT_ID

# Test with wrangler
wrangler whoami
# Should show your personal account
```

## Test deployment

```bash
cd apps/blog
bun run deploy
# Should deploy to personal account without prompting for login
```

## Done when

- .envrc exists with both env vars
- `direnv allow` has been run
- `wrangler whoami` shows personal account
- `bun run deploy` works without manual auth