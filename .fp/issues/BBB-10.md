---
id: fff2c34f-d16a-4579-b213-dee12b0f7ff0
short_id: BBB-10
title: Implement Structure and Layout Changes
status: done
parent: BBB-4
branch: ""
range:
  base:
    _tag: git
    sha: 70e0060ec67ee6a091b6140c1da530d523691515
  tip:
    _tag: git
    sha: 70e0060ec67ee6a091b6140c1da530d523691515
created_at: 2025-12-13T09:16:44.422Z
updated_at: 2025-12-13T09:25:24.173Z
---

Transform the visual structure of the blog:

**Homepage (src/pages/index.astro):**
- Add intro blurb section at top
- Recent Posts section showing 3-5 latest posts
- 'View all posts' link to /blog
- Placeholder section for future Projects

**Blog listing (src/pages/blog/index.astro):**
- Remove hero image thumbnails
- Implement clean vertical text-focused list
- Post title + description + date
- Subtle separator lines between posts
- Generous vertical spacing

**Blog post (src/layouts/BlogPost.astro):**
- Remove large hero image display
- Date appears above title (European style)
- Optional inline images (max-width: 480px)
- Decorative underline beneath title

**Header (src/components/Header.astro):**
- Clean horizontal nav with new typography
- Remove social icons (move to footer)
- Active state with burnt sienna underline

**Footer (src/components/Footer.astro):**
- Minimal single-line design
- Add social links (moved from header)
- Copyright in muted stone color

Files:
- src/pages/index.astro
- src/pages/blog/index.astro
- src/layouts/BlogPost.astro
- src/components/Header.astro
- src/components/Footer.astro