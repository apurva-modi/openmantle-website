"use client";

import { motion } from "framer-motion";

const comparisons = [
  {
    them: "Pay $0.002–$0.06 per 1K tokens to a cloud provider",
    us: "Pay flat GPU compute — ~$1–2/hr on a g4dn.xlarge",
  },
  {
    them: "Black-box routing — no visibility into queue depth or backend health",
    us: "Every state transition is a journal event. Fully replayable and observable",
  },
  {
    them: "Vendor lock-in: swap providers, rewrite your client",
    us: "OpenAI & Anthropic Messages API compatible. Swap the URL, keep everything else",
  },
  {
    them: "Autoscaling tied to provider's infra — you don't control the knobs",
    us: "KEDA ScaledObject on queue depth. You set the thresholds",
  },
  {
    them: "No multi-model routing — one endpoint, one provider",
    us: "Route by model ID across local GPUs and external providers in one cluster",
  },
];

export function WhySection() {
  return (
    <section id="why" className="py-32 px-6 border-t border-[var(--color-border)] relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-[var(--color-foreground)]"
          >
            The layer you've been renting.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[var(--color-muted)] font-mono text-sm max-w-xl mx-auto"
          >
            Every managed inference API is a wrapper around hardware you could run yourself.
          </motion.p>
        </div>

        <div className="space-y-3">
          {comparisons.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="grid md:grid-cols-2 gap-px rounded-xl overflow-hidden border border-[var(--color-border)]"
            >
              <div className="bg-red-500/5 border-r border-[var(--color-border)] px-6 py-4 flex items-start gap-3">
                <span className="text-red-400/60 font-mono text-xs mt-0.5 shrink-0">✗</span>
                <p className="text-sm text-[var(--color-muted)] font-mono leading-relaxed">{row.them}</p>
              </div>
              <div className="bg-green-500/5 px-6 py-4 flex items-start gap-3">
                <span className="text-green-500 font-mono text-xs mt-0.5 shrink-0">✓</span>
                <p className="text-sm text-[var(--color-foreground)] font-mono leading-relaxed">{row.us}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
