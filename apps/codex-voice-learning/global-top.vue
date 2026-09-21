<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

// --- Reaction protocol ------------------------------------------------------
// Client-side allowlist mirrors the server's. We only ever send / render
// these three. Names are used for aria-labels and as the stable data-emoji
// keys that automated checks assert against.
const REACTIONS: { emoji: string; name: string }[] = [
	{ emoji: "🐢", name: "turtle" },
	{ emoji: "🙋", name: "hand" },
	{ emoji: "🍟", name: "fries" },
];
const ALLOWED = new Set(REACTIONS.map((r) => r.emoji));

// --- Presenter / stage mode -------------------------------------------------
// On the projected presenter screen you usually do not want the toolbar.
// Hide it with ?stage in the URL, or toggle at runtime with the "r" hotkey.
const showToolbar = ref(true);

// --- Connection state --------------------------------------------------------
let socket: WebSocket | null = null;
let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
let reconnectDelay = 1000; // capped backoff base
const MAX_RECONNECT_DELAY = 10000;
let disposed = false;

// Floating layer + housekeeping for self-removing nodes.
const layerEl = ref<HTMLDivElement | null>(null);
const pendingTimers = new Set<ReturnType<typeof setTimeout>>();

function wsUrl(): string {
	const proto = window.location.protocol === "https:" ? "wss" : "ws";
	return `${proto}://${window.location.host}/api/reactions/ws`;
}

function scheduleReconnect() {
	if (disposed) return;
	if (reconnectTimer != null) return;
	const delay = reconnectDelay;
	reconnectTimer = setTimeout(() => {
		reconnectTimer = null;
		connect();
	}, delay);
	// Capped exponential-ish backoff so we never hot-loop when the backend
	// is simply absent (e.g. `slidev dev` with no worker running).
	reconnectDelay = Math.min(reconnectDelay * 2, MAX_RECONNECT_DELAY);
}

function connect() {
	if (disposed) return;
	// Never open a socket during SSR. connect() is only ever called from
	// onMounted (or a reconnect timer that is itself client-side).
	if (typeof window === "undefined") return;

	let ws: WebSocket;
	try {
		ws = new WebSocket(wsUrl());
	} catch {
		scheduleReconnect();
		return;
	}
	socket = ws;

	ws.addEventListener("open", () => {
		// Successful connect resets the backoff window.
		reconnectDelay = 1000;
	});

	ws.addEventListener("message", (event) => {
		let data: unknown;
		try {
			data = JSON.parse(typeof event.data === "string" ? event.data : "");
		} catch {
			return;
		}
		if (
			typeof data === "object" &&
			data !== null &&
			(data as { t?: unknown }).t === "react"
		) {
			const e = (data as { e?: unknown }).e;
			if (typeof e === "string" && ALLOWED.has(e)) {
				spawnEmoji(e);
			}
		}
	});

	ws.addEventListener("close", () => {
		if (socket === ws) socket = null;
		scheduleReconnect();
	});

	ws.addEventListener("error", () => {
		// Let the close handler drive reconnect; just make sure the socket is
		// torn down so we don't leak a half-open connection.
		try {
			ws.close();
		} catch {
			/* ignore */
		}
	});
}

function send(emoji: string) {
	// Single render path: we NEVER render here. We only put the reaction on
	// the wire; rendering happens when the broadcast echo comes back, which
	// proves the full client -> DO -> all-clients round trip.
	if (socket && socket.readyState === WebSocket.OPEN) {
		socket.send(JSON.stringify({ t: "react", e: emoji }));
	}
}

// Spawn a floating emoji node inside #reactions-layer. Text content only —
// never innerHTML. The node animates up via CSS and removes itself.
function spawnEmoji(emoji: string) {
	const layer = layerEl.value;
	if (!layer) return;

	const node = document.createElement("div");
	node.className = "reaction-emoji";
	node.textContent = emoji; // text only, no innerHTML

	// Random horizontal start near the bottom, plus a randomized sway/scale
	// so a burst of identical emoji does not look like a single column.
	// `left` is a percentage of the layer box (the logical slide box), so
	// every emoji stays inside the slide regardless of projector resolution.
	const left = 6 + Math.random() * 82; // %, keep off the extreme edges
	const sway = (Math.random() * 2 - 1) * 60; // px, left/right drift
	const duration = 2200 + Math.random() * 400; // 2.2s - 2.6s
	const rotate = (Math.random() * 2 - 1) * 14; // deg

	node.style.left = `${left}%`;
	node.style.setProperty("--sway", `${sway}px`);
	node.style.setProperty("--rot", `${rotate}deg`);
	node.style.animationDuration = `${duration}ms`;

	// Hard-bound concurrent rendered nodes regardless of inbound rate, so a
	// flood of accepted reactions can never accumulate enough live DOM nodes to
	// tank the projector's framerate. Evict the oldest when at the ceiling.
	const MAX_LIVE = 80;
	if (layer.childElementCount >= MAX_LIVE) {
		const oldest = layer.firstElementChild;
		if (oldest) oldest.remove();
	}

	layer.appendChild(node);

	// Self-removal: prefer animationend, with a timeout safety net so a
	// missed event can never leak a node.
	let removed = false;
	const remove = () => {
		if (removed) return;
		removed = true;
		node.removeEventListener("animationend", remove);
		if (node.parentNode) node.parentNode.removeChild(node);
		pendingTimers.delete(timer);
	};
	node.addEventListener("animationend", remove);
	const timer = setTimeout(remove, duration + 200);
	pendingTimers.add(timer);
}

function onKey(event: KeyboardEvent) {
	// "r" toggles the toolbar (ignore when typing in an input/textarea).
	if (event.key !== "r" && event.key !== "R") return;
	const target = event.target as HTMLElement | null;
	if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
	if (target?.isContentEditable) return;
	showToolbar.value = !showToolbar.value;
}

onMounted(() => {
	// Honor ?stage to start hidden on the projected screen.
	const params = new URLSearchParams(window.location.search);
	if (params.has("stage")) showToolbar.value = false;

	window.addEventListener("keydown", onKey);
	connect();
});

onUnmounted(() => {
	disposed = true;
	window.removeEventListener("keydown", onKey);
	if (reconnectTimer != null) {
		clearTimeout(reconnectTimer);
		reconnectTimer = null;
	}
	for (const timer of pendingTimers) clearTimeout(timer);
	pendingTimers.clear();
	if (socket) {
		try {
			socket.close();
		} catch {
			/* ignore */
		}
		socket = null;
	}
});
</script>

<template>
  <!-- Floating render layer: fixed, full-viewport, never blocks slide clicks. -->
  <div id="reactions-layer" ref="layerEl" aria-hidden="true"></div>

  <!-- Reaction toolbar: hairline white card, bottom-right. -->
  <div v-show="showToolbar" id="reaction-toolbar">
    <button
      v-for="r in REACTIONS"
      :key="r.emoji"
      class="reaction-btn"
      type="button"
      :data-emoji="r.emoji"
      :aria-label="`React: ${r.name}`"
      @click="send(r.emoji)"
    >{{ r.emoji }}</button>
  </div>
</template>

<style scoped>
/* Full-viewport floating layer. pointer-events:none is essential so the
   layer never intercepts slide clicks or navigation. */
#reactions-layer {
  position: absolute;
  inset: 0;
  z-index: 60;
  pointer-events: none;
  overflow: hidden;
}

/* Each floating emoji. Mid-sized, animates up with a gentle sway, scales
   up then fades, then is removed from the DOM by the component. */
:deep(.reaction-emoji) {
  position: absolute;
  bottom: 6%;
  font-size: clamp(56px, 9vmin, 96px);
  line-height: 1;
  user-select: none;
  pointer-events: none;
  will-change: transform, opacity;
  /* default duration is overridden per-node via inline style */
  animation: reaction-float 2400ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
}

@keyframes reaction-float {
  0% {
    transform: translate3d(0, 0, 0) scale(0.6) rotate(0deg);
    opacity: 0;
  }
  12% {
    opacity: 1;
    transform: translate3d(calc(var(--sway) * 0.2), -8%, 0) scale(1.05)
      rotate(calc(var(--rot) * 0.3));
  }
  70% {
    opacity: 1;
  }
  100% {
    transform: translate3d(var(--sway), -78%, 0) scale(1.15) rotate(var(--rot));
    opacity: 0;
  }
}

/* Toolbar: hairline white card per the deck design language. */
#reaction-toolbar {
  position: absolute;
  right: 1.25rem;
  bottom: 1.25rem;
  z-index: 70;
  display: flex;
  gap: 0.4rem;
  padding: 0.4rem;
  background: #ffffff;
  border: 1px solid #d4d4d1;
  border-radius: 14px;
  box-shadow: 0 1px 2px rgba(10, 10, 10, 0.05);
  font-family: 'Geist Mono', 'SF Mono', Menlo, monospace;
}

.reaction-btn {
  appearance: none;
  -webkit-appearance: none;
  border: 1px solid transparent;
  background: transparent;
  border-radius: 10px;
  width: 3rem;
  height: 3rem;
  padding: 0;
  font-size: 1.6rem;
  line-height: 1;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.12s ease, border-color 0.12s ease,
    transform 0.06s ease;
}

.reaction-btn:hover {
  background: rgba(26, 92, 255, 0.06);
  border-color: rgba(26, 92, 255, 0.22);
}

.reaction-btn:focus-visible {
  outline: none;
  border-color: #1a5cff;
  box-shadow: 0 0 0 2px rgba(26, 92, 255, 0.25);
}

/* Subtle press feedback using the blue accent spark. */
.reaction-btn:active {
  transform: scale(0.92);
  background: rgba(26, 92, 255, 0.14);
  border-color: #1a5cff;
}

@media (max-width: 768px) {
  #reaction-toolbar {
    right: 0.75rem;
    bottom: 0.75rem;
  }
  .reaction-btn {
    width: 2.6rem;
    height: 2.6rem;
    font-size: 1.4rem;
  }
}
</style>
