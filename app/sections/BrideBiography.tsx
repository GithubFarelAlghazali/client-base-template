"use client";
import { brideInfo } from "../helpers/data";
import Image from "next/image";
import MyImg from "../components/MyImg";
import { motion, HTMLMotionProps } from "framer-motion";
import pengantinPria from "../assets/pengantin.png";
import flower from "../assets/flower-middle.png";

export default function BrideBiography() {
  const fadeInUp: HTMLMotionProps<"li"> = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  return (
    <div className="w-full py-24 flex justify-center items-center flex-col overflow-hidden">
      <ul className="text-center gap-12 flex justify-evenly flex-col">
        <motion.li {...fadeInUp}>
          <MyImg
            title="Foto: Penampilan Citra Kirana Jadi Pengantin Sunda, Cantik Manglingi"
            imgPublicSource="detik.com"
            author="Imagenic Wedding Photography"
            src={pengantinPria}
            className="rounded-t-full w-[90%] border-rose-950 border-2 mx-auto mb-4"
          />
          <h3 className="font-fancy text-6xl text-rose-900 mb-2">
            {brideInfo.man.name}
          </h3>
          <p className="text-stone-600">
            Putra Bapak {brideInfo.man.father} & Ibu {brideInfo.man.mom}
          </p>
        </motion.li>

        <motion.li {...fadeInUp} transition={{ duration: 0.6, delay: 0.2 }}>
          <MyImg
            src={flower}
            title="mesus amores"
            size="small"
            author="olivia ferreira"
            imgPublicSource="Pinterest"
            className="mx-auto w-72"
          />
        </motion.li>

        <motion.li {...fadeInUp}>
          <MyImg
            title="Foto: Penampilan Citra Kirana Jadi Pengantin Sunda, Cantik Manglingi"
            imgPublicSource="detik.com"
            author="Imagenic Wedding Photography"
            src={pengantinPria}
            className="rounded-t-full w-[90%] border-rose-950 border-2 mx-auto mb-4"
          />
          <h3 className="font-fancy text-6xl text-rose-900 mb-2">
            {brideInfo.woman.name}
          </h3>
          <p className="text-stone-600">
            Putri Bapak {brideInfo.woman.father} & Ibu {brideInfo.woman.mom}
          </p>
        </motion.li>
      </ul>
    </div>
  );
}
