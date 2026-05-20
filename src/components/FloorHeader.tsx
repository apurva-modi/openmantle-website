import { Floor } from "@/data/site";

export function FloorHeader({ floor }: { floor: Floor }) {
  return (
    <div className="max-w-2xl mb-16">
      <div className="flex items-center gap-4 text-xs font-mono tracking-widest text-[var(--color-muted)] uppercase mb-6">
        <span className="text-blue-500">Floor {floor.depth}</span>
        <div className="h-px bg-[var(--color-border)] flex-1"></div>
      </div>
      <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-[var(--color-foreground)]">
        {floor.title}
      </h2>
      <h3 className="text-xl md:text-2xl text-[var(--color-foreground)] mb-6 tracking-tight opacity-75">
        {floor.subtitle}
      </h3>
      <p className="text-[var(--color-muted)] font-mono text-sm leading-relaxed mb-8">
        {floor.body}
      </p>
      <div className="flex flex-wrap gap-2">
        {floor.tags.map(tag => (
          <span key={tag} className="px-3 py-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full text-xs font-mono text-[var(--color-muted)]">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
