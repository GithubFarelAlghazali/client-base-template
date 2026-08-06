"use client";
import { motion, Variants } from "framer-motion";
import { brideInfo } from "../helpers/data";

export default function Footer() {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={containerVariants}
      className="w-full py-24 text-white bg-rose-950 flex justify-center items-center flex-col overflow-hidden"
    >
      <motion.h2 variants={itemVariants} className="text-xl">
        Kami tunggu kehadiran Anda
      </motion.h2>

      <motion.div
        variants={itemVariants}
        className="flex flex-col w-32 justify-center mx-auto relative font-fancy text-5xl my-12"
      >
        <h2 className="self-start">{brideInfo.man.nickname}</h2>
        <motion.span
          variants={{
            hidden: { opacity: 0, scale: 0.7 },
            visible: { opacity: 1, scale: 1 },
          }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="font-base absolute text-3xl left-1/2 -translate-x-1/2"
        >
          &
        </motion.span>
        <h2 className="self-end">{brideInfo.woman.nickname}</h2>
      </motion.div>

      <motion.p variants={itemVariants} className="opacity-70 text-sm">
        KasiSlamat © 2026
      </motion.p>
    </motion.div>
  );
}
