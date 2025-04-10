"use client";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { ReactElement, useMemo } from "react";

type SkillIconProps = {
  icon?: ReactElement;
  imageSrc?: StaticImageData | string;
  title: string;
};

export default function SkillIcon({ icon, imageSrc, title }: SkillIconProps) {
  const delay = useMemo(() => Math.random() * 2, []);
  const amplitude = useMemo(() => 3 + Math.random() * 4, []); // [3 ~ 7]

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.7, y: 10 },
        show: { opacity: 1, scale: 1, y: 0 },
      }}
      className="relative group cursor-default"
    >
      {/* Tooltip */}
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white/40 text-black dark:bg-black/40 dark:text-white text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
        {title}
      </span>

      {/* Icon */}
      <motion.div
        whileHover={{ scale: 1.2 }}
        animate={{ y: [0, -amplitude, 0] }}
        transition={{
          duration: 4 + delay,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
        className="text-4xl hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.8)] transition-all"
      >
        {icon ||
          (imageSrc && (
            <Image
              src={imageSrc}
              alt={title}
              width={40}
              height={40}
              className="mx-auto"
            />
          ))}
      </motion.div>
    </motion.div>
  );
}
