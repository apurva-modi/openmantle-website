"use client";

import Link from "next/link";
import { useContext } from "react";
import { site } from "@/data/site";
import { FiGithub, FiSun, FiMoon } from "react-icons/fi";
import { ThemeContext } from "./ThemeProvider";

export function Navbar() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md border-b border-[var(--color-border)] bg-[var(--nav-bg)]">
      <Link href="/" className="flex items-center gap-2 font-bold font-mono tracking-tight text-[var(--color-foreground)]">
        <span className="text-blue-500">/</span>
        {site.name}
      </Link>
      <div className="flex items-center gap-6">
        <Link href="#why" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors hidden sm:block">
          Why
        </Link>
        <Link href="#flow" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors hidden sm:block">
          Flow
        </Link>
        <Link href="#architecture" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors hidden sm:block">
          Architecture
        </Link>
        <Link href="#deploy" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-foreground)] transition-colors hidden sm:block">
          Deploy
        </Link>

        {/* Theme toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-[var(--color-border)] hover:bg-[var(--color-surface)] transition-colors text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <FiSun size={14} /> : <FiMoon size={14} />}
        </button>

        <Link
          href={site.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-1.5 text-sm border border-[var(--color-border)] rounded-full hover:bg-[var(--color-surface)] transition-colors text-[var(--color-foreground)]"
        >
          <FiGithub />
          GitHub
        </Link>
      </div>
    </nav>
  );
}
