"use client";

import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaDocker,
  FaJava,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiTailwindcss,
  SiSass,
  SiVite,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPython,
} from "react-icons/si";
import RestApiIcon from "../../../public/icons/rest-api.png";
import VsCodeIcon from "../../../public/icons/vscode.svg";
import SkillIcon from "../SkillIcon";
import { motion } from "framer-motion";

const sectionContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.5,
      delayChildren: 0.2,
    },
  },
};

const iconGroupContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const titleVariant = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="h-screen w-full flex flex-col justify-center items-center text-white px-4 snap-start"
    >
      {/* title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-8"
      >
        My Skills
      </motion.h2>

      {/* skills container */}
      <motion.div
        variants={sectionContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl"
      >
        {/* Frontend */}
        <motion.div variants={iconGroupContainer} className="flex flex-col items-center">
          <motion.h3
            variants={titleVariant}
            className="text-2xl font-semibold mb-4 relative group"
          >
            Frontend
            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-500 group-hover:w-full" />
          </motion.h3>
          <div className="flex flex-wrap justify-center gap-4">
            <SkillIcon icon={<FaReact />} title="React" />
            <SkillIcon icon={<SiNextdotjs />} title="Next.js" />
            <SkillIcon icon={<SiTypescript />} title="TypeScript" />
            <SkillIcon icon={<SiJavascript />} title="JavaScript" />
            <SkillIcon icon={<SiHtml5 />} title="HTML5" />
            <SkillIcon icon={<SiTailwindcss />} title="Tailwind CSS" />
            <SkillIcon icon={<SiSass />} title="Sass" />
            <SkillIcon icon={<SiVite />} title="Vite" />
          </div>
        </motion.div>

        {/* Backend */}
        <motion.div variants={iconGroupContainer} className="flex flex-col items-center">
          <motion.h3
            variants={titleVariant}
            className="text-2xl font-semibold mb-4 relative group"
          >
            Backend
            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-500 group-hover:w-full" />
          </motion.h3>
          <div className="flex flex-wrap justify-center gap-4">
            <SkillIcon icon={<FaNodeJs />} title="Node.js" />
            <SkillIcon icon={<SiExpress />} title="Express.js" />
            <SkillIcon icon={<SiMysql />} title="MySQL" />
            <SkillIcon imageSrc={RestApiIcon} title="REST API" />
            <SkillIcon icon={<SiMongodb />} title="MongoDB" />
          </div>
        </motion.div>

        {/* Tools */}
        <motion.div variants={iconGroupContainer} className="flex flex-col items-center">
          <motion.h3
            variants={titleVariant}
            className="text-2xl font-semibold mb-4 relative group"
          >
            Tools
            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-white transition-all duration-500 group-hover:w-full" />
          </motion.h3>
          <div className="flex flex-wrap justify-center gap-4">
            <SkillIcon imageSrc={VsCodeIcon} title="VS Code" />
            <SkillIcon icon={<FaDocker />} title="Docker" />
            <SkillIcon icon={<FaGitAlt />} title="Git" />
            <SkillIcon icon={<SiPython />} title="Python" />
            <SkillIcon icon={<FaJava />} title="Java" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
