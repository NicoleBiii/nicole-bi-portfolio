"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    role: "Software Developer",
    company: "Shack Shine · O2E Brands",
    period: "Jun 2025 – May 2026",
    location: "Toronto, ON",
    context: "Home-services franchise platform (1-800-GOT-JUNK family of brands)",
    bullets: [
      "Researched backend framework options and proposed NestJS + TypeScript; adopted as the team standard by the director.",
      "Built and owned the service-appointment microservice — the platform's primary service — handling job data CRUD and Salesforce REST API integration.",
      "Optimized response times under high concurrency to offset Salesforce API latency.",
      "Built messaging (Podium API for SMS), house-assessment, property, and customer microservices.",
      "Implemented a lazy migration pattern: PostgreSQL records created on first access to persist data beyond Salesforce, including S3 image uploads.",
      "Maintained services across 3 AWS environments; documented APIs in SwaggerHub; used trunk-based development.",
    ],
    tags: ["NestJS", "TypeScript", "PostgreSQL", "AWS S3", "Salesforce API", "Docker"],
  },
  {
    role: "Front-end Developer",
    company: "YILING",
    period: "Sep 2021 – Sep 2022",
    location: "Chongqing, China",
    context: "Production web application",
    bullets: [
      "Developed and maintained frontend features; built UI components and integrated RESTful APIs with the backend team.",
      "Worked in an Agile environment with daily standups, Git-based versioning, and code reviews.",
    ],
    tags: ["React", "JavaScript", "REST API", "Agile"],
  },
];

const educations = [
  { school: "BrainStation", degree: "Diploma — Software Developer", period: "Jan – Apr 2025", location: "Toronto, ON" },
  { school: "Laurentian University", degree: "MSc — Computer Science", period: "Jan 2023 – Aug 2024", location: "Sudbury, ON" },
  { school: "Chongqing University", degree: "BEng — Electrical Engineering", period: "Sep 2017 – Jul 2021", location: "Chongqing, China" },
];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="min-h-screen w-full flex flex-col justify-center items-center px-6 sm:px-8 md:px-16 py-20 text-black dark:text-white snap-start"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl font-bold mb-14 text-center"
      >
        Experience
      </motion.h2>

      <div className="max-w-3xl w-full">
        {/* Work timeline */}
        <div className="relative">
          {/* Vertical line — draws in on scroll */}
          <motion.div
            className="absolute left-3 top-2 bottom-2 w-px bg-black/20 dark:bg-white/20 origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
          />

          <div className="flex flex-col gap-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true, amount: 0.3 }}
                className="relative pl-10"
              >
                {/* Dot */}
                <span className="absolute left-0 top-1.5 w-7 h-7 rounded-full bg-black dark:bg-white flex items-center justify-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-white dark:bg-black" />
                </span>

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                  <h3 className="text-lg sm:text-xl font-semibold">{exp.role}</h3>
                  <span className="text-sm text-black/50 dark:text-white/50 shrink-0">{exp.period}</span>
                </div>
                <p className="text-sm font-medium text-black/70 dark:text-white/70 mb-0.5">
                  {exp.company} · {exp.location}
                </p>
                <p className="text-xs italic text-black/40 dark:text-white/40 mb-3">{exp.context}</p>

                {/* Bullets */}
                <ul className="space-y-1.5 mb-4">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="flex gap-2 text-sm leading-snug text-black/80 dark:text-white/80">
                      <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-black/40 dark:bg-white/40" />
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full border border-black/20 dark:border-white/20 text-black/70 dark:text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mt-14"
        >
          <h3 className="text-2xl font-semibold mb-6">Education</h3>
          <div className="flex flex-col gap-4">
            {educations.map((edu, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5">
                <div>
                  <span className="font-medium">{edu.school}</span>
                  <span className="text-sm text-black/60 dark:text-white/60"> — {edu.degree}</span>
                </div>
                <span className="text-sm text-black/40 dark:text-white/40 shrink-0">{edu.period}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
