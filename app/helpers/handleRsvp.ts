export default function handleRsvp(fullName: string, presence: string) {
	const phoneNumber = "6281234567890";

	const statusText = presence === "hadir" ? "Hadir ✅" : "Tidak Bisa Hadir ❌";
	const message = `Halo, saya ingin mengonfirmasi kehadiran untuk acara pernikahan.\n\n*Nama:* ${fullName}\n*Status:* ${statusText}`;

	const encodedMessage = encodeURIComponent(message);

	const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
	window.open(whatsappUrl, "_blank");
}
