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
        
        <div className="grid md:grid-cols-12 gap-8 mt-16 items-stretch">
          {/* Source cards — stretch to full GPU card height */}
          <div className="md:col-span-4 flex flex-col justify-between gap-4">
            {["HuggingFace Hub", "S3 / MinIO", "Local Path"].map(source => (
              <TiltCard key={source} className="bg-[var(--color-card)] border border-[var(--color-card-border)] rounded-xl p-4 text-center flex items-center justify-center flex-1">
                <span className="text-sm font-mono text-[var(--color-muted)]">{source}</span>
              </TiltCard>
            ))}
          </div>

          {/* Connector — percentage-based so arrows always align with cards */}
          <div className="md:col-span-1 hidden md:block relative">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 60 100"
              preserveAspectRatio="none"
              style={{ color: "var(--color-border)", overflow: "visible" }}
            >
              {/* Top card → center */}
              <path d="M 0,17 C 30,17 30,50 60,50" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              {/* Middle card → center */}
              <path d="M 0,50 L 60,50" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              {/* Bottom card → center */}
              <path d="M 0,83 C 30,83 30,50 60,50" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              {/* Arrowhead */}
              <polyline points="53,46 60,50 53,54" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
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
