"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import MobileMenu from "./MobileMenu"
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import darkModeAnimation from '../../public/animations/darkmode-toggle.json'
import { log } from "console";

const sections = ["About", "Projects", "Contact"];

interface NavbarProps {
  active: string
}

export default function Navbar({ active }: NavbarProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const lottieRef = useRef<any>(null)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  const handleDarkModeToggle = () => {
    if (darkMode) {
      lottieRef.current?.playSegments([0, 77], true)
    } else {
      lottieRef.current?.playSegments([77, 154], true)
    }
    setDarkMode(prev => !prev)
  }

  useEffect(() => {
    lottieRef.current?.setSpeed(0.4);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50  no-scrollbar">
      <MobileMenu
        isOpen={menuOpen}
        toggle={() => setMenuOpen((prev) => !prev)}
        sections={sections}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode((prev) => !prev)}
      />

      <nav className="flex items-center justify-between h-12 z-50 md:h-16 backdrop-blur-md px-4 md:px-8">
        {/* Logo */}
        <button onClick={() => handleScrollTo("home")} className="relative w-[60px] h-[50px] md:w-[100px] md:h-[80px]">
          <Image
            src={darkMode ? "/icons/N-dark.svg" : "/icons/N.svg"}
            alt="Home"
            fill
            className="cursor-pointer"
          />
        </button>

        <div className="hidden md:flex items-center gap-6">
          {sections.map((section) => {
            const sectionId = section.toLowerCase();
            return(
            <button
              key={section}
              onClick={() => handleNavClick(sectionId)}
              className={`text-base font-medium transition-all duration-300
                ${active === sectionId ? 
                    'border-b-2 border-b border-gray-800 dark:border-b-gray-100 font-bold' :
                    'border-b-2 border-transparent'
                } 
                text-gray-800 dark:text-gray-100
                hover:scale-105 hover:-translate-y-[1px]
                hover:border-b-red-300 dark:hover:border-b-red-500`}
                >
              {section}
            </button>
          )})}
            <button
            onClick={handleDarkModeToggle}
            title="Toggle Dark Mode"
            >
            <Lottie
                lottieRef={lottieRef}
                animationData={darkModeAnimation}
                loop={false}
                autoplay={false}
                style={{ width: 30, height: 30 }}
                rendererSettings={{
                  preserveAspectRatio: "xMidYMid slice",
                }}
                
            />
            </button>
        </div>

        {/* Mobile menu icon */}
        <button
          id="menu-toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden text-2xl text-gray-800 dark:text-white">
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>
    </header>
  );
}
