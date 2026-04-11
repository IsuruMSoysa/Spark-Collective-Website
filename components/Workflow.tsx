"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description: "Deep-dive into brand DNA and market positioning to identify unique opportunities.",
  },
  {
    number: "02",
    title: "Strategy",
    description: "Architect the activation framework and define measurable success metrics.",
  },
  {
    number: "03",
    title: "Creation",
    description: "Build high-impact campaign assets and deliverables that resonate with stakeholders.",
  },
  {
    number: "04",
    title: "Launch",
    description: "Execute across all channels with precision and real-time monitoring.",
  },
  {
    number: "05",
    title: "Optimize",
    description: "Measure, iterate, and scale based on data-driven performance insights.",
  },
];

export default function Workflow() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="workflow"
      ref={containerRef}
      className="scroll-mt-24 md:scroll-mt-32 w-full max-w-5xl mx-auto px-4 py-12 md:py-24 relative"
      style={{ position: "relative" }}
    >
      <div className="text-center mb-10 md:mb-20">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">The Spark Process</h2>
        <p className="text-zinc-500 uppercase tracking-widest text-sm">How we drive impact</p>
      </div>

      <div className="relative">
        {/* Central Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-zinc-800 hidden md:block" />
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-accent origin-top hidden md:block"
          style={{ scaleY }}
        />

        <div className="space-y-12 md:space-y-32">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Content Card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full md:w-[45%] glass p-5 md:p-8 rounded-2xl relative group"
              >
                <div className="text-accent font-bold text-3xl md:text-4xl mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {step.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>

              {/* Center Node */}
              <div className="relative z-10 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-background border border-accent">
                <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
              </div>

              {/* Spacer for desktop */}
              <div className="hidden md:block w-[45%]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
