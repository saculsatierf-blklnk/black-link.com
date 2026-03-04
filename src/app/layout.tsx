import type { Metadata } from "next";
import { Cinzel, Manrope, Geist_Mono } from "next/font/google"; 
import LayoutClient from "@/components/ui/layout-client";

// 1. CORREÇÃO DA IMPORTAÇÃO (Sem chaves)
import Preloader from "@/components/ui/preloader";
import { GrainOverlay } from "@/components/ui/grain-overlay";

// 2. INJEÇÃO DO PROVEDOR DE ESTADO
import { EngineProvider } from "@/components/providers/engine-provider";

import "./global.css"; 

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"], 
  variable: "--font-cinzel",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "700"], 
  variable: "--font-manrope",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | BLACK LINK",
    default: "BLACK LINK | Elite Digital Ecosystem",
  },
  description: "Ecosystem for high-end web design (R3F/GSAP), automation intelligence, and sovereign performance marketing.",
  keywords: ["Web Design", "GSAP", "React Three Fiber", "Automation", "Performance Marketing", "Black Link"],
  authors: [{ name: "Lucas", url: "https://blacklink.agency" }],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "BLACK LINK | Elite Digital Ecosystem",
    description: "Interfaces de luxo, inteligência artificial e performance soberana.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="lenis">
      <body
        className={`${manrope.variable} ${cinzel.variable} ${geistMono.variable} font-sans antialiased bg-void text-platinum selection:bg-gold-dust selection:text-void overflow-x-hidden`}
      >
        {/* 3. ENVELOPAMENTO DA ÁRVORE DE RENDERIZAÇÃO */}
        <EngineProvider>
          <LayoutClient>
              {children}
          </LayoutClient>
        </EngineProvider>
      </body>
    </html>
  );
}