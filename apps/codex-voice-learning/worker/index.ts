import { DurableObject } from "cloudflare:workers";

export interface Env {
	REACTIONS: DurableObjectNamespace<ReactionRoom>;
	ASSETS: Fetcher;
}

// Server-side allowlist. A rendered emoji must originate from this set —
// anything else is dropped before it can be broadcast.
const ALLOWED = ["🐢", "🙋", "🍟"] as const;
type Allowed = (typeof ALLOWED)[number];

// Per-socket throttle window. Keeps one over-eager client from flooding
// the room while still feeling instant for normal tapping. Kept loose
// (~16 taps/sec/socket) so normal button-mashing isn't silently swallowed;
// the room-wide cap below is what actually bounds the projected screen.
const THROTTLE_MS = 60;

// Room-wide broadcast budget. A single client can open many sockets, so the
// per-socket throttle alone cannot bound the projected screen. This caps the
// total number of *accepted* reactions per second across the entire room.
// Note: each accept fans out to every connected socket, so actual outbound
// volume is roughly (this cap) x (socket count). Keep it low so peak fan-out
// stays sane — 40/sec x up to MAX_SOCKETS is still plenty lively for a crowd,
// and the client-side live-node cap keeps the projector smooth on top of this.
const ROOM_MAX_BROADCASTS_PER_SEC = 40;

// Hard ceiling on concurrent sockets to the room, so one client cannot
// amplify by opening an unbounded number of connections.
const MAX_SOCKETS = 400;

// Hard cap on inbound frame size. Reaction frames are tiny; anything larger
// is malformed or hostile and gets rejected before JSON.parse.
const MAX_MESSAGE_BYTES = 256;

function isAllowed(value: unknown): value is Allowed {
	return (
		typeof value === "string" && (ALLOWED as readonly string[]).includes(value)
	);
}

/**
 * One global room ("talk") coordinates every connected viewer of the deck.
 * It is the single coordination atom for this talk: a tap goes up over a
 * WebSocket, the room validates + throttles it, then fans the echo back out
 * to every socket (including the sender). Clients render only on that echo,
 * so a visible emoji proves the full round trip.
 *
 * Uses the WebSocket Hibernation API: sockets are accepted via
 * ctx.acceptWebSocket so the DO can be evicted from memory between events
 * without dropping connections.
 */
export class ReactionRoom extends DurableObject<Env> {
	// Last-send timestamp per socket, used for throttling. In-memory only:
	// it is acceptable for this to reset across hibernation (worst case a
	// client gets one un-throttled frame right after the DO wakes).
	private lastSeen = new Map<WebSocket, number>();

	// Room-wide rate-limit window. In-memory only: like lastSeen above, it is
	// acceptable for this to reset across hibernation (worst case the room gets
	// one fresh budget window right after the DO wakes).
	private windowStart?: number;
	private windowCount = 0;

	override async fetch(req: Request): Promise<Response> {
		if (req.headers.get("Upgrade") !== "websocket") {
			return new Response("Expected WebSocket upgrade", { status: 426 });
		}

		// Cap concurrent connections so one client cannot amplify by opening many.
		if (this.ctx.getWebSockets().length >= MAX_SOCKETS) {
			return new Response("Room full", { status: 503 });
		}

		const pair = new WebSocketPair();
		const client = pair[0];
		const server = pair[1];

		// Hand the server socket to the runtime so this DO can hibernate.
		this.ctx.acceptWebSocket(server);

		return new Response(null, { status: 101, webSocket: client });
	}

	override async webSocketMessage(
		ws: WebSocket,
		message: ArrayBuffer | string,
	): Promise<void> {
		// Reject oversized payloads before doing any parsing work.
		const size =
			typeof message === "string" ? message.length : message.byteLength;
		if (size > MAX_MESSAGE_BYTES) return;

		const raw =
			typeof message === "string" ? message : new TextDecoder().decode(message);

		let parsed: unknown;
		try {
			parsed = JSON.parse(raw);
		} catch {
			return;
		}

		if (
			typeof parsed !== "object" ||
			parsed === null ||
			(parsed as { t?: unknown }).t !== "react"
		) {
			return;
		}

		const emoji = (parsed as { e?: unknown }).e;
		if (!isAllowed(emoji)) return;

		// Per-socket throttle. Drop frames that arrive faster than THROTTLE_MS.
		const now = Date.now();
		const previous = this.lastSeen.get(ws) ?? 0;
		if (now - previous < THROTTLE_MS) return;
		this.lastSeen.set(ws, now);

		// Room-wide throttle: cap total broadcasts/sec no matter how many sockets
		// one client opens. This is what bounds the projected screen against a
		// client that amplifies by opening many connections.
		this.windowStart ??= now;
		if (now - this.windowStart >= 1000) {
			this.windowStart = now;
			this.windowCount = 0;
		}
		if (this.windowCount >= ROOM_MAX_BROADCASTS_PER_SEC) return;
		this.windowCount += 1;

		// Broadcast the validated reaction to every connected socket, including
		// the original sender — this echo is the single render trigger.
		const payload = JSON.stringify({ t: "react", e: emoji });
		for (const socket of this.ctx.getWebSockets()) {
			try {
				socket.send(payload);
			} catch {
				// Best effort: a socket mid-teardown can throw; ignore it.
			}
		}
	}

	override async webSocketClose(ws: WebSocket): Promise<void> {
		this.lastSeen.delete(ws);
		try {
			ws.close();
		} catch {
			// Already closing; nothing to do.
		}
	}

	override async webSocketError(ws: WebSocket): Promise<void> {
		this.lastSeen.delete(ws);
		try {
			ws.close();
		} catch {
			// Already errored/closing; nothing to do.
		}
	}
}

export default {
	async fetch(req: Request, env: Env): Promise<Response> {
		const url = new URL(req.url);

		if (url.pathname === "/api/reactions/ws") {
			if (req.headers.get("Upgrade") !== "websocket") {
				return new Response("Expected WebSocket upgrade", { status: 426 });
			}
			// Single global room: every viewer joins "talk".
			return env.REACTIONS.getByName("talk").fetch(req);
		}

		// Everything else is the built Slidev deck (static assets).
		return env.ASSETS.fetch(req);
	},
} satisfies ExportedHandler<Env>;
