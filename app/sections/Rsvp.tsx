"use client";
import { useState } from "react";
import handleRsvp from "../helpers/handleRsvp";
import MyImg from "../components/MyImg";
import { motion, AnimatePresence } from "framer-motion";
import corner1 from "../assets/flower-corner-2.png";
import corner2 from "../assets/flower-corner-3.png";

export default function Rsvp({ guestId }: { guestId: string }) {
  const [message, setMessage] = useState("");
  const [presence, setPresence] = useState("hadir");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const success = await handleRsvp(message, presence, guestId);
    setIsSubmitting(false);

    if (success) {
      setShowSuccessToast(true);

      // Hilangkan toast secara otomatis setelah 3 detik
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 3000);
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="w-full h-screen bg-rose-950 text-white flex justify-center items-center flex-col gap-8 relative px-4 overflow-hidden"
    >
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-10 z-50 bg-emerald-600 text-white px-6 py-3.5 rounded-xl shadow-2xl border border-emerald-400/30 flex items-center gap-3 backdrop-blur-md"
          >
            <svg
              className="w-5 h-5 text-white shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="font-medium text-sm tracking-wide">
              Kehadiran berhasil dikonfirmasi
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Flowers */}
      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0.9 },
          visible: { opacity: 1, scale: 1 },
        }}
        transition={{ duration: 0.8 }}
        className="absolute -bottom-10 -right-10 size-64 pointer-events-none"
      >
        <MyImg
          title="PNG Burgundy and Pink Roses Floral Corner Clipart"
          author="Multimedia Software (stockbyai)"
          imgPublicSource="nohat.cc"
          src={corner1}
          className="w-full h-full"
        />
      </motion.div>

      <motion.div
        variants={{
          hidden: { opacity: 0, scale: 0.9, rotate: 180 },
          visible: { opacity: 1, scale: 1, rotate: 180 },
        }}
        transition={{ duration: 0.8 }}
        className="absolute -top-10 -left-20 size-72 pointer-events-none"
      >
        <MyImg
          title="PNG Burgundy and Pink Roses Floral Corner Clipart"
          author="Multimedia Software (stockbyai)"
          imgPublicSource="nohat.cc"
          src={corner2}
          className="w-full h-full"
        />
      </motion.div>

      {/* Form Elements Content */}
      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-xl tracking-wide"
      >
        Konfirmasi Kehadiran
      </motion.h2>

      <motion.form
        onSubmit={onSubmit}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="w-full max-w-sm flex flex-col gap-5 bg-white/10 p-6 rounded-2xl backdrop-blur-sm z-10 border border-white/20"
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="presence"
            className="text-sm font-medium tracking-wider text-rose-200"
          >
            Konfirmasi Kehadiran
          </label>
          <select
            id="presence"
            value={presence}
            onChange={(e) => setPresence(e.target.value)}
            className="w-full p-3 rounded-lg bg-white text-rose-950 outline-none focus:ring-2 focus:ring-rose-400 font-medium appearance-none cursor-pointer"
          >
            <option value="hadir">Saya akan Hadir</option>
            <option value="absen">Maaf, saya tidak bisa Hadir</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="message"
            className="text-sm font-medium tracking-wider text-rose-200"
          >
            Pesan
          </label>
          <textarea
            id="message"
            placeholder="Sampaikan Pesan"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 rounded-lg bg-white text-rose-950 outline-none focus:ring-2 focus:ring-rose-400 font-medium placeholder:text-gray-400"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full bg-white text-rose-950 font-bold p-3.5 rounded-lg cursor-pointer transition-all hover:bg-rose-100 shadow-lg tracking-wide text-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Mengirim..." : "Kirim"}
        </button>
      </motion.form>
    </motion.div>
  );
}
