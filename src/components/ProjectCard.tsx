import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function ProjectCard({
  project,
  active,
}: {
  project: any;
  active?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group w-full h-full p-6 bg-white/30 dark:bg-black/30 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg flex flex-col transition-transform duration-300 hover:scale-[1.02] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {/* Cover Image */}
      {project.image && (
        <div className="w-full h-72 overflow-hidden rounded-xl mb-4">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-left-top"
          />
        </div>
      )}

      {/* Title & Description */}
      <h2 className="text-xl font-bold mb-2 dark:text-white">{project.title}</h2>
      <p className="text-sm mb-4 dark:text-white">{project.description}</p>

      {/* Hover Card - Floating up */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="absolute left-6 right-6 bottom-[-10%] z-30 pointer-events-auto">
            <div className="bg-white/90 dark:bg-black/80 rounded-xl p-4 shadow-2xl border border-white/20 backdrop-blur-xl flex flex-col gap-4">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.techStack?.map((tech: string) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 rounded-full bg-indigo-100 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-100">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-4 text-sm pt-1 dark:text-white">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    className="underline">
                    GitHub
                  </a>
                )}
                {project.Demo && (
                  <a
                    href={project.Demo}
                    target="_blank"
                    className="underline">
                    Demo
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
