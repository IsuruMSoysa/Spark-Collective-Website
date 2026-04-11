"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

import Image from "next/image";

const SparksCanvas = dynamic(() => import("./SparksCanvas"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-background z-0 flex items-center justify-center" aria-hidden="true">
      <Image 
        src="/2.png" 
        alt="Spark Collective Logo" 
        width={200} 
        height={200} 
        className="opacity-20 animate-pulse"
      />
    </div>
  ),
});

export default function Hero() {
  return (
    <section
      id="about"
      className="scroll-mt-24 md:scroll-mt-32 relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
    >
      {/* 3D Background */}
      <SparksCanvas />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6"
        >
          <span className="text-accent">Igniting</span> Corporate Impact.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Strategic brand activation that transforms corporate vision into
          measurable momentum. We fuel the sparks that drive global industry
          leaders.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        >
          <a
            href="#services"
            className="inline-flex items-center px-6 py-3 md:px-8 md:py-4 rounded-full bg-accent text-black font-semibold text-base md:text-lg transition-transform hover:scale-105 active:scale-95"
          >
            Explore Our Approach
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-zinc-500">
          Scroll to explore
        </span>
        <div className="w-px h-12 bg-linear-to-b from-accent to-transparent" />
      </motion.div>
    </section>
  );
}
