"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import MobileMenu from "./MobileMenu";

const sections = ["About", "Projects", "Contact"];

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <header className="fixed top-0 w-full z-50">
      <MobileMenu
        isOpen={menuOpen}
        toggle={() => setMenuOpen((prev) => !prev)}
        sections={sections}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode((prev) => !prev)}
      />

      <nav className="flex items-center justify-between h-12 z-50 md:h-18 backdrop-blur-md bg-white/30 dark:bg-black/30 shadow-md px-4 md:px-8">
        {/* Logo */}
        <button onClick={() => handleScrollTo("home")}>
          <Image
            src={darkMode ? "/icons/N-dark.svg" : "/icons/N.svg"}
            alt="Home"
            width={50}
            height={36}
            className="cursor-pointer"
          />
        </button>
        <div className="hidden md:flex items-center gap-6">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => handleNavClick(section)}
              className="text-sm md:text-base font-medium text-gray-800 dark:text-gray-100 hover:underline">
              {section}
            </button>
          ))}
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="w-6 h-6 relative"
            title="Toggle Dark Mode">
            {darkMode ? "🌙" : "☀️"}
          </button>
        </div>

        {/* Mobile menu icon */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden text-2xl text-gray-800 dark:text-white">
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>
    </header>
  );
}
