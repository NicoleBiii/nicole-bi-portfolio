import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    videoUrl?: string;
    description: string;
    tags?: string[];
    techStack?: string[];
    responsibilities?: string[];
    github?: string;
    liveDemo?: string;
  };
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  // ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // click background to close
        >
          <motion.div
            className="relative w-full max-w-3xl bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-2xl max-h-[90vh] overflow-hidden flex flex-col "
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
          >
            <div className="overflow-y-auto pr-2 custom-scrollbar">

            <h2 className="text-2xl font-bold mb-4">{project.title}</h2>

            
            {project.videoUrl && (
              <video
                src={project.videoUrl}
                controls
                autoPlay
                muted
                className="w-full max-h-[50vh] object-contain  rounded-lg mb-4"
              />
            )}

            <p className="text-sm mb-4">{project.description}</p>

            {project.tags && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {project.techStack && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech) => (
                  <span key={tech} className="text-xs px-2 py-1 rounded-full bg-indigo-100 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-100">
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {project.responsibilities && (
              <ul className="list-disc list-inside text-sm space-y-1 mb-4">
                {project.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}

            <div className="flex gap-4 text-sm">
              {project.github && (
                <a href={project.github} target="_blank" className="underline">
                  GitHub
                </a>
              )}
              {project.liveDemo && (
                <a href={project.liveDemo} target="_blank" className="underline">
                  Live Demo
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-xl font-bold text-gray-500 hover:text-black dark:hover:text-white"
            >
              ×
            </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
