"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { TorusLogo } from "@/components/providers/canvas/torus-logo";

export function Preloader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const [complete, setComplete] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. O Logo + Texto entram
    tl.to(logoWrapperRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "power3.out",
    })
    
    // 2. Tempo de espera
    .to({}, { duration: 1.5 }) 

    // 3. O Logo + Texto sobem rápido
    .to(logoWrapperRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.6,
      ease: "power2.in",
    })

    // 4. A Cortina sobe
    .to(containerRef.current, {
      yPercent: -100,
      duration: 1.2,
      ease: "power4.inOut",
      onComplete: () => {
        setComplete(true);
        window.dispatchEvent(new Event("preloader-complete"));
      },
    }, "-=0.2");

  }, { scope: containerRef });

  if (complete) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Wrapper que segura o Logo E o Texto para animarem juntos */}
      <div 
        ref={logoWrapperRef}
        className="flex flex-col items-center justify-center opacity-0 scale-90 will-change-transform"
      >
        {/* 3D Canvas */}
        <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]">
          <TorusLogo />
        </div>

        {/* TEXTO BLACK LINK (Logo abaixo) */}
        <h1 className="text-white text-3xl md:text-5xl font-bold tracking-tighter mt-[-20px] md:mt-[-40px] z-10 mix-blend-difference">
          BLACK LINK
        </h1>
      </div>

      {/* Texto Minimalista Rodapé */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/30 font-mono text-[10px] uppercase tracking-[0.3em] animate-pulse">
        Carregando Sistema
      </div>
    </div>
  );
}