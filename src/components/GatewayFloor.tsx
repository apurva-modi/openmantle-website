"use client";

import { floors } from "@/data/site";
import { FloorHeader } from "./FloorHeader";
import { TiltCard } from "./TiltCard";
import { motion } from "framer-motion";

export function GatewayFloor() {
  const floor = floors.find(f => f.id === "gateway")!;

  return (
    <section id="architecture" className="py-32 px-6 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto">
        <FloorHeader floor={floor} />
        
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <TiltCard className="bg-[var(--color-card)] border border-[var(--color-card-border)] rounded-xl overflow-hidden relative group h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--color-card-border)] bg-black/50">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              <div className="ml-2 text-xs font-mono text-zinc-500">bash</div>
            </div>
            <div className="p-6 font-mono text-sm text-[var(--color-syntax-text)] overflow-x-auto h-[calc(100%-45px)] flex items-center">
              <pre>
                <code>
                  <span className="text-blue-400">curl</span> https://api.openmantle.dev/v1/chat/completions \{"\n"}
                  {"  "}-H <span className="text-green-400">"Authorization: Bearer $OPENAI_API_KEY"</span> \{"\n"}
                  {"  "}-d <span className="text-orange-400">'{'{'}"model": "mistral-7b", "messages": [...] {'}'}'</span>
                </code>
              </pre>
            </div>
          </TiltCard>

          <TiltCard className="bg-[var(--color-card)] border border-[var(--color-card-border)] rounded-xl p-8 relative overflow-hidden flex flex-col justify-center h-full min-h-[250px]">
            <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-8 absolute top-6 left-6">Request Pipeline</h4>
            
            <div className="relative flex items-center justify-between mt-8">
              {/* Pipeline Line */}
              <div className="absolute left-0 right-0 h-px bg-zinc-800 top-1/2 -translate-y-1/2"></div>
              
              {/* Traveling Dot */}
              <motion.div 
                className="absolute left-0 w-2 h-2 bg-blue-500 rounded-full top-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(59,130,246,0.8)] z-10"
                animate={{ left: ["0%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />

              {/* Stages */}
              {["Auth", "Rate Limit", "Route"].map((stage) => (
                <div key={stage} className="relative z-10 flex flex-col items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-[var(--color-card)] border-2 border-blue-500/50 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50"></div>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 absolute top-8 whitespace-nowrap">{stage}</span>
                </div>
              ))}
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
