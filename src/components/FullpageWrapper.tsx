"use client"

import { useEffect, useState, useRef, useMemo } from "react"
import Navbar from "./Navbar"
import { useDarkMode } from "@/context/DarkModeContext";

const sections = ["home", "about", "projects", "contact"]

export default function FullpageWrapper() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("home");
  const scrollLockRef = useRef<boolean>(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const currentIndex = useMemo(() => sections.indexOf(active), [active])

  // scroll to
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el || scrollLockRef.current) return

    scrollLockRef.current = true
    el.scrollIntoView({ behavior: "smooth" })

    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      scrollLockRef.current = false
    }, 1000)
  }

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollLockRef.current) return

      if (e.deltaY > 0 && currentIndex < sections.length - 1) {
        scrollTo(sections[currentIndex + 1])
      } else if (e.deltaY < 0 && currentIndex > 0) {
        scrollTo(sections[currentIndex - 1])
      }
    }

    window.addEventListener("wheel", handleWheel)
    return () => window.removeEventListener("wheel", handleWheel)
  }, [currentIndex])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (scrollLockRef.current) return

      if ((e.key === "ArrowDown" || e.key === "PageDown") && currentIndex < sections.length - 1) {
        scrollTo(sections[currentIndex + 1])
      } else if ((e.key === "ArrowUp" || e.key === "PageUp") && currentIndex > 0) {
        scrollTo(sections[currentIndex - 1])
      }
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [currentIndex])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id !== active) {
            setActive(entry.target.id)
          }
        })
      },
      { threshold: 0.6 }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [active])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])


  return (
    <div ref={containerRef} className="relative h-screen">
        <Navbar active={active} />
      {/* Navigation dots */}
      <div className="fixed top-1/2 right-6 -translate-y-1/2 flex flex-col gap-3 z-50 items-center">
        {sections.map((id) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className={`rounded-full transition-all duration-300 
            ${active === id ? "w-2 h-4 bg-white" : "w-1.5 h-1.5 bg-white/60"}`}
            aria-label={`Go to ${id}`}
          />
        ))}
      </div>

      {/* Scroll container */}
      <div className="h-screen snap-y snap-mandatory scroll-smooth overflow-y-auto no-scrollbar">
        <section
          id="home"
          className="h-screen w-full flex flex-col justify-center bg-black text-white snap-start">
          <h1 className="text-5xl md:text-7xl  opacity-0 animate-fade-slide-in">Nicole Bi</h1>
          <p className="mt-4 text-xl text-gray-400 opacity-0 animate-fade-slide-in delay-500">Fullstack developer</p>
        </section>

        <section
          id="about"
          className="h-screen w-full flex justify-center items-center bg-gray-900 text-white snap-start">
          About Me Section
        </section>

        <section
          id="projects"
          className="h-screen w-full flex justify-center items-center bg-white text-black snap-start">
          Project Gallery Section
        </section>

        <section
          id="contact"
          className="h-screen w-full flex justify-center items-center bg-zinc-800 text-white snap-start">
          Contact Me Section
        </section>
      </div>
    </div>
  );
}
