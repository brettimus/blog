---
id: 752c8172-59cd-4e25-8208-554f1e1e6211
short_id: BBB-27
title: Install and configure direnv
status: done
parent: BBB-26
branch: ""
range:
  base: &a1
    _tag: git
    sha: 068638e9bbb58c06250a7164bb5d63cdc86c45bf
  tip: *a1
created_at: 2025-12-13T12:09:10.452Z
updated_at: 2025-12-13T12:13:45.963Z
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