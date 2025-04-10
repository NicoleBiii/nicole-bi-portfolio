"use client";

import { useState, useEffect, useRef } from "react";
import { projects } from "../projectData";
import ProjectCard from "../ProjectCard";
import ProjectModal from "../ProjectModal";

import { motion } from "framer-motion";

export default function ProjectsSection() {
  const [current, setCurrent] = useState(0);
  const [selectedProject, setSelectedProject] = useState<
    null | (typeof projects)[0]
  >(null);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // responsive card width
  const [cardWidthPercent, setCardWidthPercent] = useState(80);
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1024) setCardWidthPercent(40);
      else if (width >= 768) setCardWidthPercent(60);
      else setCardWidthPercent(80);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    if (touchStartX.current === null || touchEndX.current === null) return;

    const distance = touchEndX.current - touchStartX.current;

    if (distance > 50 && current > 0) {
      setCurrent(current - 1);
    } else if (distance < -50 && current < projects.length - 1) {
      setCurrent(current + 1);
    }

    // reset
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      id="projects"
      className="h-screen w-full flex flex-col justify-center items-center snap-start relative overflow-hidden">
      {/* Card container */}
      <motion.div
        className="relative w-full h-[70vh]"
        style={{ transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {projects.map((project, index) => {
          const offset = index - current;
          const isActive = offset === 0;
          const rotationY = offset === 0 ? 0 : offset * -15;
          const translateX = offset * 100;
          const scale = isActive ? 1 : 0.9;
          const opacity = Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.5;
          const zIndex = 10 - Math.abs(offset);

          return (
            <div
              key={project.title}
              className="absolute top-1/2 left-1/2 transition-all duration-700 ease-in-out"
              style={{
                width: `${cardWidthPercent}vw`,
                transform: `
                  perspective(1000px)
                  translate(-50%, -50%)
                  translateX(${translateX}%)
                  rotateY(${rotationY}deg)
                  scale(${scale})
                `,
                opacity,
                zIndex,
                pointerEvents: Math.abs(offset) <= 1 ? "auto" : "none",
              }}
              onClick={() => {
                if (isActive) {
                  setSelectedProject(project);
                } else {
                  const index = projects.findIndex(
                    (p) => p.title === project.title
                  );
                  const direction = index > current ? 1 : -1;
                  setCurrent((prev) =>
                    Math.max(0, Math.min(projects.length - 1, prev + direction))
                  );
                }
              }}>
              <ProjectCard project={project} active={isActive} />
            </div>
          );
        })}
      </motion.div>

      {/* Modal control */}
      {selectedProject && (
        <ProjectModal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          project={selectedProject}
        />
      )}

      {/* button */}
      <motion.div
        className="flex gap-6 mt-8 z-30"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}>
        <button
          onClick={() => setCurrent((prev) => Math.max(0, prev - 1))}
          className="px-4 py-2 rounded-full dark:text-white bg-white/10 dark:bg-black/10 transition transform hover:scale-110 hover:bg-white/20 dark:hover:bg-black/20">
          ←
        </button>
        <button
          onClick={() =>
            setCurrent((prev) => Math.min(projects.length - 1, prev + 1))
          }
          className="px-4 py-2 rounded-full dark:text-white bg-white/10 dark:bg-black/10 transition transform hover:scale-110 hover:bg-white/20 dark:hover:bg-black/20">
          →
        </button>
      </motion.div>
    </section>
  );
}
