"use client";

import { motion } from "framer-motion";

export default function HomeSection() {
  return (
    <motion.section
      id="home"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.6 }}
      className="h-screen w-full flex flex-col justify-center items-center md:items-start px-6 md:px-16 text-white snap-start"
    >
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-5xl md:text-7xl font-bold opacity-0"
      >
        Nicole Bi
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-4 text-xl text-gray-400 text-center md:text-left max-w-xs md:max-w-full"
      >
        Fullstack developer<br className="md:hidden" />
        based in Toronto
      </motion.p>
    </motion.section>
  );
}