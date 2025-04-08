"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import MobileMenu from "./MobileMenu"
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import darkModeAnimation from '../../public/animations/darkmode-toggle.json'

import { useDarkMode } from "@/context/DarkModeContext";

const sections = ["About", "Skills", "Projects", "Contact"];

const navContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const navItem = {
  hidden: { opacity: 0, y: -60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

interface NavbarProps {
  active: string
}

export default function Navbar({ active }: NavbarProps) {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [menuOpen, setMenuOpen] = useState(false);
  const [lottieLoaded, setLottieLoaded] = useState(false);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const [hovered, setHovered] = useState<string | null>(null);
  const navRefs = useRef<Record<string, HTMLButtonElement | null>>({});


  const lottieRef = useRef<any>(null)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    const target = hovered || active;
  
    if (!sections.map(s => s.toLowerCase()).includes(target)) {
      setUnderlineStyle({ left: 0, width: 0 });
      return;
    }
  
    const el = navRefs.current[target];
    if (el) {
      const rect = el.getBoundingClientRect();
      const containerRect = el.parentElement?.getBoundingClientRect();
      if (containerRect) {
        setUnderlineStyle({
          left: rect.left - containerRect.left,
          width: rect.width,
        });
      }
    }
  }, [hovered, active]);
  
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
      lottieRef.current?.playSegments([77, 154], true)
    } else {
      lottieRef.current?.playSegments([0, 77], true)
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
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center justify-between h-12 z-50 md:h-16 backdrop-blur-md px-4 md:px-8"
      >
        {/* Logo */}
        <motion.button 
          variants={navItem}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.2 }}
          onClick={() => handleScrollTo("home")} 
          className="relative w-[60px] h-[50px] md:w-[100px] md:h-[80px]"
          >
        <Image
          src={darkMode ? "/icons/N-dark.svg" : "/icons/N-blue.svg"}
          alt="Home"
          fill
          priority
          placeholder="empty"
          className="cursor-pointer transition-opacity duration-500"
        />
        </motion.button>

        <motion.div 
          variants={navContainer}
          initial="hidden"
          animate="show"
          className="relative hidden md:flex items-center gap-6"
        >
          {sections.map((section) => {
            const sectionId = section.toLowerCase();
            return(
            <motion.button
              key={section}
              ref={(el) => void (navRefs.current[sectionId] = el)}
              variants={navItem}
              onClick={() => handleNavClick(sectionId)}
              onMouseEnter={() => setHovered(sectionId)}
              onMouseLeave={() => setHovered(null)}
              className="text-base font-medium transition-all duration-300
                text-gray-400 dark:text-gray-100
                hover:scale-105 hover:-translate-y-[1px]"
                >
              {section}
            </motion.button>
          )})}

            <motion.div
                layout
                className="absolute bottom-0 h-0.5 bg-gray-400/60 dark:bg-gray-100/60 rounded-full shadow-md"
                animate={underlineStyle}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                style={{ left: underlineStyle.left, width: underlineStyle.width }}
              />
          
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
          className="md:hidden text-2xl text-white">
          {menuOpen ? "✕" : "☰"}
        </motion.button>
      </motion.nav>
    </header>
  );
}
