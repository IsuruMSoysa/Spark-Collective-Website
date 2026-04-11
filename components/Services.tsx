"use client";

import React from "react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Brand Strategy",
    description: "Corporate positioning and market differentiation for global leaders.",
    icon: "🎯",
  },
  {
    title: "Campaign Architecture",
    description: "Multi-channel campaign design and execution with high precision.",
    icon: "🏗️",
  },
  {
    title: "Stakeholder Engagement",
    description: "Internal and external communication frameworks that drive alignment.",
    icon: "🤝",
  },
  {
    title: "Performance Analytics",
    description: "Data-driven insights and ROI measurement for brand growth.",
    icon: "📊",
  },
  {
    title: "Creative Production",
    description: "High-impact visual and content assets tailored for corporate brands.",
    icon: "✨",
  },
  {
    title: "Digital Transformation",
    description: "Technology-forward brand modernization and ecosystem building.",
    icon: "🚀",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function Services() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12 md:py-24">
      <div className="text-center mb-8 md:mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">What We Deliver</h2>
        <div className="w-20 h-1 bg-accent mx-auto" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="glass p-5 md:p-8 rounded-2xl border-l-2 border-accent hover:bg-white/10 transition-colors group"
          >
            <div className="text-3xl md:text-4xl mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-accent transition-colors">
              {service.title}
            </h3>
            <p className="text-zinc-400 leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
