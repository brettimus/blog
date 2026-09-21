import QRCode from "qrcode";
const url = "https://walks.boots.lol";
await QRCode.toFile("public/qr-walks.svg", url, {
	type: "svg",
	margin: 1,
	color: { dark: "#0a0a0a", light: "#00000000" },
});
console.log("wrote public/qr-walks.svg ->", url);
