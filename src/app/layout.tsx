import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OpenMantle | Bedrock, unsealed.",
  description: "A production-grade, Bedrock-like distributed LLM inference platform.",
};

import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Set theme class before paint to prevent flash */}
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('theme');document.documentElement.classList.toggle('dark',t!=='light')}catch(e){}` }} />
      </head>
      <body className="antialiased selection:bg-blue-500/30 min-h-screen flex flex-col relative overflow-x-hidden">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
