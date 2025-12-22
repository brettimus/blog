---
id: bbff23e6-77be-4002-a383-a3b9846fadb7
short_id: BBB-28
title: Create Cloudflare API token for personal account
status: done
parent: "8fab119b-f046-4796-8dde-1a9277bfba46"
dependencies: []
branch: ""
revisions: null
created_at: "2025-12-13T12:09:12.175Z"
updated_at: "2025-12-13T12:15:18.607Z"
---

Create a scoped API token in Cloudflare for personal account deployments.

## Steps

1. Log into Cloudflare dashboard with personal account
2. Go to **My Profile** → **API Tokens**
3. Click **Create Token**
4. Use the **Edit Cloudflare Workers** template (or create custom)

## Required permissions

For Workers deployment:
- **Account** → Workers Scripts → Edit
- **Account** → Workers KV Storage → Edit (if using KV)
- **Account** → Workers R2 Storage → Edit (if using R2)
- **Zone** → Workers Routes → Edit (if using routes)

## Token settings

- **Account Resources**: Include → Specific account → [your personal account]
- **Zone Resources**: Include → All zones (or specific zone for blog.boots.lol)
- **TTL**: Optional, can set expiry for security

## Get Account ID

Find your account ID:
- Cloudflare dashboard → any zone → **Overview** → right sidebar shows Account ID
- Or: `wrangler whoami` (if logged in)

## Store securely

Save the token somewhere secure (1Password, etc.) - you'll need it for the .envrc.

**Never commit the token to git!**

## Done when

- API token created with Workers permissions
- Account ID noted
- Both stored securely for use in .envrc
