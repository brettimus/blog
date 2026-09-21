---
theme: default
title: Walk and talk with Codex
info: |
  Work-in-progress slides for the codex-voice-learning talk.
favicon: https://fav.farm/🚶
drawings:
  persist: false
transition: slide-left
mdc: true
canvasWidth: 840
colorSchema: light
class: cover
---

<style>
@import './style.css';
</style>

<div class="pill mb-8">Work in progress · boots.lol</div>

# Walk and talk<br>with Codex

<div class="mt-5 text-2xl" style="color: var(--ink-mute); max-width: 36ch;">
Building a hyperpersonal voice agent study system.
</div>

<div class="mt-10 flex items-center gap-3">
  <div class="pixels">
    <i></i><i></i><i class="lit"></i>
    <i></i><i class="lit"></i><i></i>
    <i class="lit"></i><i></i><i></i>
  </div>
  <span class="text-sm font-mono" style="color: var(--ink-faint);">walks.boots.lol</span>
</div>

<div class="abs-br m-6 text-sm">
Brett Beutell · @lastgoodhandle
</div>

---

<div class="kicker">Takeaways</div>

# What to take away

<div class="mt-7 space-y-4" style="max-width: 56ch;">

<v-clicks>

- You can build a tool to learn new things
- You can use it while you walk, clean, etc
- Like an interactive podcast, kinda

</v-clicks>

</div>

---
layout: default
class: section
---

<h1 style="font-size: 7rem; letter-spacing: -0.04em;">MOTIVATION</h1>

---

# I have a dog

<div class="mt-8" style="width: 380px; height: 380px; background: url('/ella-stage-0.jpeg') center / cover no-repeat; border: 1px solid var(--line-strong); border-radius: 14px;" aria-label="Ella"></div>

---

# She needs to go outside a lot

<div class="mt-8" style="width: 380px; height: 380px; background: url('/ella-stage-1.jpeg') center / cover no-repeat; border: 1px solid var(--line-strong); border-radius: 14px;" aria-label="Ella outside"></div>

---

# She doesn't care if I'm coding

<div class="mt-8" style="width: 380px; height: 380px; background: url('/ella-stage-2.jpeg') center / cover no-repeat; border: 1px solid var(--line-strong); border-radius: 14px;" aria-label="Ella not caring about code"></div>

---

# Because being outside is the best

<div class="mt-8" style="width: 380px; height: 380px; background: url('/ella-stage-3.jpeg') center / cover no-repeat; border: 1px solid var(--line-strong); border-radius: 14px;" aria-label="Ella outside, happy"></div>

---

# Because then she is like this

<div class="mt-8" style="width: 380px; height: 380px; background: url('/ella-stage-4.jpeg') center / cover no-repeat; border: 1px solid var(--line-strong); border-radius: 14px;" aria-label="Ella, satisfied"></div>

<!--
Photo sequence: public/ella-stage-0.jpeg .. ella-stage-4.jpeg
-->

---
layout: default
class: section
---

<h1 style="font-size: 7rem; letter-spacing: -0.04em;">LEVEL 1</h1>

---

<div class="kicker">Level 1</div>

# Study setup on a remote machine

<div class="mt-7 space-y-4" style="max-width: 56ch;">

<v-clicks>

- Set up a project on a remote machine
- Ask for an Anki-style SRSS setup to create and review study cards
- Use a SQLite DB to track those cards and your study sessions
- Connect the remote machine to your phone
- Launch voice on your phone, connected to the remote
- Go on a walk. Codex progressively grades you on the concepts you want to learn

</v-clicks>

</div>

---

<div class="kicker">Level 1 · Trade-offs</div>

# Benefits & drawbacks

<div class="mt-7 grid grid-cols-2 gap-4 items-start">

<div class="p-5" style="background: var(--paper-pure); border: 1px solid var(--line-strong); border-radius: 14px;">

### Benefits

- You are forced to talk through problems and your understanding
- Review granularity is much more flexible than traditional SRSS

</div>

<div class="p-5" style="background: var(--paper-pure); border: 1px solid var(--line-strong); border-radius: 14px;">

### Drawbacks

- Voice mode does not understand the context of the world around you. It won't get it if you yell at your dog or talk to someone you meet on the street

</div>

</div>

---
layout: default
class: section
---

<h1 style="font-size: 7rem; letter-spacing: -0.04em;">LEVEL 2</h1>

---

<div class="kicker">Level 2</div>

# Mo plumbing, mo studying

<div class="mt-7 space-y-4" style="max-width: 56ch;">

<v-clicks>

- [exe.dev](https://exe.dev) to host a plugin (MCP) and a web ui
- Review with ChatGPT voice mode OR Codex
- Doesn't require a remote connection

</v-clicks>

</div>

---
layout: default
class: section
---

<div class="kicker">The demo</div>

# DEMO
