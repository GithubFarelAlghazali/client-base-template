"use client";
import MyImg from "../components/MyImg";
import { motion } from "framer-motion";
import flower from "../assets/flower-middle.png";

export default function Quotes() {
  return (
    <div className="w-full py-24 flex justify-center items-center flex-col bg-rose-950 text-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center max-w-4xl px-4"
      >
        <MyImg
          src={flower}
          title="mesus amores"
          author="olivia ferreira"
          imgPublicSource="Pinterest"
          size="small"
          className="mb-6 w-56"
        />
        <p className="text-center p-4 leading-relaxed text-sm">
          Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan
          pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa
          tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih
          sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat
          tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.
          <br />
          <br />
          Q.S. Ar Rum ayat 21
        </p>
      </motion.div>
    </div>
  );
}
