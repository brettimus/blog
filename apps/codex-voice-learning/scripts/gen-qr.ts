import QRCode from "qrcode";
const url = "https://codex-voice-learning.boots.lol";
await QRCode.toFile("public/qr-codex-voice-learning.svg", url, {
	type: "svg",
	margin: 1,
	color: { dark: "#0a0a0a", light: "#00000000" },
});
console.log("wrote public/qr-codex-voice-learning.svg ->", url);
