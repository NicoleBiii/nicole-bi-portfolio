"use client";

import { useMotionValue, useSpring, motion } from "framer-motion";
import { useRef } from "react";

interface MagneticIconProps {
  children: React.ReactNode;
  strength?: number;
}

export default function MagneticIcon({ children, strength = 20 }: MagneticIconProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const bounds = ref.current?.getBoundingClientRect();
    if (!bounds) return;

    const dx = e.clientX - (bounds.left + bounds.width / 2);
    const dy = e.clientY - (bounds.top + bounds.height / 2);

    x.set(dx / bounds.width * strength);
    y.set(dy / bounds.height * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
