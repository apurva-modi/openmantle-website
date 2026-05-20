import { Floor } from "@/data/site";

export function FloorHeader({ floor }: { floor: Floor }) {
  return (
    <div className="max-w-2xl mb-16">
      <div className="flex items-center gap-4 text-xs font-mono tracking-widest text-zinc-500 uppercase mb-6">
        <span className="text-blue-500">Floor {floor.depth}</span>
        <div className="h-px bg-zinc-800 flex-1"></div>
      </div>
      <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4">
        {floor.title}
      </h2>
      <h3 className="text-xl md:text-2xl text-zinc-300 mb-6 tracking-tight">
        {floor.subtitle}
      </h3>
      <p className="text-zinc-400 font-mono text-sm leading-relaxed mb-8">
        {floor.body}
      </p>
      <div className="flex flex-wrap gap-2">
        {floor.tags.map(tag => (
          <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-zinc-400">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
