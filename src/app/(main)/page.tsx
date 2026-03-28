"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSovereign } from "@/components/providers/sovereign-provider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- COMPONENTES DO ECOSSISTEMA ---
import dynamic from "next/dynamic";

const SkeletonLoader = () => (
  <div className="w-full h-[60vh] md:h-[80vh] bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 animate-pulse my-12 md:my-24"></div>
);

const Manifesto = dynamic(() => import("@/components/sections/manifesto").then(m => m.Manifesto), { 
  ssr: false,
  loading: () => <SkeletonLoader />
});

const SelectedWorks = dynamic(() => import("@/components/sections/selected-works").then(m => m.SelectedWorks), { 
  ssr: false,
  loading: () => <SkeletonLoader />
});

const Footer = dynamic(() => import("@/components/sections/footer").then(m => m.Footer), { 
  ssr: false,
  loading: () => <SkeletonLoader />
});

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const { setConsoleData, isPreloaderDone } = useSovereign();

  useEffect(() => {
    if (!isPreloaderDone) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom 50%",
        onEnter: () => setConsoleData({ title: "", description: "Simplificamos sua tecnologia para você focar apenas no que faz de melhor." }),
        onEnterBack: () => setConsoleData({ title: "", description: "Simplificamos sua tecnologia para você focar apenas no que faz de melhor." }),
      });
    }, heroRef);
    return () => ctx.revert();
  }, [setConsoleData, isPreloaderDone]);

  return (
    <div ref={containerRef} className="w-full overflow-hidden max-w-[1440px] mx-auto">

      {/* --- SEÇÃO 1: HERO / FLAGSHIP --- */}
      <section ref={heroRef} className="relative flex flex-col items-center justify-center h-screen w-full z-10 px-[clamp(1rem,5vw,6rem)]">

        {/* Camada de Conteúdo Principal */}
        <div className="relative z-20 text-center mix-blend-difference flex flex-col items-center">

          {/* TÍTULO MASSIVO */}
          <h1
            ref={titleRef}
            className="relative z-20 mb-12 md:mb-16 text-[clamp(4rem,10vw,12rem)] font-serif font-bold leading-[0.9] tracking-tighter text-lux select-none uppercase"
          >
            BLACK LINK
          </h1>

          {/* SUBTÍTULO TÉCNICO (PILARES) */}
          <div
            ref={pillarsRef}
            className="relative z-20 mt-4 flex flex-row flex-wrap gap-4 items-center justify-center text-[10px] tracking-[0.3em]"
          >
            <span className="font-mono text-lux uppercase">Design</span>
            <span className="w-1 h-1 bg-lux rounded-full opacity-50"></span>
            <span className="font-mono text-lux uppercase">Software</span>
            <span className="w-1 h-1 bg-lux rounded-full opacity-50"></span>
            <span className="font-mono text-lux uppercase">Estratégia</span>
          </div>

        </div>

        {/* INDICADOR DE SCROLL */}
        <div
          ref={scrollRef}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 mix-blend-difference opacity-50 transition-opacity duration-500"
        >
          <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-lux opacity-50">
            Role com elegância
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-lux to-transparent"></div>
        </div>

      </section>

      {/* --- SEÇÃO 2: MANIFESTO (A Filosofia) --- */}
      <Manifesto />

      {/* --- SEÇÃO 3: SELECTED WORKS (O Portfólio) --- */}
      <SelectedWorks />

      {/* --- SEÇÃO 4: FOOTER (Contato/Links) --- */}
      <Footer />

    </div>
  );
}