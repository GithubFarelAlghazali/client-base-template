export default function PrayForm() {
	return (
		<div className="w-full h-screen flex justify-center items-center flex-col">
			<h2>Beri ucapan</h2>
			<form action="" className="flex-col flex gap-2">
				<input className="bg-white" type="text" placeholder="Nama anda" />
				<textarea className="bg-white" rows={3} cols={10} placeholder="Nama anda" />
				<button type="submit">Kirim ucapan</button>
			</form>
		</div>
	);
}
