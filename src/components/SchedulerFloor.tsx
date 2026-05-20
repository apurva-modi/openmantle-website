"use client";

import { floors } from "@/data/site";
import { FloorHeader } from "./FloorHeader";
import { TiltCard } from "./TiltCard";
import { motion } from "framer-motion";

export function SchedulerFloor() {
  const floor = floors.find(f => f.id === "scheduler")!;

  const queues = [
    { name: "Priority", color: "text-green-400", bg: "bg-green-500", items: 2 },
    { name: "OnDemand", color: "text-blue-400", bg: "bg-blue-500", items: 4 },
    { name: "Batch", color: "text-orange-400", bg: "bg-orange-500", items: 6 },
  ];

  return (
    <section className="py-32 px-6 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <FloorHeader floor={floor} />
        
        <div className="grid md:grid-cols-3 gap-6 mt-16 relative">
          {/* Background connectors */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-zinc-800 -z-10 hidden md:block"></div>
          
          {queues.map((q, i) => (
            <TiltCard key={q.name} className="bg-[var(--color-card)] border border-[var(--color-card-border)] rounded-xl p-6 relative">
              <div className="flex justify-between items-center mb-8">
                <h4 className={`text-sm font-mono ${q.color}`}>{q.name}</h4>
                <div className="text-xs font-mono text-zinc-500 bg-black/50 px-2 py-1 rounded">
                  QoS Tier {i + 1}
                </div>
              </div>
              
              <div className="space-y-2 relative h-32 flex flex-col justify-end">
                {Array.from({ length: q.items }).map((_, j) => (
                  <motion.div 
                    key={j}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: j * 0.2, repeat: Infinity, repeatDelay: 2, repeatType: "reverse" }}
                    className="h-2 w-full rounded-full bg-white/5 border border-white/10 relative overflow-hidden"
                  >
                    <motion.div 
                      className={`absolute left-0 top-0 bottom-0 ${q.bg} w-1/4 opacity-50`}
                      animate={{ x: ["-100%", "400%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: j * 0.1 }}
                    />
                  </motion.div>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
