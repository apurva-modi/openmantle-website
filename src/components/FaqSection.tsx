"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "@/data/site";
import { FiChevronDown } from "react-icons/fi";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 px-6 border-t border-[var(--color-border)] relative bg-[var(--color-background)]">
      <div className="max-w-3xl mx-auto">
        <h3 className="text-3xl font-bold mb-12 tracking-tight text-center text-[var(--color-foreground)]">Frequently Asked Questions</h3>

        <div className="divide-y divide-[var(--color-border)]">
          {faqs.map((faq, index) => (
            <div key={index}>
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span className="text-base font-medium text-[var(--color-foreground)] group-hover:text-[var(--color-accent)] transition-colors pr-8">
                  {faq.question}
                </span>
                <FiChevronDown
                  className={`shrink-0 text-[var(--color-muted)] transition-transform duration-300 ${open === index ? "rotate-180" : ""}`}
                  size={18}
                />
              </button>
              <AnimatePresence initial={false}>
                {open === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 text-sm text-[var(--color-muted)] leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
