"use client";

import { useState, useEffect } from "react";
import { projects } from "../projectData";
import ProjectCard from "../ProjectCard";
import ProjectModal from "./ProjectModal";

export default function ProjectsSection() {
  const [current, setCurrent] = useState(0);
  const [selectedProject, setSelectedProject] = useState<null | (typeof projects)[0]>(null);

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

  return (
    <section
      id="projects"
      className="h-screen w-full flex flex-col justify-center items-center snap-start relative overflow-hidden"
    >
      {/* Card container */}
      <div className="relative w-full h-[70vh]" style={{ transformStyle: "preserve-3d" }}>
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
                  const index = projects.findIndex((p) => p.title === project.title);
                  const direction = index > current ? 1 : -1;
                  setCurrent((prev) =>
                    Math.max(0, Math.min(projects.length - 1, prev + direction))
                  );
                }
              }}
            >
              <ProjectCard project={project} active={isActive} />
            </div>
          );
        })}
      </div>

      {/* Modal control */}
      {selectedProject && (
        <ProjectModal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          project={selectedProject}
        />
      )}

      {/* button */}
      <div className="flex gap-6 mt-8 z-30">
        <button
          onClick={() => setCurrent((prev) => Math.max(0, prev - 1))}
          className="px-4 py-2 rounded-full dark:text-white bg-white/10 dark:bg-black/10 transition transform hover:scale-110 hover:bg-white/20 dark:hover:bg-black/20"
        >
          ←
        </button>
        <button
          onClick={() => setCurrent((prev) => Math.min(projects.length - 1, prev + 1))}
          className="px-4 py-2 rounded-full dark:text-white bg-white/10 dark:bg-black/10 transition transform hover:scale-110 hover:bg-white/20 dark:hover:bg-black/20"
        >
          →
        </button>
      </div>
    </section>
  );
}
