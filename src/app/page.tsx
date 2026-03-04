"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// --- COMPONENTES DO ECOSSISTEMA ---
import { Manifesto } from "@/components/sections/manifesto";
import { SelectedWorks } from "@/components/sections/selected-works";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // roda apenas em telas maiores para preservar 60fps mobile
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      // Timeline de Inicialização do Sistema
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 1. Título: Sobe com Blur (Efeito Glass)
      tl.fromTo(titleRef.current,
        { y: 150, opacity: 0, filter: "blur(20px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.8 }
      );

      // 2. Pilares: Revelação lateral técnica
      tl.fromTo(pillarsRef.current,
        { opacity: 0, letterSpacing: "1.5em", scale: 0.9 },
        { opacity: 1, letterSpacing: "0.2em", scale: 1, duration: 1.5 },
        "-=1.2"
      );

      // 3. Scroll Indicator: Fade simples
      tl.fromTo(scrollRef.current,
        { opacity: 0, y: -20 },
        { opacity: 0.5, y: 0, duration: 1, repeat: -1, yoyo: true, ease: "sine.inOut" },
        "-=0.5"
      );

      return () => tl.kill();
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full overflow-hidden max-w-[1440px] mx-auto">

      {/* --- SEÇÃO 1: HERO / FLAGSHIP --- */}
      <section className="relative flex flex-col items-center justify-center h-screen w-full z-10 px-[clamp(1rem,5vw,6rem)]">

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