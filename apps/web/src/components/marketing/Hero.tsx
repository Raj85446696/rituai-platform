"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, GitBranch } from "lucide-react";

const words = ["Build.", "Ship.", "Monitor.", "Improve."];

export function Hero() {
  const reduced = useReducedMotion();
  return (
    <section className="relative isolate overflow-hidden pt-36 sm:pt-44">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
      <motion.div animate={reduced ? undefined : { x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute left-1/2 top-20 -z-10 size-96 -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl" />
      <motion.div animate={reduced ? undefined : { x: [0, -25, 0], y: [0, 30, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} className="pointer-events-none absolute right-0 top-80 -z-10 size-72 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="mx-auto max-w-5xl px-5 text-center lg:px-8">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: reduced ? 0 : 0.12 } } }}>
          <motion.p variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }} whileHover={reduced ? undefined : { scale: 1.04 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1 text-xs font-medium text-blue-300"><motion.span animate={reduced ? undefined : { scale: [1, 1.5, 1], opacity: [1, .5, 1] }} transition={{ duration: 2, repeat: Infinity }} className="size-1.5 rounded-full bg-cyan-300" />The workspace for modern engineering teams</motion.p>
          <h1 className="text-5xl font-semibold tracking-[-0.06em] text-white sm:text-7xl lg:text-8xl">
            {words.map((word, index) => <motion.span key={word} variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }} className={`mr-3 inline-block ${index === 3 ? "bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent" : ""}`}>{word}</motion.span>)}
          </h1>
          <motion.p variants={fadeText} className="mx-auto mt-8 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">A unified engineering workspace to manage projects, monitor APIs and understand application health.</motion.p>
          <motion.div variants={fadeText} className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <motion.a href="#waitlist" whileHover={reduced ? undefined : { scale: 1.04, y: -2 }} whileTap={reduced ? undefined : { scale: .97 }} className="group inline-flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-cyan-300">Get early access <motion.span animate={reduced ? undefined : { x: [0, 4, 0] }} transition={{ duration: 1.4, repeat: Infinity }}><ArrowRight size={16} /></motion.span></motion.a>
            <motion.a href="https://github.com/Raj85446696/rituai-platform" whileHover={reduced ? undefined : { scale: 1.04, y: -2 }} whileTap={reduced ? undefined : { scale: .97 }} className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-white/30 hover:bg-white/[0.07]"><motion.span whileHover={reduced ? undefined : { rotate: 12 }}><GitBranch size={16} /></motion.span> View on GitHub</motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

const fadeText = { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
