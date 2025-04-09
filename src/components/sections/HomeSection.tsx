"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaFileAlt } from "react-icons/fa";
import MagneticIcon from "../MagneticIcon";

const title = "Nicole Bi";

export default function HomeSection() {
  return (
    <motion.section
      id="home"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.6 }}
      className="relative h-screen w-full flex flex-col justify-center items-center md:items-start px-6 md:px-16 text-white snap-start"
    >
      
      <motion.h1
  className="text-5xl md:text-7xl font-bold mb-4 flex gap-1"
  animate={{ y: [0, -6, 0] }}
  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
>
  {[...title].map((char, i) => (
    <motion.span
      key={i}
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay: i * 0.08,
        type: "spring",
        stiffness: 500,
        damping: 30,
      }}
      className="inline-block group relative"
      whileHover={{
        scale: 1.15,
        rotate: [-2, 2, -2],
        transition: { duration: 0.3 },
      }}
    >
      <span className="relative z-10">{char}</span>
      <motion.span
        className="absolute inset-0 bg-white/10 blur-md"
        initial={{ x: "-120%" }}
        animate={{ x: "120%" }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: i * 0.2,
        }}
      />
    </motion.span>
  ))}
</motion.h1>


    <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-4 text-xl text-gray-400 text-center md:text-left max-w-xs md:max-w-full"
      >
        Fullstack developer<br className="md:hidden" /> based in Toronto
    </motion.p>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0.7, 1] }}
      transition={{ delay: 1.2, duration: 3, repeat: Infinity }}
      className="text-sm mt-4 italic text-white/60 tracking-wide"
    >
      Designing seamless digital experiences.
    </motion.p>


    <div className="absolute bottom-12 flex gap-6 items-center justify-center">
        <MagneticIcon>
          <a href="https://github.com/NicoleBiii" target="_blank" rel="noopener noreferrer" title="GitHub">
            <FaGithub className="text-2xl hover:scale-110 transition-transform duration-300" />
          </a>
        </MagneticIcon>
        <MagneticIcon>
          <a href="https://linkedin.com/in/nicole-bi" target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <FaLinkedin className="text-2xl hover:scale-110 transition-transform duration-300" />
          </a>
        </MagneticIcon>
        <MagneticIcon>
          <a href="xinyuebi23@email.com" title="Send me an email">
            <FaEnvelope className="text-2xl hover:scale-110 transition-transform duration-300" />
          </a>
        </MagneticIcon>
        <MagneticIcon>
          <a
            href="/NicoleBi-resume.pdf"
            download
            title="Download my resume"
            className="relative group"
            >
            <FaFileAlt className="text-2xl hover:scale-110 transition-transform duration-300" />
            <span className="absolute bottom-full mb-2 text-xs text-white bg-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Download Resume
            </span>
          </a>
        </MagneticIcon>
      </div>
    </motion.section>
  );
}