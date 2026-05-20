"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { site } from "@/data/site";
import { MagneticButton } from "./MagneticButton";
import { FiArrowRight, FiGithub } from "react-icons/fi";

// ── Headline word-by-word ───────────────────────────────────────────
const WORDS = site.tagline.split(" ");

// ── Terminal stream lines ───────────────────────────────────────────
const LINES = [
  { t: "cmd",  s: "$ curl http://localhost:8080/v1/chat/completions \\" },
  { t: "cmd",  s: '  -H "Authorization: Bearer sk-openmantle-..." \\' },
  { t: "cmd",  s: '  -d \'{"model":"mistral-7b","stream":true}\'' },
  { t: "gap",  s: "" },
  { t: "meta", s: "event: queue_meta" },
  { t: "meta", s: 'data: {"queue_wait_ms":0,"tier":"on_demand"}' },
  { t: "gap",  s: "" },
  { t: "sse",  s: 'data: {"choices":[{"delta":{"content":"Hello"},"index":0}]}' },
  { t: "sse",  s: 'data: {"choices":[{"delta":{"content":" from"},"index":0}]}' },
  { t: "sse",  s: 'data: {"choices":[{"delta":{"content":" Open"},"index":0}]}' },
  { t: "sse",  s: 'data: {"choices":[{"delta":{"content":"Mantle"},"index":0}]}' },
  { t: "sse",  s: 'data: {"choices":[{"delta":{"content":"!"},"index":0}]}' },
  { t: "done", s: "data: [DONE]" },
];

// Cumulative delay (ms) for each line appearing
const DELAYS = [50, 140, 230, 380, 620, 820, 1020, 1300, 1500, 1700, 1900, 2100, 2400];

function TerminalStream() {
  const [loop, setLoop] = useState(0);
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    setVisible(0);
    const timers = DELAYS.map((d, i) =>
      setTimeout(() => setVisible(i + 1), d)
    );
    timers.push(setTimeout(() => setLoop(l => l + 1), 5600));
    return () => timers.forEach(clearTimeout);
  }, [loop]);

  return (
    <div className="w-full max-w-xl rounded-xl border border-[var(--color-border)] overflow-hidden bg-[var(--color-syntax-bg)] backdrop-blur-sm shadow-[0_0_40px_rgba(0,0,0,0.25)]">
      {/* Titlebar */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-card)]">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        <span className="ml-3 text-[10px] font-mono text-[var(--color-muted)]">bash — openmantle</span>
        <span className="ml-auto flex items-center gap-1.5">
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-green-500"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-[10px] font-mono text-green-500/70">streaming</span>
        </span>
      </div>

      {/* Output */}
      <div className="p-5 font-mono text-xs min-h-[180px] space-y-0.5 bg-[var(--color-syntax-bg)]">
        {LINES.slice(0, visible).map((line, i) =>
          line.t === "gap" ? (
            <div key={`${loop}-${i}`} className="h-2" />
          ) : (
            <motion.div
              key={`${loop}-${i}`}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className={
                line.t === "cmd"  ? "text-[var(--color-muted)]" :
                line.t === "meta" ? "text-[var(--color-accent)]/70" :
                line.t === "sse"  ? "text-[var(--color-syntax-text)]" :
                "text-green-500"
              }
            >
              {line.s}
            </motion.div>
          )
        )}
        {/* Blinking cursor */}
        <motion.span
          className="inline-block w-[7px] h-[13px] bg-[var(--color-muted)]/50 align-middle"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>
    </div>
  );
}

// ── Hero ────────────────────────────────────────────────────────────
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse parallax
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const smoothX = useSpring(rawX, { damping: 40, stiffness: 80 });
  const smoothY = useSpring(rawY, { damping: 40, stiffness: 80 });

  const orb1X = useTransform(smoothX, [0, 1], ["-6%", "6%"]);
  const orb1Y = useTransform(smoothY, [0, 1], ["-6%", "6%"]);
  const orb2X = useTransform(smoothX, [0, 1], ["6%", "-6%"]);
  const orb2Y = useTransform(smoothY, [0, 1], ["6%", "-6%"]);

  function onMouseMove(e: React.MouseEvent) {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width);
    rawY.set((e.clientY - rect.top) / rect.height);
  }

  // Scroll-driven fade
  const { scrollY } = useScroll();
  const contentY       = useTransform(scrollY, [0, 500], [0, -50]);
  const contentOpacity = useTransform(scrollY, [0, 380], [1, 0]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-20"
    >
      {/* ── Background: parallax glow orbs ──────────────────── */}
      <motion.div
        style={{ x: orb1X, y: orb1Y }}
        className="absolute left-[10%] top-[15%] w-[650px] h-[650px] pointer-events-none"
      >
        <motion.div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.13) 0%, transparent 68%)",
            filter: "blur(48px)",
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div
        style={{ x: orb2X, y: orb2Y }}
        className="absolute right-[8%] bottom-[15%] w-[550px] h-[550px] pointer-events-none"
      >
        <motion.div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(249,115,22,0.11) 0%, transparent 68%)",
            filter: "blur(48px)",
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </motion.div>

      {/* ── Orbit rings ──────────────────────────────────────── */}
      <motion.div
        className="absolute w-[720px] h-[720px] rounded-full border border-[var(--color-foreground)]/[0.04] pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-[520px] h-[520px] rounded-full border border-[var(--color-foreground)]/[0.04] pointer-events-none"
        animate={{ rotate: -360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />

      {/* ── Scroll-driven content wrapper ────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto w-full"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-10 text-[10px] font-mono tracking-widest uppercase border rounded-full border-[var(--color-accent)]/25 text-[var(--color-accent)] bg-[var(--color-accent)]/5 backdrop-blur-sm"
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          {site.name} — Open Source
        </motion.div>

        {/* Headline — word-by-word blur reveal */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-[1.1]">
          {WORDS.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.22em] hero-word"
              initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.75,
                delay: 0.15 + i * 0.09,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
          className="text-base md:text-lg text-[var(--color-muted)] mb-10 max-w-2xl font-mono leading-relaxed"
        >
          {site.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.05, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16"
        >
          <MagneticButton>
            <a
              href="#deploy"
              className="group flex items-center justify-center gap-2 bg-[var(--color-foreground)] text-[var(--color-background)] px-8 py-3.5 rounded-full font-bold hover:opacity-90 transition-opacity text-sm"
            >
              Deploy Now
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
          </MagneticButton>

          <MagneticButton>
            <a
              href={site.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold border border-[var(--color-border)] text-[var(--color-foreground)] hover:bg-[var(--color-surface)] transition-colors text-sm"
            >
              <FiGithub size={14} />
              GitHub
            </a>
          </MagneticButton>
        </motion.div>

        {/* Live terminal stream */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 1.25, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center"
        >
          <TerminalStream />
        </motion.div>
      </motion.div>
    </section>
  );
}
