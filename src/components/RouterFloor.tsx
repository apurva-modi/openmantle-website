"use client";

import { floors } from "@/data/site";
import { FloorHeader } from "./FloorHeader";
import { TiltCard } from "./TiltCard";

export function RouterFloor() {
  const floor = floors.find(f => f.id === "router")!;

  const events = [
    { type: "JobSubmitted", id: "req_8f72a", time: "0.000s" },
    { type: "RateLimitChecked", id: "req_8f72a", time: "0.001s" },
    { type: "JobAssigned", id: "req_8f72a", time: "0.005s", dest: "node-14" },
    { type: "TokensStreaming", id: "req_8f72a", time: "0.420s" },
    { type: "JobCompleted", id: "req_8f72a", time: "1.240s" },
    { type: "JobSubmitted", id: "req_9b31c", time: "1.245s" },
    { type: "RateLimitChecked", id: "req_9b31c", time: "1.246s" },
    { type: "JobAssigned", id: "req_9b31c", time: "1.250s", dest: "node-02" },
  ];

  const logEntries = [...events, ...events, ...events, ...events];

  return (
    <section className="py-32 px-6 border-t border-[var(--color-border)] relative">
      <div className="max-w-7xl mx-auto">
        <FloorHeader floor={floor} />
        
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <TiltCard className="bg-[var(--color-card)] border border-[var(--color-card-border)] rounded-xl overflow-hidden relative h-[400px]">
            <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[var(--color-card)] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[var(--color-card)] to-transparent z-10 pointer-events-none"></div>
            
            <div className="p-6 font-mono text-xs overflow-hidden h-full">
              <div className="animate-journal flex flex-col gap-2">
                {logEntries.map((event, i) => (
                  <div key={i} className="flex items-center gap-4 py-2 border-b border-white/5 text-zinc-500">
                    <span className="w-16">{event.time}</span>
                    <span className="text-zinc-400 w-24">{event.id}</span>
                    <span className={`
                      ${event.type === 'JobCompleted' ? 'text-green-400' : ''}
                      ${event.type === 'JobSubmitted' ? 'text-blue-400' : ''}
                      ${event.type === 'JobAssigned' ? 'text-orange-400' : ''}
                      ${event.type === 'TokensStreaming' ? 'text-purple-400' : ''}
                    `}>{event.type}</span>
                    {event.dest && <span className="ml-auto text-zinc-600">{event.dest}</span>}
                  </div>
                ))}
              </div>
            </div>
          </TiltCard>

          <TiltCard className="bg-[var(--color-card)] border border-[var(--color-card-border)] rounded-xl p-8 flex flex-col justify-center">
            <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6">Topic Configuration</h4>
            <div className="space-y-4 font-mono text-sm">
              <div className="flex justify-between items-center py-3 border-b border-white/5">
                <span className="text-zinc-400">Retention</span>
                <span className="text-white bg-white/10 px-2 py-1 rounded">24h</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/5">
                <span className="text-zinc-400">Partitions</span>
                <span className="text-white bg-white/10 px-2 py-1 rounded">128</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/5">
                <span className="text-zinc-400">Replication</span>
                <span className="text-white bg-white/10 px-2 py-1 rounded">3</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-white/5">
                <span className="text-zinc-400">Protocol</span>
                <span className="text-blue-400 bg-blue-500/10 px-2 py-1 rounded">Kafka API</span>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
