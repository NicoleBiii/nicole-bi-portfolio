'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useDarkMode } from "@/context/DarkModeContext";

interface MobileMenuProps {
  isOpen: boolean
  toggle: () => void
  sections: string[]
  darkMode: boolean
  toggleDarkMode: () => void
}

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: { opacity: 0, y: -20 },
}

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

export default function MobileMenu({
  isOpen,
  toggle,
  sections,
}: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const { darkMode, toggleDarkMode } = useDarkMode();

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
        const target = event.target as HTMLElement
      
        // Don't close if clicking the toggle button
        if (target.closest('#menu-toggle')) return

      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        toggle()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, toggle])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
          className="absolute top-16 right-4 w-1/3 bg-white/20 dark:bg-black/40 backdrop-blur-md z-50 shadow-xl rounded-xl"
          ref={menuRef}
        >
          <div className="flex flex-col items-center py-4 gap-4">
            {sections.map(section => (
              <motion.button
                key={section}
                variants={itemVariants}
                onClick={() => {
                  const el = document.getElementById(section.toLowerCase())
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' })
                    toggle()
                  }
                }}
                className="text-lg font-semibold text-white"
              >
                {section}
              </motion.button>
            ))}
            <motion.button
              variants={itemVariants}
              onClick={() => {
                toggleDarkMode()
                toggle()
              }}
              className="text-white p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? <Moon size={24} /> : <Sun size={24} />}
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}