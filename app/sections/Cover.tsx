"use client";
import { ReactNode, useEffect, useState } from "react";
import { brideInfo } from "../helpers/data";
import { handleScrollable, getScrollable } from "../helpers/handleScrollable";
import { playGlobalMusic } from "../helpers/handleMusic";
import seal from "../assets/wax-seal.png";
import Image from "next/image";
import MyImg from "../components/MyImg";

export default function Cover({
  children,
  guestName,
}: {
  children: ReactNode;
  guestName: string;
}) {
  // for preview needs. For production, uncomment the useEffect and const value on top

  const [isOpen, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  // const [isOpen, setOpen] = useState(() => getScrollable());
  const [animStep, setAnimStep] = useState(0);

  useEffect(() => {
    const alreadyOpen = getScrollable();
    setOpen(alreadyOpen);
    setMounted(true);

    if (alreadyOpen) {
      setAnimStep(4);
    }
  }, []);

  if (!mounted) return null;

  const handleOpen = () => {
    if (animStep > 0) return;

    setAnimStep(1);
    if (handleScrollable) {
      setOpen(!isOpen);
      handleScrollable(true);
    }
    // uncomment when on prod
    setOpen(true);

    setTimeout(() => {
      setAnimStep(2);
      setTimeout(() => {
        setAnimStep(3);
        setTimeout(() => {
          setAnimStep(4);
          playGlobalMusic();
        }, 500);
      }, 500);
    }, 500);
  };

  const getLetterClass = () => {
    const baseClass =
      "rounded-xl bg-white absolute overflow-y-auto overflow-x-hidden scrollbar-none transition-all duration-500 shadow-2xl border border-amber-100 ";

    if (animStep === 0 || animStep === 1) {
      return baseClass + "inset-2  translate-y-0";
    } else if (animStep === 2) {
      return baseClass + "inset-2 z-10 -translate-y-64";
    } else if (animStep === 3) {
      return baseClass + "inset-2 z-96 -translate-y-62";
    } else {
      return baseClass + "inset-0 h-[90vh] z-50 top-1/2 -translate-y-1/2";
    }
  };

  return (
    <div
      className="flex items-center flex-col gap-5 relative justify-center h-screen "
      style={{ perspective: "1000px" }}
    >
      {/* body amplop keseluruhan */}
      <div
        className="w-96 aspect-video bg-rose-600 relative rounded-xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* penutup amplop */}
        <div
          className={
            "flex text-white text-center rounded-xl justify-center pt-5 bg-rose-900 w-full transition-transform duration-500 h-full absolute z-10  origin-top " +
            (isOpen ? "rotate-x-180" : "")
          }
          style={{
            clipPath: " polygon(50% 50%, 100% 25%, 100% 0, 0 0, 0 25%)",
            transform: animStep >= 1 ? "rotateX(180deg)" : "rotateX(0deg)",
          }}
        >
          <h1 className="font-fancy">
            Wedding of
            <br />
            <span className="text-3xl">
              {brideInfo.man.nickname} & {brideInfo.woman.nickname}
            </span>
          </h1>
        </div>
        <button
          onClick={handleOpen}
          className={`absolute size-20 bottom-1/2 z-40 right-1/2  text-white  cursor-pointer rounded-full translate-x-1/2 translate-y-1/2   transition-all duration-300 active:scale-95 ${
            animStep > 0
              ? "opacity-0 pointer-events-none scale-75"
              : "opacity-100 scale-100"
          }`}
        >
          <MyImg
            src={seal}
            title="Golden wax stamp"
            imgPublicSource="Pinterest"
            author="Geet_22"
            className="w-full"
          />
        </button>

        {/* isi surat */}
        <div className={getLetterClass()}>
          <div className=" h-full">{children}</div>
        </div>

        {/* depan amplop */}
        <div
          className="bg-rose-700 rounded-xl w-full h-full absolute z-30"
          style={{
            clipPath: "polygon(50% 50%, 100% 25%, 100% 100%, 0 100%, 0 25%)",
          }}
        ></div>
      </div>
      <div className="flex flex-col [&_span]:font-semibold text-center">
        Kepada Yth.
        <span>{guestName}</span>
      </div>
    </div>
  );
}
