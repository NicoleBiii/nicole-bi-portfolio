"use client";
import { FaReact, FaNodeJs, FaGitAlt, FaDocker, FaJava } from "react-icons/fa";
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
import Image from "next/image";
import RestApiIcon from "../../../public/icons/rest-api.png";
import VsCodeIcon from "../../../public/icons/vscode.svg";

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="h-screen w-full flex flex-col justify-center items-center text-white px-4 snap-start"
    >
      <h2 className="text-4xl font-bold mb-8">My Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* Frontend */}
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-semibold mb-4">Frontend</h3>
          <div className="flex flex-wrap justify-center gap-4 text-4xl">
            <FaReact title="React" />
            <SiNextdotjs title="Next.js" />
            <SiTypescript title="TypeScript" />
            <SiJavascript title="JavaScript" />
            <SiHtml5 title="HTML5" />
            <SiTailwindcss title="Tailwind CSS" />
            <SiSass title="Sass" />
            <SiVite title="Vite" />
          </div>
        </div>

        {/* Backend */}
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-semibold mb-4">Backend</h3>
          <div className="flex flex-wrap justify-center gap-4 text-4xl">
            <FaNodeJs title="Node.js" />
            <SiExpress title="Express.js" />
            <SiMysql title="MySQL" />
            <Image
              src={RestApiIcon}
              alt="REST API"
              width={40}
              height={40}
            />
            <SiMongodb title="MongoDB" />
          </div>
        </div>

        {/* DevOps / Tools */}
        <div className="flex flex-col items-center">
          <h3 className="text-2xl font-semibold mb-4">Tools</h3>
          <div className="flex flex-wrap justify-center gap-4 text-4xl">
            <Image
                src={VsCodeIcon}
                alt="REST API"
                width={40}
                height={40}
              />
            <FaDocker title="Docker" />
            <FaGitAlt title="Git" />
            <SiPython title="Python" />
            <FaJava title="Java" />
          </div>
        </div>
      </div>
    </section>
  );
}
