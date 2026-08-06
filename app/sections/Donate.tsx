"use client";
import { donateInfo } from "../helpers/data";
import { FaCopy } from "react-icons/fa";
import MyImg from "../components/MyImg";
import flower from "../assets/flower-middle.png";
import { motion } from "framer-motion";

export default function Donate() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="relative w-full px-10 min-h-screen pb-24 flex justify-center items-center flex-col"
    >
      <MyImg
        src={flower}
        title="mesus amores"
        size="small"
        author="olivia ferreira"
        imgPublicSource="Pinterest"
        className="absolute -top-20 mx-auto w-56"
      />

      <motion.h2 variants={fadeInUp} className="text-3xl my-12">
        Hadiah Pernikahan
      </motion.h2>

      <ul className="flex flex-col gap-5 w-full">
        {donateInfo.map((donate, i) => {
          return (
            <motion.li
              key={i}
              variants={fadeInUp}
              transition={{ delay: i * 0.1 }}
              className="w-full bg-rose-950 text-center text-white p-5"
            >
              <h3 className="text-xl">{donate.bank}</h3>
              <h4 className="text-3xl my-5 flex gap-3 justify-center items-center">
                {donate.numbers}{" "}
                <button
                  className="cursor-pointer"
                  onClick={() => navigator.clipboard.writeText(donate.numbers)}
                >
                  <FaCopy />
                </button>
              </h4>
              <motion.hr
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="origin-center"
              />
              <p>Atas nama {donate.name}</p>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}
