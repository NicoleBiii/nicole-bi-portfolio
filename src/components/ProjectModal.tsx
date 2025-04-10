import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import useModalScrollLock from "./hooks/useModalScrollLock";
import ReactPlayer from "react-player";

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
  const [showVideo, setShowVideo] = useState(false);
  const [renderPlayer, setRenderPlayer] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);
  useModalScrollLock(isOpen);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) {
      setShowVideo(false);
      setTimeout(() => setRenderPlayer(false), 100);
    }
    if (!isOpen && playerRef.current) {
      try {
        playerRef.current.seekTo(0);
        playerRef.current.getInternalPlayer()?.pause?.();
      } catch (e) {
        console.warn("Player cleanup failed", e);
      }
    }
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop (click to close) */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal content */}
          <motion.div
            className="relative z-10 w-11/12 max-w-3xl bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-2xl max-h-[90vh] overflow-hidden flex flex-col border border-white/20 dark:text-white"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <div className="overflow-y-auto pr-2 custom-scrollbar">
              <h2 className="text-2xl font-bold mb-4">{project.title}</h2>

              {project.videoUrl && (
                <div className="my-4">
                  {!showVideo ? (
                    <button
                    onClick={() => {
                      setRenderPlayer(true);
                      setShowVideo(true);
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                  >
                    Play Video
                  </button>
                  
                  ) : (
                    renderPlayer && showVideo && (
                      <div className="relative aspect-video max-h-[60vh] overflow-hidden rounded-lg shadow-lg">
                        <ReactPlayer
                          key={project.videoUrl + String(isOpen)}
                          url={project.videoUrl}
                          ref={playerRef}
                          playing={false}
                          controls
                          playsinline
                          width="100%"
                          muted
                          height="100%"
                          style={{ position: "absolute", top: 0, left: 0 }}
                          config={{
                            file: {
                              attributes: {
                                preload: "metadata",
                                controlsList: "nodownload",
                              },
                            },
                          }}
                        />
                      </div>
                    )
                  )}
                </div>
              )}

              <p className="text-sm mb-4">{project.description}</p>

              {project.tags && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {project.techStack && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 rounded-full bg-indigo-100 dark:bg-indigo-700 text-indigo-800 dark:text-indigo-100"
                    >
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
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    GitHub
                  </a>
                )}
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    Live Demo
                  </a>
                )}
              </div>

              {/* Close button */}
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
