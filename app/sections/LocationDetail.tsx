"use client";
import { useEffect, useRef } from "react";
import { eventInfo } from "../helpers/data";
import { readableDate } from "../helpers/dateConvert";
import MyImg from "../components/MyImg";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  useInView,
  Variants,
} from "framer-motion";
import corner1 from "../assets/flower-corner-3.png";
import corner2 from "../assets/flower-corner-4.png";

function AnimatedDay({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration: 1.5,
        ease: "easeOut",
      });
      return controls.stop;
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    return rounded.on("change", (latest) => {
      if (ref.current) ref.current.textContent = String(latest);
    });
  }, [rounded]);

  return (
    <motion.span ref={ref} className="text-[9em] font-light block leading-none">
      0
    </motion.span>
  );
}

export default function LocationDetail() {
  const akadDay = parseInt(readableDate(eventInfo.akad.date).day) || 0;
  const resepsiDay = parseInt(readableDate(eventInfo.resepsi.date).day) || 0;

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.2, delayChildren: 0.6 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="w-full flex justify-center items-center flex-col bg-rose-950 text-white px-8 py-24 overflow-hidden">
      <ul className="flex justify-evenly w-[90%] text-center flex-col gap-20 max-w-4xl">
        {/* 1. AKAD CARD */}
        <motion.li
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="bg-white text-rose-950 py-8 relative shadow-xl rounded-sm"
        >
          <motion.h3 variants={itemVariants} className="text-3xl font-medium">
            Akad
          </motion.h3>

          <AnimatedDay value={akadDay} />

          <motion.span variants={itemVariants} className="text-3xl block">
            {readableDate(eventInfo.akad.date).monthAndYear}
          </motion.span>
          <motion.hr
            variants={itemVariants}
            className="w-[90%] mx-auto my-5 border-rose-950/20"
          />
          <motion.p variants={itemVariants} className="text-2xl px-4">
            {eventInfo.akad.location}
          </motion.p>

          {/* Flower: Fades in first */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute -bottom-18 -right-18 pointer-events-none"
          >
            <MyImg
              title="PNG Burgundy and Pink Roses Floral Corner Clipart"
              author="Multimedia Software (stockbyai)"
              imgPublicSource="nohat.cc"
              size="small"
              className="size-44"
              src={corner1}
            />
          </motion.div>
        </motion.li>

        {/* 2. RESEPSI CARD */}
        <motion.li
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="bg-white text-rose-950 py-8 relative shadow-xl rounded-sm"
        >
          <motion.h3 variants={itemVariants} className="text-3xl font-medium">
            Resepsi
          </motion.h3>

          <AnimatedDay value={resepsiDay} />

          <motion.span variants={itemVariants} className="text-3xl block">
            {readableDate(eventInfo.resepsi.date).monthAndYear}
          </motion.span>
          <motion.hr
            variants={itemVariants}
            className="w-[90%] mx-auto my-5 border-rose-950/20"
          />
          <motion.p variants={itemVariants} className="text-2xl px-4">
            {eventInfo.resepsi.location}
          </motion.p>

          {/* Flower: Fades in first */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute -top-20 -left-12 rotate-90 size-44 pointer-events-none"
          >
            <MyImg
              title="PNG Burgundy and Pink Roses Floral Corner Clipart"
              author="Multimedia Software (stockbyai)"
              imgPublicSource="nohat.cc"
              src={corner2}
              className="w-full h-full"
            />
          </motion.div>
        </motion.li>
      </ul>
    </div>
  );
}
