"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-screen w-full flex justify-center items-center px-6 sm:px-8 md:px-16 py-12 text-white snap-start"
    >
      <div className="max-w-6xl w-full flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-14">
        {/* Left: Profile Image - hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="hidden sm:block w-full max-w-[280px] md:max-w-[320px]"
        >
          <Image
            src="/images/nicole.jpg"
            alt="Nicole Bi"
            width={300}
            height={400}
            priority
            className="rounded-2xl object-cover shadow-lg w-full h-auto"
          />
        </motion.div>

        {/* Right: Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full max-w-[600px] text-center sm:text-left text-base sm:text-lg leading-relaxed sm:leading-loose"
        >
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-4 text-balance">
            Hi! I'm Nicole Bi
          </h2>
          <p className="mb-4">
            — a developer with a background in Electrical Engineering and a love for writing clean, creative code.
          </p>
          <p className="mb-4">
            I’ve always enjoyed tech — not just learning it, but building things with it. That’s what led me to focus on software development, where I get to solve problems and bring ideas to life.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
