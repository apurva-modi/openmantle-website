import { parityMatrix } from "@/data/site";

export function ParityMatrix() {
  return (
    <section className="py-24 px-6 relative bg-[var(--color-surface)]">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-xl font-bold mb-8 tracking-tight text-[var(--color-foreground)]">Feature Parity</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="py-4 font-normal text-[var(--color-muted)] font-mono">Capability</th>
                {parityMatrix.columns.map(col => (
                  <th key={col} className="py-4 font-normal text-[var(--color-muted)] font-mono px-4">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {parityMatrix.rows.map((row, i) => (
                <tr key={i} className="hover:bg-[var(--color-card)] transition-colors">
                  <td className="py-4 pr-4 font-medium text-[var(--color-foreground)]">{row.feature}</td>
                  {row.support.map((val, j) => (
                    <td key={j} className="py-4 px-4 font-mono text-xs text-[var(--color-muted)]">
                      {val === "✅" ? (
                        <span className="inline-flex items-center justify-center bg-green-500/10 text-green-500 border border-green-500/20 w-6 h-6 rounded-full">✓</span>
                      ) : (
                        <span className="bg-[var(--color-card)] px-2 py-1 rounded whitespace-nowrap">{val}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
