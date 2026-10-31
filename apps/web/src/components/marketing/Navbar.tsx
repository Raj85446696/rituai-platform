"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Docs", href: "#docs" },
  { label: "GitHub", href: "https://github.com/Raj85446696/rituai-platform" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const reducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [cursorHover, setCursorHover] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const smoothX = useSpring(cursorX, { stiffness: 500, damping: 35, mass: 0.2 });
  const smoothY = useSpring(cursorY, { stiffness: 500, damping: 35, mass: 0.2 });

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 16));

  useEffect(() => {
    if (reducedMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
      setCursorHover((event.target as Element | null)?.closest("a, button") !== null);
    };
    const handlePointerLeave = () => setCursorHover(false);

    window.addEventListener("pointermove", handlePointerMove);
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, [cursorX, cursorY, reducedMotion]);

  return (
    <>
      {!reducedMotion && (
        <motion.span
          aria-hidden="true"
          className="custom-cursor pointer-events-none fixed left-0 top-0 z-[100] hidden size-8 rounded-full border border-cyan-300/80 bg-cyan-300/10 mix-blend-screen md:block"
          style={{ x: smoothX, y: smoothY }}
          animate={{
            scale: cursorHover ? 1.8 : 1,
            opacity: cursorHover ? 0.9 : 0.65,
          }}
          transition={{ type: "spring", stiffness: 350, damping: 24 }}
        />
      )}
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors ${scrolled ? "border-b border-white/10 bg-[#0b1220]/85 backdrop-blur-xl" : "bg-transparent"}`}>
      <motion.nav
        initial={reducedMotion ? false : { opacity: 0, y: -16 }}
        animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8"
        aria-label="Main navigation"
      >
        <motion.a href="#" whileHover={reducedMotion ? undefined : { scale: 1.04 }} whileTap={reducedMotion ? undefined : { scale: 0.97 }} className="flex items-center gap-2 text-lg font-semibold tracking-tight text-white">
          <Image src="/logo.svg" alt="RituAI" width={2606} height={869} priority className="h-12 w-auto object-contain" />
        </motion.a>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link, index) => <motion.a key={link.label} href={link.href} initial={reducedMotion ? false : { opacity: 0, y: -8 }} animate={reducedMotion ? undefined : { opacity: 1, y: 0 }} transition={{ delay: reducedMotion ? 0 : 0.12 + index * 0.06, duration: 0.35 }} whileHover={reducedMotion ? undefined : { y: -2 }} className="text-sm text-slate-400 transition hover:text-white">{link.label}</motion.a>)}
        </div>
        <div className="hidden md:block">
          <motion.a href="#waitlist" whileHover={reducedMotion ? undefined : { scale: 1.04 }} whileTap={reducedMotion ? undefined : { scale: 0.97 }} className="inline-block rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-cyan-300">Get early access</motion.a>
        </div>
        <button type="button" className="text-slate-300 md:hidden" onClick={() => setOpen((value) => !value)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </motion.nav>
      <AnimatePresence>
        {open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-white/10 bg-[#0b1220] md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {links.map((link) => <a key={link.label} href={link.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-sm text-slate-300 hover:bg-white/5 hover:text-white">{link.label}</a>)}
            <a href="#waitlist" onClick={() => setOpen(false)} className="mt-2 rounded-lg bg-blue-500 px-4 py-3 text-center text-sm font-semibold text-white">Get early access</a>
          </div>
        </motion.div>}
      </AnimatePresence>
      </header>
    </>
  );
}
