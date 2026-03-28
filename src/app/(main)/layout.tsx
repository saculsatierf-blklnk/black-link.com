import type { Metadata } from "next";
import { Cinzel, Manrope, Geist_Mono } from "next/font/google"; 
import LayoutClient from "@/components/ui/layout-client";


// 2. INJEÇÃO DO PROVEDOR DE ESTADO
import { EngineProvider } from "@/components/providers/engine-provider";
import { SovereignProvider } from "@/components/providers/sovereign-provider";
import { SovereignPreloader } from "@/components/ui/sovereign-preloader";
import { NarrativeConsole } from "@/components/ui/narrative-console";
import { Suspense } from "react";

import "../global.css"; 

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
  metadataBase: new URL("https://blklnk.com"),
  title: {
    template: "%s | BLACK LINK",
    default: "BLACK LINK | Engenharia da Ausência",
  },
  description: "Criamos a infraestrutura que sua autoridade merece, elevando sua presença digital e maximizando os seus resultados.",
  keywords: ["Web Design", "GSAP", "React Three Fiber", "Performance", "Noir", "Black Link", "Ecossistema Digital"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: { 
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" }
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" }
    ],
  },
  openGraph: {
    title: "BLACK LINK | Engenharia da Ausência",
    description: "Criamos a infraestrutura que sua autoridade merece, elevando sua presença digital e maximizando os seus resultados.",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BLACK LINK",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BLACK LINK | Engenharia da Ausência",
    description: "Arquitetura restrita. Estabilizamos sua presença digital.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${cinzel.variable} ${geistMono.variable} font-sans antialiased bg-[#030303] text-platinum selection:bg-gold-dust selection:text-void overflow-x-hidden`}
        suppressHydrationWarning
      >
        {/* 3. ENVELOPAMENTO DA ÁRVORE DE RENDERIZAÇÃO */}
        <SovereignProvider>
          <Suspense fallback={null}>
            <SovereignPreloader />
          </Suspense>
          <NarrativeConsole />
          <EngineProvider>
            <LayoutClient>
                {children}
            </LayoutClient>
          </EngineProvider>
        </SovereignProvider>
      </body>
    </html>
  );
}