"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({ email: z.string().email("Enter a valid email address.") });
type FormData = z.infer<typeof schema>;

export function Waitlist() {
  const [submitted, setSubmitted] = useState(false);
  const reduced = useReducedMotion();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onSubmit = async (data: FormData) => { void data; await new Promise((resolve) => setTimeout(resolve, 1000)); setSubmitted(true); toast.success("You’re on the list!", { description: "We’ll be in touch soon." }); };
  return <section id="waitlist" className="px-5 py-28"><motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} whileHover={reduced ? undefined : { y: -4 }} transition={{ duration: .6 }} className="mx-auto max-w-2xl rounded-2xl border border-blue-400/20 bg-gradient-to-b from-blue-500/10 to-[#111a2e] p-8 text-center sm:p-14"><AnimatePresence mode="wait">{submitted ? <motion.div key="success" initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 220 }}><motion.span initial={{ scale: 0, rotate: -45 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 280, delay: .1 }} className="mx-auto grid size-14 place-items-center rounded-full bg-emerald-400/15 text-emerald-300"><Check /></motion.span><h2 className="mt-6 text-3xl font-semibold text-white">You’re on the list.</h2><p className="mt-3 text-slate-400">We’ll save you a seat when RituAI is ready.</p></motion.div> : <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Early access</p><h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Build with a little more confidence.</h2><p className="mx-auto mt-4 max-w-lg text-slate-400">Join the waitlist and be among the first teams to shape the future of engineering workspaces.</p><form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-8 max-w-md text-left"><div className="flex flex-col gap-3 sm:flex-row"><label htmlFor="email" className="sr-only">Email address</label><motion.div whileFocus={{ scale: 1.01 }} className="relative flex-1"><Mail size={16} className="absolute left-3 top-3.5 text-slate-500" /><input id="email" type="email" placeholder="you@company.com" {...register("email")} className="w-full rounded-lg border border-white/15 bg-[#0b1220] py-3 pl-10 pr-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20" /></motion.div><motion.button whileHover={reduced || isSubmitting ? undefined : { scale: 1.04 }} whileTap={reduced || isSubmitting ? undefined : { scale: .97 }} disabled={isSubmitting} className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-70">{isSubmitting && <Loader2 size={16} className="animate-spin" />} {isSubmitting ? "Joining..." : "Join waitlist"}</motion.button></div>{errors.email && <motion.p initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="mt-2 text-xs text-red-300">{errors.email.message}</motion.p>}</form><p className="mt-4 text-xs text-slate-600">No spam. Just thoughtful product updates.</p></motion.div>}</AnimatePresence></motion.div></section>;
}
