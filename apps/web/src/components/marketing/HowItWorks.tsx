"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Plus, Radar } from "lucide-react";
import { fadeUp } from "@/src/lib/motion";

const steps = [
  ["01", "Create a workspace", "Give your team one calm home for everything they ship.", Plus],
  ["02", "Add projects", "Bring your repositories, services, and tasks together.", Check],
  ["03", "Monitor services", "See health signals and act before issues become incidents.", Radar],
] as const;

export function HowItWorks() {
  const reduced = useReducedMotion();
  return <section id="how-it-works" className="border-y border-white/10 bg-white/[0.015]"><div className="mx-auto max-w-7xl px-5 py-28 lg:px-8">
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="text-center"><p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">A better rhythm</p><h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">From first commit to full confidence.</h2></motion.div>
    <div className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
      <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1, ease: "easeOut" }} className="absolute left-[16%] right-[16%] top-6 hidden h-px origin-left bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 md:block" />
      {steps.map(([number, title, description, Icon], index) => <motion.article key={number} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} transition={{ delay: index * 0.15 }} variants={fadeUp} className="relative text-center">
        <motion.div whileHover={reduced ? undefined : { scale: 1.12, boxShadow: "0 0 42px rgba(34,211,238,.28)" }} className="relative z-10 mx-auto grid size-12 place-items-center rounded-full border border-blue-400/40 bg-[#0b1220] text-sm font-bold text-blue-300 shadow-[0_0_30px_rgba(59,130,246,0.2)]">{number}</motion.div>
        <motion.span whileHover={reduced ? undefined : { rotate: 10, scale: 1.1 }} className="mx-auto mt-8 grid size-10 place-items-center rounded-lg bg-white/5 text-slate-300"><Icon size={18} /></motion.span>
        <h3 className="mt-5 font-semibold text-white">{title}</h3><p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-slate-400">{description}</p>
      </motion.article>)}
    </div>
  </div></section>;
}
