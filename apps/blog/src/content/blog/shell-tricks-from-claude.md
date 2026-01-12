---
title: "A Few Shell Tricks I Learned from Watching Claude Work"
description: "Useful shell patterns I picked up from observing AI coding assistants."
pubDate: "Jan 12 2026"
---

I've been using Claude Code for a while now. You learn things by watching.

Here are a few shell tricks I picked up.

## Check Shell Syntax Without Executing

```bash
sh -n script.sh
```

The `-n` flag runs the shell's parser without executing anything. Catches syntax errors before you blow something up.

I never knew this existed. I'd always just run the script and hope for the best. But Claude checks first. Smart.

Useful when you're writing a longer bash script and want to validate it before running. Or when you're debugging someone else's script and want to see if it even parses.

## Redirection

Shells have two output streams: stdout (1) and stderr (2). Most commands print results to stdout and errors to stderr. Redirection lets you control where each one goes.

```bash
# Suppress errors, show a fallback message
cat ~/.config/app/settings.json 2>/dev/null || echo "No settings found"

# Combine stderr into stdout (useful for piping everything)
bun run build 2>&1 | head -50

# Send stdout to a file, stderr to the terminal
npm install > install.log
```

The `2>/dev/null` trick is everywhere in Claude's transcripts. Checking if files exist. Checking if tools are installed. Instead of ugly "file not found" errors, you get silence or a friendly fallback.

The `2>&1` pattern is useful when you want to pipe or capture everything. Build output often splits across both streams. Merge them first, then filter.

Useful when you're writing setup scripts:

```bash
which docker 2>/dev/null || echo "Docker not installed"
```

Or when you're debugging a failing build and want to grep the full output:

```bash
bun run build 2>&1 | grep -i error
```

## Count Occurrences

```bash
sort | uniq -c | sort -rn
```

Sort first (uniq only works on adjacent lines), count occurrences with `-c`, then sort numerically in reverse to get the most common items at the top.

Claude uses this to analyze logs, find the most common errors, figure out which files are touched most often.

Useful when you're debugging and want to know "what's happening the most?" Pipe anything through it:

```bash
cat access.log | cut -d' ' -f1 | sort | uniq -c | sort -rn | head -10
```

Top 10 IP addresses hitting your server.

## Find Duplicates

```bash
sort | uniq -d
```

The `-d` flag only prints lines that appear more than once.

I always forget this exists. I'd write some awkward awk one-liner instead.

Useful when you're checking for duplicate entries in a config file, duplicate dependencies, duplicate anything:

```bash
cat package.json | jq -r '.dependencies | keys[]' | sort | uniq -d
```

## Heredocs

A heredoc lets you pass multi-line strings to a command. The syntax is `<< DELIMITER` followed by your content, ending with `DELIMITER` on its own line.

```bash
cat << EOF
Hello, $USER
Today is $(date)
EOF
```

Variables and commands expand by default. But quote the delimiter and they don't:

```bash
cat << 'EOF'
Hello, $USER
Today is $(date)
EOF
```

Now `$USER` stays literal. The quotes save you from escaping hell.

Claude uses quoted heredocs constantly. Generating scripts that contain dollar signs. Writing config files with template variables. Creating multi-line commit messages.

Useful when you're writing a script that generates another script:

```bash
cat << 'EOF' > setup.sh
#!/bin/bash
echo "Installing to $HOME/bin"
EOF
```

Without the quotes, `$HOME` would expand to your actual home directory when you run the outer script. With quotes, the generated script contains the literal `$HOME` for whoever runs it later.

<!--
Other patterns found in Claude's transcripts, saved for later:

git tricks:
- git diff --name-only --diff-filter=U (find merge conflict files)
- git log -1 --format='%an %ae' (get last commit author)
- git show HEAD:path/to/file (view file at specific commit)
- git diff --check (whitespace errors)
- git blame -L 535,545 file (blame specific lines)
- git cat-file -e commit (check if object exists)

file inspection:
- cat -A file (show hidden characters like tabs and line endings)
- head -c 1000 file (get bytes, not lines)

other shell patterns:
- || true (continue on failure)
- xargs -I {} (placeholder substitution)
- sort -V (version sort)
-->
