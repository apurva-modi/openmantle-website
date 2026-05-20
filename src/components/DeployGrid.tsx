"use client";

import { useState } from "react";
import { clouds } from "@/data/site";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiCopy } from "react-icons/fi";

const SHIPS = [
  { name: "gateway",     port: "8080", note: "OpenAI + Anthropic ingress",    color: "#3b82f6" },
  { name: "router",      port: "8081", note: "Event-sourced job journal",      color: "#6366f1" },
  { name: "scheduler",   port: "8082", note: "Fair queue, lease TTL",          color: "#8b5cf6" },
  { name: "gpu-worker",  port: "8083", note: "gpu-agent + vLLM sidecar",       color: "#ec4899" },
  { name: "proxy-agent", port: "8085", note: "External provider backends",     color: "#f43f5e" },
  { name: "capacity",    port: "8086", note: "Prometheus /metrics for KEDA",   color: "#f97316" },
];

const EXTRAS = [
  { label: "KEDA ScaledObject",   desc: "Scales gpu-worker on queue depth"   },
  { label: "ServiceAccount",      desc: "RBAC for image pull + secrets"       },
  { label: "Secret template",     desc: "API_KEYS · ANTHROPIC · OPENAI keys"  },
  { label: "LoadBalancer",        desc: "Gateway only — all others ClusterIP" },
];

const MODELS_TOML = `# Self-hosted vLLM — weights from HuggingFace
[[models]]
id     = "mistral-7b"
engine = "vllm"

[models.artifact]
source = "hf://mistralai/Mistral-7B-Instruct-v0.3@main"

# External provider — no GPU required
[[models]]
id     = "claude-sonnet-4-6"
engine = "external"

[models.external]
provider    = "anthropic"
model       = "claude-sonnet-4-6"
api_key_env = "ANTHROPIC_API_KEY"

# LoRA adapter on a shared base
[[models]]
id     = "mistral-7b-acme"
engine = "vllm"

[models.lora]
base_model_id = "mistral-7b"

[models.artifact]
source = "s3://acme-weights/mistral-7b-acme/"`;

export function DeployGrid() {
  const [activeCloud, setActiveCloud] = useState(clouds[0].id);
  const [copied, setCopied] = useState(false);
  const [copiedToml, setCopiedToml] = useState(false);
  const [tab, setTab] = useState<"helm" | "models">("helm");
  const cloud = clouds.find(c => c.id === activeCloud)!;

  function copyCommand() {
    navigator.clipboard.writeText(cloud.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function copyToml() {
    navigator.clipboard.writeText(MODELS_TOML);
    setCopiedToml(true);
    setTimeout(() => setCopiedToml(false), 2000);
  }

  return (
    <section id="deploy" className="py-32 px-6 border-t border-[var(--color-border)] relative bg-[var(--color-surface)]">
      <div className="max-w-5xl mx-auto">

        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="mb-14">
          <motion.p
            className="text-[10px] font-mono text-[var(--color-muted)] uppercase tracking-widest mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Production deployment
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-[var(--color-foreground)]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
          >
            One command. Any cluster.
          </motion.h2>
          <motion.p
            className="text-[var(--color-muted)] font-mono text-sm max-w-2xl"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            A standard Helm chart — no proprietary operators, no cloud lock-in.
            Six Rust services, a KEDA autoscaler, and a{" "}
            <span className="text-white">models.toml</span> that wires GPUs to external
            providers in the same routing table.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-[1fr_260px] gap-6 items-start">

          {/* ── Left: command card ──────────────────────────────── */}
          <div className="flex flex-col gap-4">

            {/* Inner tab toggle */}
            <div className="flex items-center gap-1 bg-black/40 border border-white/5 rounded-lg p-1 self-start">
              {(["helm", "models"] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`relative px-4 py-1.5 rounded-md text-xs font-mono transition-colors ${
                    tab === t ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {tab === t && (
                    <motion.div
                      layoutId="deploy-tab"
                      className="absolute inset-0 bg-white/8 rounded-md"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.35 }}
                    />
                  )}
                  <span className="relative z-10">
                    {t === "helm" ? "helm install" : "models.toml"}
                  </span>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {tab === "helm" ? (
                <motion.div
                  key="helm"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl border border-white/8 overflow-hidden"
                >
                  {/* Cloud tabs */}
                  <div className="flex overflow-x-auto border-b border-white/5">
                    {clouds.map(c => (
                      <button
                        key={c.id}
                        onClick={() => setActiveCloud(c.id)}
                        className={`px-5 py-3 font-mono text-xs whitespace-nowrap transition-colors relative ${
                          activeCloud === c.id ? "text-white" : "text-zinc-600 hover:text-zinc-300"
                        }`}
                      >
                        {c.shortLabel}
                        {activeCloud === c.id && (
                          <motion.div
                            layoutId="cloud-tab"
                            className="absolute bottom-0 left-0 right-0 h-px bg-blue-500"
                          />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Command */}
                  <div className="relative group bg-black/70 p-5">
                    <pre className="font-mono text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed overflow-x-auto pr-16">
                      {cloud.command}
                    </pre>
                    <button
                      onClick={copyCommand}
                      className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity font-mono"
                    >
                      {copied ? <FiCheck size={11} className="text-green-400" /> : <FiCopy size={11} />}
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>

                  {/* Note */}
                  <div className="px-5 py-3 border-t border-white/5 flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <p className="text-xs text-zinc-500 font-mono">{cloud.notes}</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="models"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl border border-white/8 overflow-hidden"
                >
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-black/40">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                    <span className="ml-2 text-xs font-mono text-zinc-600">config/models.toml</span>
                    <button
                      onClick={copyToml}
                      className="ml-auto flex items-center gap-1.5 text-zinc-600 hover:text-white px-2 py-1 rounded text-xs transition-colors font-mono"
                    >
                      {copiedToml ? <FiCheck size={11} className="text-green-400" /> : <FiCopy size={11} />}
                      {copiedToml ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <div className="bg-black/70 p-5 overflow-x-auto">
                    <pre className="font-mono text-xs leading-relaxed">
                      {MODELS_TOML.split("\n").map((line, i) => {
                        const isComment = line.trimStart().startsWith("#");
                        const isSection = line.startsWith("[");
                        const isKey = !isComment && !isSection && line.includes("=");
                        return (
                          <span key={i} className="block">
                            {isComment ? (
                              <span className="text-zinc-600">{line}</span>
                            ) : isSection ? (
                              <span className="text-orange-400/80">{line}</span>
                            ) : isKey ? (
                              (() => {
                                const [k, ...rest] = line.split("=");
                                return (
                                  <>
                                    <span className="text-blue-400/80">{k}</span>
                                    <span className="text-zinc-500">=</span>
                                    <span className="text-green-400/80">{rest.join("=")}</span>
                                  </>
                                );
                              })()
                            ) : (
                              <span className="text-zinc-400">{line}</span>
                            )}
                          </span>
                        );
                      })}
                    </pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Right: what ships ──────────────────────────────── */}
          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-1">
              What ships
            </p>

            {/* Services */}
            {SHIPS.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.4 }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
              >
                <div
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: s.color }}
                />
                <div className="min-w-0">
                  <p className="text-xs font-mono font-medium text-white">{s.name}</p>
                  <p className="text-[10px] font-mono text-zinc-600 truncate">{s.note}</p>
                </div>
                <span className="ml-auto text-[10px] font-mono text-zinc-700 shrink-0">:{s.port}</span>
              </motion.div>
            ))}

            {/* Divider */}
            <div className="border-t border-white/5 my-1" />

            {/* Extras */}
            {EXTRAS.map((e, i) => (
              <motion.div
                key={e.label}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.36 + i * 0.05, duration: 0.4 }}
                className="flex items-start gap-2 px-3 py-2"
              >
                <span className="text-zinc-700 text-xs mt-0.5">+</span>
                <div>
                  <p className="text-[11px] font-mono text-zinc-400">{e.label}</p>
                  <p className="text-[10px] font-mono text-zinc-700">{e.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
