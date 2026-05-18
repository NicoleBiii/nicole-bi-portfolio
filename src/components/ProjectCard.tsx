import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { projects } from "./projectData";

type Project = (typeof projects)[0] & { demo?: string };

export default function ProjectCard({
  project,
  active,
}: {
  project: Project;
  active?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const showOverlay = active && isHovered;

  return (
    <div
      className="relative w-full h-full bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg flex flex-col cursor-pointer overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>

      {/* Cover Image */}
      {project.image && (
        <div className="w-full h-64 overflow-hidden shrink-0">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-left-top"
            animate={{ scale: showOverlay ? 1.04 : 1 }}
            transition={{ duration: 0.4 }}
          />
        </div>
      )}

      {/* Text content */}
      <div className="p-5 flex flex-col gap-2">
        <h2 className="text-xl font-bold dark:text-white">{project.title}</h2>
        <p className="text-sm dark:text-white/80 leading-snug">{project.description}</p>

        {/* Tags — always visible */}
        <div className="flex flex-wrap gap-1.5 mt-1">
          {project.tags.map((tag: string) => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full border border-black/15 dark:border-white/15 text-black/60 dark:text-white/60">
              {tag}
            </span>
          ))}
        </div>

        {!active && (
          <p className="text-xs text-black/40 dark:text-white/40 mt-2 italic">Click to focus</p>
        )}
        {active && !isHovered && (
          <p className="text-xs text-black/40 dark:text-white/40 mt-2 italic">Hover to explore · Click to open</p>
        )}
      </div>

      {/* Slide-up overlay — stays within card bounds */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 32 }}
            className="absolute inset-x-0 bottom-0 z-20 pointer-events-auto">
            <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border-t border-white/20 p-4 flex flex-col gap-3">
              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5">
                {project.techStack?.map((tech: string) => (
                  <span key={tech} className="text-xs px-2.5 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200 font-medium">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Responsibilities */}
              <ul className="space-y-1">
                {project.responsibilities?.slice(0, 2).map((r: string, i: number) => (
                  <li key={i} className="flex gap-2 text-xs text-black/70 dark:text-white/70 leading-snug">
                    <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-indigo-400" />
                    {r}
                  </li>
                ))}
              </ul>

              {/* Links */}
              <div className="flex gap-4 text-sm text-black dark:text-white pt-0.5">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                    onClick={(e) => e.stopPropagation()}>
                    <FaGithub size={14} /> GitHub
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                    onClick={(e) => e.stopPropagation()}>
                    <FaExternalLinkAlt size={12} /> Live
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
