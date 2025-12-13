---
title: "Plan Mode Considered Harmful?"
description: "Exploring whether manual mode-switching in AI coding assistants is a band-aid over the real problem of context management."
pubDate: "Dec 13 2025"
---

There's a pattern emerging in AI coding tools: the explicit "plan mode" where you stop the agent from writing code and instead have it think through an approach first. Get alignment, then execute. It makes sense on the surface.

But I think it might be a band-aid.

## The appeal of plan mode

When you're about to make significant changes to a codebase, you want to know what's coming. Plan mode lets you:

- See the approach before code is written
- Catch misunderstandings early
- Feel more in control of the process

The friction is intentional. It forces a pause, a moment of human review before the agent goes off and refactors half your codebase.

## The friction cost

But that friction has a cost. Every time you switch modes, you break flow. The agent has to stop, summarize its thinking, wait for approval, then context-switch back into implementation mode.

For small tasks, this overhead dominates. "Add a button to the settings page" doesn't need a planning phase. But where's the line? And who decides?

Right now, the human decides. You either invoke plan mode explicitly, or the agent asks permission to enter it. Either way, you're now managing the agent's cognitive modes on top of managing your own work.

## The real problem is context

Here's what I think is actually happening: plan mode exists because we don't trust the agent to maintain context well enough to do the right thing autonomously.

If an agent could reliably:
- Understand the full scope of a task
- Break it into appropriate sub-tasks
- Track its own progress
- Know when to pause and ask questions
- Recover gracefully from mistakes

...would we need an explicit "plan mode" at all?

The TODO list approach gets partway there. When an agent writes down its plan as actionable items and checks them off as it goes, you can watch progress without interrupting. But it's still somewhat opaque. You see *what* the agent plans to do, but not always *why*, or how confident it is.

## What doing better might look like

I don't have the answer yet, but I have some intuitions:

**Continuous confidence signaling.** Instead of binary "planning" vs "executing" modes, what if the agent continuously signaled its confidence level? High confidence: just do it. Medium confidence: mention what you're about to do. Low confidence: stop and ask.

**Richer progress tracking.** Not just TODO items, but a live view of the agent's mental model. What files does it think are relevant? What assumptions is it making? What alternatives did it consider?

**Graceful rollback.** If the agent can cheaply undo its work, the stakes of "letting it try" go way down. Git helps here, but integrated undo that understands semantic changes would be better.

**Earned autonomy.** Maybe new agents start with more guardrails, and as you work together and build trust, the handoffs become smoother. The agent learns your preferences; you learn its capabilities.

## The question mark is intentional

I titled this post with a question mark because I'm genuinely uncertain. Plan mode is useful *right now*. It catches real problems. The friction it adds might be worth it given current agent capabilities.

But I suspect that in a year or two, we'll look back at explicit mode-switching the way we look back at other transitional UX patterns - necessary scaffolding that eventually gets removed as the underlying technology matures.

The goal isn't to remove human oversight. It's to make that oversight feel less like babysitting and more like collaboration.
