"use client";

import { motion } from "framer-motion";
import { stats } from "@/data/site";

export function StatsStrip() {
  return (
    <section className="py-10 px-6 border-y border-white/5 bg-black/30 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto grid grid-cols-3 md:grid-cols-6 gap-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07, duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <span className="text-2xl font-bold font-mono text-white">{stat.value}</span>
            <span className="text-xs font-mono text-zinc-500 mt-1 uppercase tracking-widest">{stat.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
