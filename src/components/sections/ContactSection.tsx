"use client";

import { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

import { motion } from "framer-motion";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await fetch("https://formspree.io/f/abcdxyz", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    if (res.ok) {
      setSubmitted(true);
    }
  }

  return (
    <section
      id="contact"
      className="h-screen w-full snap-start flex items-center justify-center text-white px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-6xl w-full flex flex-col md:flex-row justify-between items-center gap-10">
        {/* Left Section */}
        <motion.div
          className="md:w-1/2 space-y-6 text-center md:text-left"
          initial="hidden"
          whileInView="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
              },
            },
          }}
          viewport={{ once: true }}>
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            className="text-4xl md:text-5xl font-bold">
            Let’s work together
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            className="text-white dark:text-gray-300">
            Have a project in mind? Let’s build something great.
          </motion.p>

          <div className="flex justify-center md:justify-start gap-6 text-2xl mt-2">
            {[
              {
                icon: <FaGithub />,
                href: "https://github.com/NicoleBiii",
                label: "GitHub",
              },
              {
                icon: <FaLinkedin />,
                href: "https://www.linkedin.com/in/nicole-bi/",
                label: "LinkedIn",
              },
              {
                icon: <FaEnvelope />,
                href: "mailto:xinyuebi23@gmail.com",
                label: "Email",
              },
            ].map(({ icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.3 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative group hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.8)] transition-all"
              >
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs bg-white/40 text-black dark:bg-black/40 dark:text-white px-2 py-1 rounded whitespace-nowrap transition">
                  {label}
                </span>
                {icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right Section: Glassmorphism Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50, filter: "blur(6px)" }}
            whileInView={{
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 2,
              ease: [0.22, 1, 0.36, 1], // easeOutBack
              delay: 0.5,
            }}
            viewport={{ once: true }}
            className="md:w-1/2 w-full bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl"
          >

          {submitted ? (
            <div className="text-center text-xl text-green-300 font-semibold">
              ✅ Thank you! Your message has been sent.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                required
                placeholder="Your Name"
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-white"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Your Email"
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-white"
              />
              <textarea
                name="message"
                rows={4}
                required
                placeholder="Your Message"
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-white resize-none"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-white/80 text-gray-400 dark:text-black font-semibold hover:bg-white hover:scale-105 transition-all duration-300">
                Send Message
              </button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
