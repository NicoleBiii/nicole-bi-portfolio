"use client";

import { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

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
      className="h-screen w-full snap-start flex items-center justify-center text-white px-6 md:px-12"
    >
      <div className="max-w-6xl w-full flex flex-col md:flex-row justify-between items-center gap-10">
        {/* Left Section */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-bold">
            Let’s work together
          </h2>
          <p className="text-white dark:text-gray-300">
            Have a project in mind? Let’s build something great.
          </p>
          <div className="flex justify-center md:justify-start gap-6 text-2xl">
            <a
              href="https://github.com/NicoleBiii"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/80 transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/nicole-bi/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/80 transition"
            >
              <FaLinkedin />
            </a>
            <a
              href="xinyuebi23@gmail.com"
              className="hover:text-white/80 transition"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Right Section: Glassmorphism Form */}
        <div className="md:w-1/2 w-full bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl">

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
                className="w-full py-3 rounded-lg bg-white/80 text-gray-400 dark:text-black font-semibold hover:bg-white transition"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
