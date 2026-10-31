"use client";

import { motion } from "framer-motion";
import { Activity, BellRing, FolderKanban, HeartPulse, Webhook } from "lucide-react";
import { fadeUp, stagger } from "@/src/lib/motion";
import { useReducedMotion } from "framer-motion";

const features = [
  [FolderKanban, "Projects and tasks", "Keep work moving with lightweight planning built for builders."],
  [Activity, "API monitoring", "Know your endpoints are healthy before your users tell you otherwise."],
  [Webhook, "Webhooks", "Connect your tools and react to important events in real time."],
  [BellRing, "Activity timeline", "A clear, searchable history of every meaningful change."],
  [HeartPulse, "Health dashboards", "Turn noisy signals into a calm, actionable view of your stack."],
] as const;

export function Features() {
  const reduced = useReducedMotion();
  return <section id="features" className="mx-auto max-w-7xl px-5 py-28 lg:px-8">
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Everything in one view</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl">Less context switching.<br /><span className="text-slate-400">More momentum.</span></h2>
    </motion.div>
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={stagger} className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {features.map(([Icon, title, description], index) => <motion.article key={title} variants={fadeUp} whileHover={reduced ? undefined : { y: -8, scale: 1.015 }} transition={{ type: "spring", stiffness: 260, damping: 20 }} className="group rounded-2xl border border-white/10 bg-[#111a2e]/70 p-6 transition-colors duration-300 hover:border-blue-400/50">
        <motion.span whileHover={reduced ? undefined : { rotate: -8, scale: 1.12 }} transition={{ type: "spring", stiffness: 300 }} className="mb-8 grid size-10 place-items-center rounded-xl bg-blue-500/10 text-blue-300 ring-1 ring-blue-400/20"><motion.span animate={reduced ? undefined : { y: [0, -2, 0] }} transition={{ delay: index * .15, duration: 2.5, repeat: Infinity }}><Icon size={20} /></motion.span></motion.span>
        <h3 className="font-semibold text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
      </motion.article>)}
    </motion.div>
  </section>;
}
