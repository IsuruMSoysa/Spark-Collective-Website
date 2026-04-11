"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ScrollSectionProps {
  children: React.ReactNode;
  index: number;
  /** Document fragment for in-page nav; placed on the scroll track root (not sticky inner). */
  id?: string;
}

export default function ScrollSection({ children, index, id }: ScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking for this section
  // We want to track the scroll progress as this section moves through the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Simplified scroll logic: remove scale zoom, keep opacity fade
  const opacity = useTransform(
    smoothProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );

  const zIndex = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [index, index + 10, index]
  );

  return (
    <div
      id={id}
      ref={containerRef}
      className={`relative h-auto w-full md:h-[150vh]${id ? " scroll-mt-24 md:scroll-mt-32" : ""}`}
      style={{ zIndex: index, position: "relative" }}
    >
      {/* Mobile: no fixed viewport height or overflow clip — Services and other tall blocks need full natural height. */}
      <div className="relative flex w-full items-center justify-center overflow-visible py-8 md:sticky md:top-0 md:h-screen md:overflow-hidden md:py-0">
        <motion.div
          style={{
            opacity,
            zIndex,
            willChange: "opacity",
          }}
          className="flex w-full items-center justify-center px-4 md:h-full md:px-8"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
