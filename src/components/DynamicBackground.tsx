"use client";

import { useEffect, useRef, useMemo } from "react";
import { BlurGradientBg } from "../libs/BlurGradientBg.module";
import { useDarkMode } from "../context/DarkModeContext";

interface BlurGradientBgInstance {
  destroy?: () => void;
}

function DynamicBackground() {
  const { darkMode } = useDarkMode();
  const bgRef = useRef<HTMLDivElement>(null);
  const bgInstance = useRef<BlurGradientBgInstance | null>(null);

  const uniqueId = useMemo(() => `blur-bg-${Math.random().toString(36).substring(2, 10)}`, []);

  const lightColors = ["#90C9E6", "#AEDDE9", "#CEE7F0", "#DBE9E9"];
  const darkColors = ["#ee00ff", "#2B1E90", "#09001f", "#040f00"];

  useEffect(() => {
    const container = document.getElementById(uniqueId);
    if (!container) return;

    const safeDestroy = () => {
      try {
        const canvas = container.querySelector("canvas");
        if (canvas && canvas.parentNode === container) {
          canvas.remove();
        }
        bgInstance.current?.destroy?.();
      } catch (err) {
        console.warn("💥 BlurGradientBg destroy failed:", err);
      }
    };

    safeDestroy();

    bgInstance.current = new BlurGradientBg({
      dom: uniqueId,
      colors: darkMode ? darkColors : lightColors,
      loop: true,
    });

    return () => safeDestroy();
  }, [darkMode]);

  return <div id={uniqueId} ref={bgRef} className="absolute inset-0 -z-10" />;
}

export default DynamicBackground;
