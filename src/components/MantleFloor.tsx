"use client";

import { floors } from "@/data/site";
import { FloorHeader } from "./FloorHeader";
import { motion } from "framer-motion";

export function MantleFloor() {
  const floor = floors.find(f => f.id === "mantle")!;
  
  const tokens = ["The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog"];

  return (
    <section className="py-32 px-6 border-t border-[var(--color-border)] relative overflow-hidden min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto w-full z-10">
        <FloorHeader floor={floor} />
      </div>
      
      <div className="flex-1 flex items-center justify-center relative mt-16">
        {/* Glow behind */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/20 blur-[100px] rounded-full pointer-events-none"></div>

        {/* Concentric Rings */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute w-[600px] h-[600px] rounded-full border border-orange-500/10 border-dashed"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute w-[400px] h-[400px] rounded-full border border-orange-500/20"
        />
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-[200px] h-[200px] rounded-full border-2 border-orange-500/40 glow-mantle"
        />
        
        {/* Core */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-red-600 shadow-[0_0_50px_rgba(249,115,22,0.6)] flex items-center justify-center relative z-10 animate-soft-pulse">
          <span className="font-mono font-bold text-white tracking-tighter">vLLM</span>
        </div>
        
        {/* Tokens drifting outward */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {tokens.map((token, i) => {
            const angle = (i / tokens.length) * Math.PI * 2;
            const distance = 400;
            const startX = 0;
            const startY = 0;
            const endX = Math.cos(angle) * distance;
            const endY = Math.sin(angle) * distance;
            
            return (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 text-orange-200/60 font-mono text-sm bg-orange-950/30 px-2 py-1 rounded border border-orange-500/20 backdrop-blur-sm"
                initial={{ x: startX, y: startY, opacity: 0, scale: 0.5 }}
                animate={{ 
                  x: [startX, endX], 
                  y: [startY, endY],
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 1.2]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  delay: i * 0.5,
                  ease: "easeOut"
                }}
              >
                {token}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
