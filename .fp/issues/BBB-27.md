---
id: "752c8172-59cd-4e25-8208-554f1e1e6211"
short_id: BBB-27
title: Install and configure direnv
status: done
parent: "8fab119b-f046-4796-8dde-1a9277bfba46"
dependencies: []
branch: ""
revisions: null
created_at: "2025-12-13T12:09:10.452Z"
updated_at: "2025-12-13T12:13:45.963Z"
---

Install direnv and hook it into your shell.

## Install

```bash
# macOS
brew install direnv
```

## Shell hook

Add to your shell config (~/.zshrc, ~/.bashrc, etc.):

```bash
# For zsh
eval "$(direnv hook zsh)"

# For bash
eval "$(direnv hook bash)"

# For fish
direnv hook fish | source
```

## Verify

```bash
direnv --version
# Should output version number

# After adding hook, restart shell or source config
source ~/.zshrc
```

## Done when

- `direnv --version` works
- Shell hook is installed (entering a directory with .envrc shows "direnv: loading .envrc")
