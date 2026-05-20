"use client";

import { floors } from "@/data/site";
import { FloorHeader } from "./FloorHeader";
import { TiltCard } from "./TiltCard";
import { motion } from "framer-motion";

export function GpuAgentFloor() {
  const floor = floors.find(f => f.id === "gpu-agent")!;

  return (
    <section className="py-32 px-6 border-t border-[var(--color-border)] relative">
      <div className="max-w-7xl mx-auto">
        <FloorHeader floor={floor} />
        
        <div className="grid md:grid-cols-12 gap-8 mt-16 items-center">
          <div className="md:col-span-4 space-y-4">
            {["HuggingFace Hub", "S3 / MinIO", "Local Path"].map(source => (
              <TiltCard key={source} className="bg-[var(--color-card)] border border-[var(--color-card-border)] rounded-xl p-4 text-center">
                <span className="text-sm font-mono text-[var(--color-muted)]">{source}</span>
              </TiltCard>
            ))}
          </div>

          <div className="md:col-span-1 hidden md:flex justify-center relative h-full">
            <svg width="40" height="200" style={{ color: "var(--color-border)" }}>
              <path d="M 0 20 C 20 20, 20 100, 40 100" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M 0 100 L 40 100" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M 0 180 C 20 180, 20 100, 40 100" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>

          <div className="md:col-span-7">
            <TiltCard className="bg-[var(--color-card)] border border-[var(--color-accent)]/30 rounded-xl p-8 relative overflow-hidden glow-accent">
              <h4 className="text-xs font-mono text-[var(--color-accent)] uppercase tracking-widest mb-6">GPU Node (vLLM)</h4>

              <div className="mb-4 text-xs font-mono text-[var(--color-muted)]">PagedAttention VRAM</div>
              <div className="grid grid-cols-8 gap-1 mb-6">
                {Array.from({ length: 32 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      backgroundColor: Math.random() > 0.7 ? "rgba(59, 130, 246, 0.4)" : "rgba(128, 128, 128, 0.08)"
                    }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", delay: i * 0.1 }}
                    className="aspect-square rounded-[2px] border border-[var(--color-border)]"
                  />
                ))}
              </div>

              <div className="flex gap-4 font-mono text-xs text-[var(--color-muted)]">
                <div className="flex items-center gap-2"><div className="w-2 h-2 bg-[var(--color-accent)]/40"></div> Allocated</div>
                <div className="flex items-center gap-2"><div className="w-2 h-2 bg-[var(--color-border)]"></div> Free</div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
