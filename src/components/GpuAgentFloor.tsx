"use client";

import { floors } from "@/data/site";
import { FloorHeader } from "./FloorHeader";
import { TiltCard } from "./TiltCard";
import { motion } from "framer-motion";

const SOURCES = [
  {
    label: "HuggingFace Hub",
    color: "#f59e0b",
    dot: "bg-amber-400",
    uri: "hf://mistralai/",
    uriLine2: "Mistral-7B-Instruct-v0.3",
    rows: [
      { k: "params",  v: "7 B" },
      { k: "dtype",   v: "bfloat16" },
      { k: "shards",  v: "8 × safetensors" },
      { k: "license", v: "Apache-2.0" },
    ],
  },
  {
    label: "S3 / MinIO",
    color: "#10b981",
    dot: "bg-emerald-400",
    uri: "s3://acme-weights/",
    uriLine2: "mistral-7b-acme/",
    rows: [
      { k: "adapter_config.json",  v: "2.1 KB" },
      { k: "adapter_model.bin",    v: "847 MB" },
      { k: "tokenizer.json",       v: "1.8 MB" },
      { k: "special_tokens_map",   v: "0.4 KB" },
    ],
  },
  {
    label: "Local Path",
    color: "#a78bfa",
    dot: "bg-violet-400",
    uri: "/models/mistral-7b/",
    uriLine2: "",
    rows: [
      { k: "config.json",                        v: "1.2 KB" },
      { k: "model-00001-of-00008.safetensors",   v: "4.9 GB" },
      { k: "model-00002-of-00008.safetensors",   v: "4.9 GB" },
      { k: "tokenizer.model",                    v: "0.5 MB" },
    ],
  },
];

export function GpuAgentFloor() {
  const floor = floors.find(f => f.id === "gpu-agent")!;

  return (
    <section className="py-32 px-6 border-t border-[var(--color-border)] relative">
      <div className="max-w-7xl mx-auto">
        <FloorHeader floor={floor} />

        <div className="grid md:grid-cols-12 gap-8 mt-16 items-stretch">
          {/* Source cards */}
          <div className="md:col-span-4 flex flex-col gap-4">
            {SOURCES.map((src, idx) => (
              <TiltCard key={src.label} className="bg-[var(--color-card)] border border-[var(--color-card-border)] rounded-xl overflow-hidden flex-1">
                {/* Card header */}
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--color-border)]">
                  <motion.span
                    className={`w-1.5 h-1.5 rounded-full ${src.dot}`}
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2.4, repeat: Infinity, delay: idx * 0.6 }}
                  />
                  <span className="text-[11px] font-mono font-medium text-[var(--color-foreground)]">{src.label}</span>
                </div>

                {/* URI */}
                <div className="px-4 pt-3 pb-1">
                  <p className="text-[10px] font-mono leading-relaxed" style={{ color: src.color }}>
                    {src.uri}{src.uriLine2 && <span className="text-[var(--color-muted)]">{src.uriLine2}</span>}
                  </p>
                </div>

                {/* Key-value rows */}
                <div className="px-4 pb-3 space-y-1">
                  {src.rows.map(r => (
                    <div key={r.k} className="flex justify-between items-baseline gap-2">
                      <span className="text-[10px] font-mono text-[var(--color-muted)] truncate">{r.k}</span>
                      <span className="text-[10px] font-mono shrink-0" style={{ color: src.color }}>{r.v}</span>
                    </div>
                  ))}
                </div>
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
