"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "6",    label: "Rust Services"   },
  { value: "~4k",  label: "Lines of Rust"   },
  { value: "MIT",  label: "Licensed"        },
  { value: "0",    label: "Vendor Lock-in"  },
  { value: "1 cmd",label: "To Deploy"       },
  { value: "100%", label: "OpenAI-compat"   },
];

export function MantleCore() {
  return (
    <section className="relative overflow-hidden h-72">
      {/* ── Mantle core — always behind the panels ─────────────────── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--color-background)]">
        {/* Orange glow blob */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: "70%",
            height: "10rem",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(249,115,22,0.28) 0%, rgba(249,115,22,0.09) 45%, transparent 72%)",
            filter: "blur(28px)",
          }}
        />

        {/* Eyebrow */}
        <motion.p
          className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em] mb-7"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.55 }}
        >
          Inside every managed inference layer
        </motion.p>

        {/* Stats */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-x-10 gap-y-3 px-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.4 + i * 0.09, duration: 0.5 }}
            >
              <span className="text-2xl md:text-3xl font-bold font-mono text-orange-400 tabular-nums leading-none">
                {s.value}
              </span>
              <span className="text-[9px] font-mono text-zinc-600 mt-1.5 uppercase tracking-widest leading-tight">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          className="text-[10px] font-mono text-orange-500/45 uppercase tracking-[0.3em] mt-7"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.75 }}
        >
          You now own the mantle
        </motion.p>
      </div>

      {/* ── Crack line (appears first) ──────────────────────────────── */}
      <motion.div
        className="absolute top-0 bottom-0 left-1/2 w-px z-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(249,115,22,0.95) 50%, transparent 100%)",
          boxShadow: "0 0 12px 2px rgba(249,115,22,0.35)",
        }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.32, delay: 0.12, ease: "easeOut" }}
      />

      {/* ── Left rock panel ─────────────────────────────────────────── */}
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-full z-10 flex items-center justify-end pr-10"
        style={{ background: "linear-gradient(to right, #070707, #141414)" }}
        initial={{ x: 0 }}
        whileInView={{ x: "-100%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.88, delay: 0.52, ease: [0.76, 0, 0.24, 1] }}
      >
        {/* Stone grain */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(87deg, transparent, transparent 36px, rgba(255,255,255,0.011) 36px, rgba(255,255,255,0.011) 37px),
              repeating-linear-gradient(3deg,  transparent, transparent 52px, rgba(255,255,255,0.008) 52px, rgba(255,255,255,0.008) 53px)
            `,
          }}
        />
        <div className="relative z-10 text-right">
          <p className="text-[9px] font-mono text-zinc-700 uppercase tracking-[0.3em]">Amazon</p>
          <p className="text-xl font-bold text-zinc-600 tracking-tight">Bedrock</p>
        </div>
      </motion.div>

      {/* ── Right rock panel ────────────────────────────────────────── */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full z-10 flex items-center pl-10"
        style={{ background: "linear-gradient(to left, #070707, #141414)" }}
        initial={{ x: 0 }}
        whileInView={{ x: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.88, delay: 0.52, ease: [0.76, 0, 0.24, 1] }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(93deg, transparent, transparent 36px, rgba(255,255,255,0.011) 36px, rgba(255,255,255,0.011) 37px),
              repeating-linear-gradient(-3deg, transparent, transparent 52px, rgba(255,255,255,0.008) 52px, rgba(255,255,255,0.008) 53px)
            `,
          }}
        />
        <div className="relative z-10">
          <p className="text-[9px] font-mono text-zinc-700 uppercase tracking-[0.3em]">Vertex</p>
          <p className="text-xl font-bold text-zinc-600 tracking-tight">AI</p>
        </div>
      </motion.div>
    </section>
  );
}
