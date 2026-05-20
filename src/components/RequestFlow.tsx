"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Protocol = "openai" | "anthropic";

interface Step {
  id: string;
  label: string;
  subtitle: string;
  icon: string;
  color: string;
  payload: string;
  description: string;
}

const OPENAI_STEPS: Step[] = [
  {
    id: "client",
    label: "Client",
    subtitle: "Your Application",
    icon: "◈",
    color: "#3b82f6",
    payload: `POST /v1/chat/completions HTTP/1.1
Authorization: Bearer sk-openmantle-...
Content-Type: application/json

{
  "model": "mistral-7b",
  "messages": [{ "role": "user", "content": "Hello" }],
  "stream": true
}`,
    description:
      "OpenAI Chat Completions API (/v1/chat/completions) or Anthropic Messages API (/v1/messages). Point your existing SDK at OpenMantle — nothing else changes.",
  },
  {
    id: "gateway",
    label: "Gateway",
    subtitle: ":8080  ·  axum + tower",
    icon: "⬡",
    color: "#6366f1",
    payload: `✓  API key validated   (OPENMANTLE_API_KEYS)
✓  Protocol detected   OpenAI /v1/chat/completions
✓  Rate limits checked
→  Forwarding to Scheduler :8082`,
    description:
      "Auth, rate limiting, protocol detection. OpenAI requests pass through unchanged.",
  },
  {
    id: "scheduler",
    label: "Scheduler",
    subtitle: ":8082  ·  fair queue",
    icon: "⬟",
    color: "#8b5cf6",
    payload: `tier:        on_demand
tenant:      default
queue_depth: 0
wait_ms:     0

→  Dispatching to Router :8081`,
    description:
      "QoS-aware priority queue. Priority → OnDemand → Batch tiers. Round-robin across tenants.",
  },
  {
    id: "router",
    label: "Router",
    subtitle: ":8081  ·  event journal",
    icon: "◎",
    color: "#a855f7",
    payload: `APPEND JobSubmitted  { id: "f3a8b2", model: "mistral-7b" }
APPEND JobAssigned   { backend: "gpu-agent-local",
                        lease_expires_at: +5min }

view: 1 running / 4 max on backend "gpu-agent-local"`,
    description:
      "Event-sourced state machine. Every job transition is an append to the durable journal.",
  },
  {
    id: "agent",
    label: "GPU Agent",
    subtitle: ":8083  ·  vLLM manager",
    icon: "◉",
    color: "#ec4899",
    payload: `← Received job from Router
→ Forwarding to vLLM at localhost:8000
← Streaming SSE tokens from vLLM
→ Relaying tokens upstream → Gateway → Client
→ APPEND JobCompleted { tokens: 47, latency_ms: 380 }`,
    description:
      "Manages vLLM lifecycle. Sends heartbeats to Router. Streams tokens back upstream.",
  },
  {
    id: "vllm",
    label: "vLLM Engine",
    subtitle: "PagedAttention  ·  continuous batching",
    icon: "◆",
    color: "#f97316",
    payload: `data: {"choices":[{"delta":{"content":"Hello"},"index":0}]}
data: {"choices":[{"delta":{"content":" there"},"index":0}]}
data: {"choices":[{"delta":{"content":"!"},"index":0}]}
data: {"choices":[{"delta":{},"finish_reason":"stop"}],
       "usage":{"prompt_tokens":10,"completion_tokens":3}}
data: [DONE]`,
    description:
      "PagedAttention, tensor parallelism, continuous batching. This is the layer you now own.",
  },
];

const ANTHROPIC_STEPS: Step[] = [
  {
    id: "client",
    label: "Client",
    subtitle: "Anthropic SDK",
    icon: "◈",
    color: "#3b82f6",
    payload: `POST /v1/messages HTTP/1.1
x-api-key: sk-ant-...
anthropic-version: 2023-06-01

{
  "model": "claude-3-5-sonnet-20241022",
  "max_tokens": 1024,
  "system": "You are helpful.",
  "messages": [{ "role": "user", "content": "Hello" }]
}`,
    description:
      "Standard Anthropic Messages API. Point your SDK at OpenMantle — nothing else changes.",
  },
  {
    id: "gateway",
    label: "Gateway",
    subtitle: ":8080  ·  protocol bridge",
    icon: "⬡",
    color: "#6366f1",
    payload: `✓  API key validated
✓  Protocol detected: Anthropic Messages API
→  AnthropicIngressAdapter.parse():
     system field   → { role: "system", content: "…" }
     content blocks → flat string
     max_tokens     → ChatCompletionRequest.max_tokens

← Internal ChatCompletionRequest constructed`,
    description:
      "Gateway detects the Anthropic wire format. AnthropicIngressAdapter translates it to the internal representation.",
  },
  {
    id: "scheduler",
    label: "Scheduler",
    subtitle: ":8082  ·  protocol-agnostic",
    icon: "⬟",
    color: "#8b5cf6",
    payload: `tier:   on_demand
tenant: default
→  Internal ChatCompletionRequest only from here on.
   Protocol is invisible below the Gateway.`,
    description:
      "Scheduler operates on the internal format. Protocol-agnostic from this point forward.",
  },
  {
    id: "router",
    label: "Router",
    subtitle: ":8081  ·  event journal",
    icon: "◎",
    color: "#a855f7",
    payload: `APPEND JobSubmitted  { id: "c7d9e1" }
APPEND JobAssigned   { backend: "gpu-agent-local" }

← Same event-sourced routing regardless of protocol.`,
    description:
      "Identical routing logic. The journal doesn't know or care about the originating protocol.",
  },
  {
    id: "agent",
    label: "GPU Agent",
    subtitle: ":8083  ·  vLLM manager",
    icon: "◉",
    color: "#ec4899",
    payload: `← Job received (internal format)
→ vLLM inference
← Raw token stream back
→ Relaying to Gateway for response translation`,
    description:
      "GPU Agent speaks the internal format only. Response translation happens at the Gateway on the way back.",
  },
  {
    id: "vllm",
    label: "Gateway  ·  Response",
    subtitle: "Translating back to Anthropic SSE",
    icon: "◆",
    color: "#f97316",
    payload: `← vLLM tokens arrive at Gateway
→  AnthropicIngressAdapter.render_delta():

event: message_start
data: {"type":"message_start","message":{"role":"assistant",...}}

event: content_block_delta
data: {"type":"content_block_delta",
       "delta":{"type":"text_delta","text":"Hello"}}

event: message_stop
data: {"type":"message_stop"}`,
    description:
      "Gateway translates vLLM SSE back to Anthropic streaming format before responding to the client.",
  },
];

const STEP_MS = 3200;

export function RequestFlow() {
  const [protocol, setProtocol] = useState<Protocol>("openai");
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);

  const steps = protocol === "openai" ? OPENAI_STEPS : ANTHROPIC_STEPS;
  const step = steps[active];

  useEffect(() => { setActive(0); }, [protocol]);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setActive(a => (a + 1) % steps.length), STEP_MS);
    return () => clearInterval(id);
  }, [playing, steps.length]);

  function pick(i: number) { setActive(i); setPlaying(false); }

  return (
    <section id="flow" className="py-32 px-6 border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="max-w-5xl mx-auto">

        {/* ── Header ───────────────────────────────────────────────── */}
        <div className="text-center mb-14">
          <motion.p
            className="text-[10px] font-mono text-[var(--color-muted)] uppercase tracking-widest mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            End-to-end request pipeline
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl font-bold tracking-tighter mb-8 text-[var(--color-foreground)]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
          >
            From client to silicon.
          </motion.h2>

          {/* Protocol pill toggle */}
          <div className="inline-flex items-center rounded-full border border-[var(--color-border)] p-1 bg-[var(--color-card)] gap-0.5">
            {(["openai", "anthropic"] as const).map(p => (
              <button
                key={p}
                onClick={() => setProtocol(p)}
                className={`relative px-5 py-2 rounded-full text-sm font-mono transition-colors duration-200 ${
                  protocol === p ? "text-[var(--color-background)]" : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
                }`}
              >
                {protocol === p && (
                  <motion.div
                    layoutId="proto-pill"
                    className="absolute inset-0 rounded-full bg-[var(--color-foreground)]"
                    transition={{ type: "spring", bounce: 0.18, duration: 0.38 }}
                  />
                )}
                <span className="relative z-10">
                  {p === "openai" ? "OpenAI Protocol" : "Anthropic Protocol"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Pipeline grid ────────────────────────────────────────── */}
        <div className="grid md:grid-cols-[200px_1fr] gap-6 items-start">

          {/* Left: node list */}
          <div className="flex flex-col">
            {steps.map((s, i) => (
              <div key={s.id} className="flex flex-col">
                <button
                  onClick={() => pick(i)}
                  className="group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors hover:bg-[var(--color-surface)] text-left"
                >
                  {/* Circle */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300"
                    style={{
                      borderColor: active === i ? `${s.color}80` : "var(--color-border)",
                      backgroundColor: active === i ? `${s.color}18` : "transparent",
                    }}
                  >
                    <span
                      className="text-sm leading-none transition-colors duration-300"
                      style={{ color: active === i ? s.color : "var(--color-muted)" }}
                    >
                      {s.icon}
                    </span>
                  </div>

                  {/* Label */}
                  <div className="overflow-hidden">
                    <p
                      className={`text-sm font-mono font-medium truncate transition-colors ${
                        active === i ? "text-[var(--color-foreground)]" : "text-[var(--color-muted)] group-hover:text-[var(--color-foreground)]"
                      }`}
                    >
                      {s.label}
                    </p>
                  </div>

                  {/* Active indicator */}
                  {active === i && (
                    <motion.div
                      layoutId="node-dot"
                      className="ml-auto w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ backgroundColor: s.color }}
                    />
                  )}
                </button>

                {/* Connector line + traveling packet */}
                {i < steps.length - 1 && (
                  <div className="relative ml-7 w-px h-5 bg-[var(--color-border)] overflow-hidden">
                    {active === i && playing && (
                      <motion.div
                        key={`pkt-${protocol}-${i}`}
                        className="absolute w-full rounded-full"
                        style={{
                          height: 10,
                          background: `linear-gradient(to bottom, ${s.color}, transparent)`,
                        }}
                        initial={{ y: -10 }}
                        animate={{ y: 20 }}
                        transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right: payload panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${protocol}-${active}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22 }}
              className="rounded-xl border overflow-hidden"
              style={{ borderColor: `${step.color}28` }}
            >
              {/* Panel header */}
              <div
                className="flex items-center gap-3 px-5 py-4 border-b"
                style={{
                  background: `${step.color}10`,
                  borderColor: `${step.color}22`,
                }}
              >
                <span style={{ color: step.color }} className="text-lg shrink-0">
                  {step.icon}
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-sm font-bold text-[var(--color-foreground)]">{step.label}</p>
                  <p className="font-mono text-[10px] text-[var(--color-muted)] truncate">{step.subtitle}</p>
                </div>
                <span className="ml-auto text-[10px] font-mono text-[var(--color-muted)] shrink-0">
                  {active + 1} / {steps.length}
                </span>
              </div>

              {/* Payload */}
              <div className="p-5 bg-[var(--color-syntax-bg)] min-h-[200px]">
                <pre className="font-mono text-xs text-[var(--color-syntax-text)] whitespace-pre-wrap leading-relaxed overflow-x-auto">
                  {step.payload}
                </pre>
              </div>

              {/* Description */}
              <div
                className="px-5 pt-3 pb-1 border-t bg-[var(--color-card)]"
                style={{ borderColor: `${step.color}18` }}
              >
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">{step.description}</p>
              </div>

              {/* Progress bar */}
              {playing && (
                <div className="px-5 pt-2 bg-[var(--color-card)]">
                  <div className="h-px bg-[var(--color-border)] rounded-full overflow-hidden">
                    <motion.div
                      key={`bar-${protocol}-${active}`}
                      className="h-full rounded-full"
                      style={{ background: step.color, transformOrigin: "left" }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: STEP_MS / 1000, ease: "linear" }}
                    />
                  </div>
                </div>
              )}

              {/* Controls */}
              <div className="px-5 py-3 flex items-center justify-between bg-[var(--color-card)]">
                <button
                  onClick={() => setPlaying(p => !p)}
                  className="text-[11px] font-mono text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors"
                >
                  {playing ? "⏸ pause" : "▶ play"}
                </button>

                {/* Step dots */}
                <div className="flex items-center gap-1.5">
                  {steps.map((_, i) => (
                    <button key={i} onClick={() => pick(i)}>
                      <div
                        className="rounded-full transition-all duration-300"
                        style={{
                          height: 4,
                          width: active === i ? 14 : 4,
                          backgroundColor: active === i ? step.color : "var(--color-border)",
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
