"use client";
import { useState, useEffect } from "react";
import { eventInfo } from "../helpers/data";
import addToCalendar from "../helpers/addToCalendar";
import { BiCalendar } from "react-icons/bi";
import { motion, Variants } from "framer-motion";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const difference =
        new Date(eventInfo.resepsi.date).getTime() - new Date().getTime();

      if (difference <= 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const buttonText = "Tambah ke Kalender";

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className=" w-full py-24 flex justify-center items-center flex-col overflow-hidden"
    >
      <motion.h2 variants={itemVariants} className="text-3xl">
        Hitung Mundur Resepsi
      </motion.h2>

      <motion.div
        variants={itemVariants}
        className="flex gap-4 justify-center items-center bg-rose-950 text-white p-4 text-center my-12 w-[80%] max-w-2xl shadow-lg"
      >
        <div>
          <span className="text-4xl font-light">{timeLeft.days}</span>
          <br />
          <span className="text-sm tracking-wider opacity-80">Hari</span>
        </div>
        <span className="text-4xl opacity-50 -translate-y-2">:</span>
        <div>
          <span className="text-4xl font-light">{timeLeft.hours}</span>
          <br />
          <span className="text-sm tracking-wider opacity-80">Jam</span>
        </div>
        <span className="text-4xl opacity-50 -translate-y-2">:</span>
        <div>
          <span className="text-4xl font-light">{timeLeft.minutes}</span>
          <br />
          <span className="text-sm tracking-wider opacity-80">Menit</span>
        </div>
        <span className="text-4xl opacity-50 -translate-y-2">:</span>
        <div>
          <span className="text-4xl font-light">{timeLeft.seconds}</span>
          <br />
          <span className="text-sm tracking-wider opacity-80">Detik</span>
        </div>
      </motion.div>

      <motion.button
        variants={itemVariants}
        className="bg-rose-950 text-white p-5 cursor-pointer flex justify-center gap-3 items-center shadow-md "
        onClick={() => addToCalendar()}
      >
        <motion.div
          variants={{
            hidden: { scale: 0, opacity: 0 },
            visible: { scale: 1, opacity: 1, transition: { delay: 0.6 } },
          }}
        >
          <BiCalendar className="size-8" />
        </motion.div>

        <motion.span
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.04, delayChildren: 0.8 },
            },
          }}
          className="flex select-none"
        >
          {buttonText.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={{
                hidden: { opacity: 0, display: "none" },
                visible: { opacity: 1, display: "inline-block" },
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.span>
      </motion.button>
    </motion.div>
  );
}
