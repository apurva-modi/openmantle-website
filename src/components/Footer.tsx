import { site } from "@/data/site";
import Link from "next/link";
import { FiGithub } from "react-icons/fi";

export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-[var(--color-border)] bg-[var(--color-background)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2 font-bold font-mono tracking-tight text-[var(--color-foreground)]">
          <span className="text-blue-500">/</span>
          {site.name}
        </div>

        <div className="flex items-center gap-6 text-sm text-[var(--color-muted)]">
          <span>© {new Date().getFullYear()} OpenMantle. MIT Licensed.</span>
          <Link href={site.repoUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-foreground)] transition-colors">
            <FiGithub size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
