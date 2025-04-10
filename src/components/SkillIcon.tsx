"use client";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { ReactElement } from "react";

type SkillIconProps = {
  icon?: ReactElement;
  imageSrc?: StaticImageData | string;
  title: string;
};

export default function SkillIcon({ icon, imageSrc, title }: SkillIconProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.7, y: 10 },
        show: { opacity: 1, scale: 1, y: 0 },
      }}
      whileHover={{ scale: 1.2 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative group cursor-default"
    >
      {/* Tooltip */}
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white/40 text-black dark:bg-black/40 dark:text-white text-black text-xs font-medium px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
        {title}
      </span>

      {/* Icon or Image */}
      <div className="text-4xl hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.8)] transition-all">
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
      </div>
    </motion.div>
  );
}
