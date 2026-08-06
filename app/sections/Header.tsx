import { brideInfo } from "../helpers/data";
import corner1 from "../assets/flower-corner-1.png";
import corner2 from "../assets/flower-corner-2.png";
import MyImg from "../components/MyImg";

export default function Header() {
  return (
    <header className="w-full h-screen flex justify-center gap-10 items-center flex-col relative">
      <MyImg
        src={corner1}
        title="PNG Burgundy and Pink Roses Floral Corner Clipart"
        author="Multimedia Software (stockbyai)"
        imgPublicSource="nohat.cc"
        className="absolute -top-5 rotate-90 -left-8 size-44"
      />
      <MyImg
        src={corner2}
        title="PNG Burgundy and Pink Roses Floral Corner Clipart"
        author="Multimedia Software (stockbyai)"
        imgPublicSource="nohat.cc"
        className="absolute bottom-10 -right-8 size-44"
      />
      <h2 className="text-xl">Wedding of</h2>
      <div className="flex flex-col  w-[60%] justify-center mx-auto text-rose-900 relative font-fancy text-9xl">
        <h2 className=" self-start">{brideInfo.man.nickname}</h2>
        <span className="font-base text-slate-900 absolute text-8xl left-1/2 -translate-x-1/2">
          &
        </span>
        <h2 className="self-end">{brideInfo.woman.nickname}</h2>
      </div>
      <h2 className="text-3xl">24 08 2026</h2>
    </header>
  );
}
