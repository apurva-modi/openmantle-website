import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://openmantle.dev"),
  title: {
    default: "OpenMantle — The inference layer cloud providers charge you to reach",
    template: "%s | OpenMantle",
  },
  description:
    "Open-source, cloud-neutral LLM inference platform. OpenAI Chat Completions API + Anthropic Messages API drop-in. Event-sourced routing, QoS scheduling, GPU fleet management — deploy to any Kubernetes cluster in one command.",
  keywords: [
    "LLM inference",
    "self-hosted LLM",
    "vLLM",
    "OpenAI API compatible",
    "Anthropic API compatible",
    "GPU inference",
    "open source",
    "Kubernetes",
    "Bedrock alternative",
    "OpenMantle",
  ],
  authors: [{ name: "OpenMantle", url: "https://github.com/apurva-modi/openmantle" }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://openmantle.dev",
  },
  openGraph: {
    type: "website",
    url: "https://openmantle.dev",
    siteName: "OpenMantle",
    title: "OpenMantle — The inference layer cloud providers charge you to reach",
    description:
      "Open-source LLM inference platform. Drop-in for OpenAI + Anthropic APIs. Deploy to any K8s cluster in one Helm command.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "OpenMantle — Open-source LLM inference platform",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenMantle — The inference layer cloud providers charge you to reach",
    description:
      "Open-source LLM inference platform. Drop-in for OpenAI + Anthropic APIs. Deploy to any K8s cluster in one Helm command.",
    images: ["/og-image.png"],
  },
};

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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
