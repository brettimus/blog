# Visual Inspection

Capture screenshots of the local Astro dev server to visually inspect your work.

## Instructions

1. Run the screenshot script with the specified routes (or use defaults)
2. Read the generated screenshots to visually verify the pages
3. Report any issues found

## Routes to capture

$ARGUMENTS (default: / /blog if empty)

## Steps

Run the following command to capture screenshots:

```bash
bun --cwd apps/blog run screenshot -- $ARGUMENTS
```

If $ARGUMENTS is empty, run:

```bash
bun --cwd apps/blog run screenshot -- / /blog
```

After capturing, read each screenshot file listed in the output under "--- SCREENSHOT PATHS ---" using the Read tool to visually inspect them.

Report what you see in each screenshot, noting:
- Layout and visual hierarchy
- Typography and colors
- Any obvious issues or broken elements
- Overall design consistency
