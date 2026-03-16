"use client";

import { useRef } from "react";
import { TextReveal } from "@/components/ui/text-reveal";

export function Manifesto() {
  const containerRef = useRef<HTMLElement>(null);



  return (
    <section ref={containerRef} className="relative min-h-[80vh] w-full flex flex-col items-center justify-center px-6 py-32 md:px-24 bg-black/90">


      {/* O MANIFESTO BLACK LINK (TRADUZIDO) */}
      <div className="w-full max-w-5xl relative z-10">
        <TextReveal className="text-2xl md:text-4xl lg:text-5xl font-light text-white tracking-normal leading-relaxed">
          Neste exato segundo, sua atenção está presa aqui. Isso é branding. Sua marca retém atenção ou apenas gasta dinheiro?
        </TextReveal>
      </div>

      {/* DETALHE LATERAL */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-3">
        <div className="status-dot h-1 w-1 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
        <div className="status-dot h-1 w-1 rounded-full bg-white/50" />
        <div className="status-dot h-1 w-1 rounded-full bg-white/50" />
        <div className="status-dot h-1 w-1 rounded-full bg-white/50" />
        <div className="status-dot h-1 w-1 rounded-full bg-white/50" />
      </div>

      <div className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-50"></div>
    </section>
  );
}