"use client";
import { motion } from "framer-motion";
import { StaticImageData } from "next/image";
import MyImg from "../components/MyImg";
import foto from "../assets/pengantin.png";

interface PolaroidPhoto {
  src: string | StaticImageData;
  title: string;
  imgPublicSource: string;
  author?: string;
}

interface PolaroidProps {
  photo: PolaroidPhoto;
  className?: string;
  rotateHover: number;
}

function PolaroidCard({ photo, className, rotateHover }: PolaroidProps) {
  return (
    <motion.li
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0, scale: 0.8, rotate: 0 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.3 },
        },
        hover: {
          rotate: rotateHover,
          scale: 1.05,
          transition: { duration: 0.3, ease: "easeInOut" },
        },
      }}
      className={`bg-white px-2 pt-2 py-12 w-56 shadow-xl relative border border-rose-950 ${className}`}
    >
      <motion.div
        variants={{ hidden: { scale: 0 }, visible: { scale: 1 } }}
        className="rounded-full size-5 bg-amber-800 absolute -top-3 left-1/2 -translate-x-1/2 shadow-xl flex justify-center items-center"
      >
        <div className="rounded-full size-3 bg-amber-700"></div>
      </motion.div>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <MyImg
          src={photo.src}
          title={photo.title}
          imgPublicSource={photo.imgPublicSource}
          author={photo.author}
          size="small"
          className="w-full"
        />
      </motion.div>
    </motion.li>
  );
}

const photos: PolaroidPhoto[] = [
  {
    src: foto,
    title: "Foto pengantin",
    imgPublicSource: "Dokumentasi pribadi",
  },
  {
    src: foto,
    title: "Foto pengantin",
    imgPublicSource: "Dokumentasi pribadi",
  },
  {
    src: foto,
    title: "Foto pengantin",
    imgPublicSource: "Dokumentasi pribadi",
  },
];

export default function BrideStory() {
  return (
    <div className="w-full py-24 flex justify-center items-center flex-col bg-rose-950 text-white overflow-hidden">
      <h2 className="text-5xl mb-12">Kisah Kami</h2>
      <ul className="flex flex-col w-[70%] gap-12">
        {photos.map((photo, i) => (
          <PolaroidCard
            key={i}
            photo={photo}
            className={i % 2 === 0 ? "self-start" : "self-end"}
            rotateHover={i % 2 === 0 ? 6 : -6}
          />
        ))}
      </ul>
    </div>
  );
}
