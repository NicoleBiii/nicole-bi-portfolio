"use client";

import { useEffect, useRef } from "react";
import { BlurGradientBg } from "../libs/BlurGradientBg.module";
import { useDarkMode } from "../context/DarkModeContext";

function DynamicBackground() {
    const { darkMode } = useDarkMode();
    const bgRef = useRef<HTMLDivElement>(null);
    const bgInstance = useRef<any>(null);
  
    const lightColors = ["#90C9E6", "#AEDDE9", "#CEE7F0", "#DBE9E9"];
    const darkColors = ["#ee00ff", "#2B1E90", "#09001f", "#040f00"];

    useEffect(() => {
      if (!bgRef.current) return;
  
      if (bgInstance.current && bgInstance.current.destroy) {
        bgInstance.current.destroy();
      }
  
      bgInstance.current = new BlurGradientBg({
        dom: bgRef.current.id,
        colors: darkMode ? darkColors : lightColors,
        loop: true,
      });
    }, [darkMode]);

  return <div id="box" ref={bgRef} className="absolute inset-0 -z-10" />;
  
}

export default DynamicBackground
