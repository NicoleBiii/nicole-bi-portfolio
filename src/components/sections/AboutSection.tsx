"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const textContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.3,
    },
  },
};

const paragraph = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function AboutSection() {
  return (
    <section
      id="about"
      className="min-h-screen w-full flex justify-center items-center px-6 sm:px-8 md:px-16 py-12 text-black dark:text-white snap-start">
      <div className="max-w-6xl w-full flex flex-col sm:flex-row items-center justify-around gap-8 sm:gap-14">
        {/* Left: Profile Image - hidden on mobile */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.03 }}
          className="hidden sm:block w-full max-w-[280px] md:max-w-[320px] hover:shadow-xl transition-shadow shadow-white dark:shadow-indigo-500 duration-300">
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
          variants={textContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="w-full max-w-[600px] rounded-2xl px-6 py-8 text-center sm:text-left text-base sm:text-lg leading-relaxed sm:leading-loose">
          <motion.h2
            variants={paragraph}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-xl sm:text-3xl md:text-4xl font-bold mb-4 text-balance relative group">
            Hi! I'm Nicole Bi
            <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-black dark:bg-white transition-all duration-500 group-hover:w-full" />
          </motion.h2>
          <motion.p variants={paragraph} className="mb-4">
            — a full-stack developer with a year of professional backend
            experience shipping production APIs at{" "}
            <span className="font-semibold">Shack Shine · O2E Brands</span>.
          </motion.p>
          <motion.p variants={paragraph} className="mb-4">
            I proposed and led NestJS adoption for a greenfield franchise
            platform, owned its core service-appointment microservice, and built
            integrations with Salesforce, Podium, and AWS S3.
          </motion.p>
          <motion.p variants={paragraph} className="mb-4">
            Background in Electrical Engineering, Master’s in Computer Science.
            I care about clean architecture, fast feedback loops, and shipping
            things that actually work in production.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
