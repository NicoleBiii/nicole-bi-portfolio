"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import MobileMenu from "./MobileMenu"
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import darkModeAnimation from '../../public/animations/darkmode-toggle.json'

import { useDarkMode } from "@/context/DarkModeContext";

const sections = ["About", "Projects", "Contact"];

const navContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const navItem = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

interface NavbarProps {
  active: string
}

export default function Navbar({ active }: NavbarProps) {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [menuOpen, setMenuOpen] = useState(false);
  const [lottieLoaded, setLottieLoaded] = useState(false);

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
    toggleDarkMode()
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
        toggleDarkMode={toggleDarkMode}
      />

      <motion.nav 
        variants={navContainer}
        initial="hidden"
        animate="show"
        className="flex items-center justify-between h-12 z-50 md:h-16 backdrop-blur-md px-4 md:px-8"
      >
        {/* Logo */}
        <motion.button 
          variants={navItem}
          onClick={() => handleScrollTo("home")} 
          className="relative w-[60px] h-[50px] md:w-[100px] md:h-[80px]"
          >
        <Image
          src={darkMode ? "/icons/N-dark.svg" : "/icons/N.svg"}
          alt="Home"
          fill
          priority
          placeholder="empty"
          className="cursor-pointer transition-opacity duration-500"
        />
        </motion.button>

        <motion.div 
          variants={navContainer}
          className="hidden md:flex items-center gap-6"
        >
          {sections.map((section) => {
            const sectionId = section.toLowerCase();
            return(
            <motion.button
              key={section}
              variants={navItem}
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
            </motion.button>
          )})}
            <motion.button
              variants={navItem}
              onClick={handleDarkModeToggle}
              title="Toggle Dark Mode"
              className="relative w-[30px] h-[30px]"
            >
            {!lottieLoaded && (
              <div className="absolute inset-0 animate-pulse bg-gray-300 dark:bg-gray-700 rounded" />
            )}
            <Lottie
              lottieRef={lottieRef}
              animationData={darkModeAnimation}
              loop={false}
              autoplay={false}
              style={{ width: 30, height: 30, opacity: lottieLoaded ? 1 : 0 }}
              rendererSettings={{
                preserveAspectRatio: "xMidYMid slice",
              }}
              onDOMLoaded={() => setLottieLoaded(true)}
            />
            </motion.button>
        </motion.div>

        {/* Mobile menu icon */}
        <motion.button
          id="menu-toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden text-2xl text-gray-800 dark:text-white">
          {menuOpen ? "✕" : "☰"}
        </motion.button>
      </motion.nav>
    </header>
  );
}
