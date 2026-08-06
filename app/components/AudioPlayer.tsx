"use client";
import { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { motion } from "framer-motion";
import { PLAY_EVENT, PAUSE_EVENT } from "../helpers/handleMusic";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/base-music.mp3");
    audioRef.current.loop = true;

    const handleExternalPlay = () => {
      audioRef.current?.play().catch((err) => console.log(err));
      setIsPlaying(true);
    };

    const handleExternalPause = () => {
      audioRef.current?.pause();
      setIsPlaying(false);
    };

    window.addEventListener(PLAY_EVENT, handleExternalPlay);
    window.addEventListener(PAUSE_EVENT, handleExternalPause);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      window.removeEventListener(PLAY_EVENT, handleExternalPlay);
      window.removeEventListener(PAUSE_EVENT, handleExternalPause);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => console.log(err));
      setIsPlaying(true);
    }
  };

  return (
    <motion.button
      onClick={togglePlay}
      className="fixed bottom-6 right-6 size-12 rounded-full bg-rose-900 text-white z-50 flex justify-center items-center shadow-2xl"
    >
      {isPlaying ? <FaPause /> : <FaPlay className="pl-0.5" />}
    </motion.button>
  );
}
