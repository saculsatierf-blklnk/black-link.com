import type { Metadata } from "next";
import { Cinzel, Manrope, Geist_Mono } from "next/font/google"; 
import LayoutClient from "@/components/ui/layout-client";


// 2. INJEÇÃO DO PROVEDOR DE ESTADO
import { EngineProvider } from "@/components/providers/engine-provider";

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
  title: {
    template: "%s | BLACK LINK",
    default: "BLACK LINK | Ecossistema Digital - Portfólio de Elite",
  },
  description: "Arquitetura de performance extrema e design Noir. Criamos ecossistemas digitais de elite com fluidez absoluta, estética imersiva e tecnologia de vanguarda.",
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
    title: "BLACK LINK | Ecossistema Digital - Portfólio de Elite",
    description: "Arquitetura de performance extrema e design Noir. Criamos ecossistemas digitais de elite com fluidez absoluta, estética imersiva e tecnologia de vanguarda.",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BLACK LINK - Portfólio de Elite",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BLACK LINK | Ecossistema Digital - Portfólio de Elite",
    description: "Arquitetura de performance extrema e design Noir.",
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