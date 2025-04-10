"use client"

import { useEffect, useState, useRef, useMemo } from "react"
import Navbar from "./Navbar"
import HomeSection from "@/components/sections/HomeSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import dynamic from "next/dynamic";
const DynamicBackground = dynamic(() => import("./DynamicBackground"), {
  ssr: false,
});

const sections = ["home", "about", "skills", "projects", "contact"]

export default function FullpageWrapper() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState("home");
  const scrollLockRef = useRef<boolean>(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const activeRef = useRef(active);

  const debounce = (fn: (...args: any[]) => void, delay = 300) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };
  

  const currentIndex = useMemo(() => sections.indexOf(active), [active])

  useEffect(() => {
    activeRef.current = active;
  }, [active]);
  
  // scroll to
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el || scrollLockRef.current) return

    scrollLockRef.current = true
    el.scrollIntoView({ behavior: "smooth" })

    setActive(id);
    activeRef.current = id;

    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      scrollLockRef.current = false
    }, 1000)
  }

  useEffect(() => {
    const debouncedScrollTo = debounce((id: string) => scrollTo(id), 100);

    const handleWheel = (e: WheelEvent) => {
      if (scrollLockRef.current) return;
      const index = sections.indexOf(activeRef.current);
      if (e.deltaY > 0 && index < sections.length - 1) {
        debouncedScrollTo(sections[index + 1]);
      } else if (e.deltaY < 0 && index > 0) {
        debouncedScrollTo(sections[index - 1]);
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  useEffect(() => {
    const debouncedScrollTo = debounce((id: string) => scrollTo(id), 100);

    const handleKey = (e: KeyboardEvent) => {
      if (scrollLockRef.current) return
      const index = sections.indexOf(activeRef.current);
      if ((e.key === "ArrowDown" || e.key === "PageDown") && index < sections.length - 1) {
        debouncedScrollTo(sections[index + 1]);
      } else if ((e.key === "ArrowUp" || e.key === "PageUp") && index > 0) {
        debouncedScrollTo(sections[index - 1])
      }
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id !== activeRef.current) {
            setActive(id);
            activeRef.current = id;
          }
        }
    });
    }, { threshold: [0.75, 0.9], rootMargin: "0px 0px -20% 0px" });
  
    const timer = setTimeout(() => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 50);
  
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const unlockScroll = () => {
      scrollLockRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  
    window.addEventListener("scrollend", unlockScroll);
    return () => {
      window.removeEventListener("scrollend", unlockScroll);
    };
  }, []);


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
      <div 
        id="scroll-container"
        className="h-screen snap-y snap-mandatory scroll-smooth overflow-y-auto no-scrollbar"
      >
        <DynamicBackground />
        <HomeSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </div>
  );
}
