---
title: "Terminal Utilities I'm Learning"
description: "Notes on modern CLI tools I've been exploring: httpie, dust, fzf, and tmux."
pubDate: "Jan 13 2026"
draft: true
---

I've been trying to level up my terminal game. Here are some tools I'm exploring.

## httpie

Is this still a thing? I remember hearing about it years ago as a friendlier alternative to curl.

```bash
# Instead of curl
http GET https://api.github.com/users/brettimus

# POST with JSON
http POST https://api.example.com/items name=widget price:=19.99
```

The syntax is cleaner than curl's flag soup. Colored output by default. But I'm not sure if it's worth adding another tool when curl is everywhere.

Still figuring out if this earns a permanent spot in my toolkit.

## dust

A modern `du` replacement written in Rust. Shows disk usage with a visual breakdown.

```bash
dust
```

That's it. No flags needed for the common case. It shows you what's eating your disk space with a nice bar chart visualization.

I've been using this when my disk fills up and I need to figure out what to delete. Way more intuitive than trying to parse `du -sh *` output.

## fzf

Fuzzy finder for the terminal. This one's been on my "I should learn this" list for years.

```bash
# Find and open a file
vim $(fzf)

# Search command history
history | fzf
```

The real power is in the integrations. Ctrl+R for fuzzy history search. Ctrl+T for fuzzy file completion. But I haven't built the muscle memory yet.

## tmux

Terminal multiplexer. Another tool I've known about forever but never properly learned.

The basics I'm working on:
- `tmux new -s name` - start a named session
- `tmux attach -t name` - reattach to a session
- `Ctrl+b %` - split vertical
- `Ctrl+b "` - split horizontal
- `Ctrl+b arrow` - move between panes

The killer feature is persistence. SSH into a server, start tmux, run a long process, disconnect, come back later, reattach. The process is still running.

I'm still fumbling with the keybindings. Ctrl+b feels awkward. Might remap to Ctrl+a like screen.

---

These are all tools I'm learning, not tools I've mastered. Maybe I'll write follow-up posts as I get more comfortable with each one.
