import type { Metadata } from "next";
// 1. FONTES PH7 (Substituindo Geist)
import { Cinzel, Manrope, Geist_Mono } from "next/font/google"; 
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import GlobalCanvas from "@/components/providers/canvas/scene";
import { Navbar } from "@/components/ui/navbar";
import { Preloader } from "@/components/ui/preloader";
import { GrainOverlay } from "@/components/ui/grain-overlay";
// 2. IMPORTANTE: Caminho correto para seu CSS (ajuste se necessário)
import "./global.css"; 

// --- CONFIGURAÇÃO DE TIPOGRAFIA ---

// SERIF: Cinzel (Para Títulos / Impacto / "Soberania")
const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"], 
  variable: "--font-cinzel",
  display: "swap",
});

// SANS: Manrope (Para Textos / UI / Leitura Técnica)
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "700"], 
  variable: "--font-manrope",
  display: "swap",
});

// MONO: Mantido para pequenos detalhes técnicos se precisar
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
        // 3. INJEÇÃO DE VARIÁVEIS E CLASSES GLOBAIS
        // font-sans: define Manrope como padrão
        // text-platinum: define a cor padrão do texto
        // bg-void: define o fundo preto PH7
        className={`${manrope.variable} ${cinzel.variable} ${geistMono.variable} font-sans antialiased bg-void text-platinum selection:bg-gold-dust selection:text-void overflow-x-hidden`}
      >
        <Preloader />
        <GrainOverlay />
        <GlobalCanvas />
        
        <SmoothScroll>
          <Navbar />
          <main className="relative z-10 w-full min-h-screen flex flex-col">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}