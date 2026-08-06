import Image from "next/image";
import saber from "../assets/saber.webp";

export default function PhotoGallery() {
	return (
		<div className="w-full h-screen flex justify-center items-center flex-col">
			<h2>PhotoGallery</h2>
			<div className="rounded-full aspect-square size-96 overflow-hidden flex justify-center items-center">
				<Image src={saber} width={200} height={200} className="min-w-full min-h-full" alt={"fotoaja"} />
			</div>
		</div>
	);
}
