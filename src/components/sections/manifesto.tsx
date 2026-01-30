"use client";

import { useRef } from "react";
import { TextReveal } from "@/components/ui/text-reveal";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Manifesto() {
  const containerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    gsap.fromTo(".status-dot", 
      { opacity: 0.2, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.5, 
        stagger: { each: 0.1, repeat: -1, yoyo: true },
        ease: "power1.inOut"
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative min-h-[80vh] w-full flex flex-col items-center justify-center px-6 py-32 md:px-24 bg-black/50 backdrop-blur-sm">
      
      {/* TÍTULO TÉCNICO */}
      <div className="mb-20 w-full max-w-5xl border-t border-white/10 pt-6 flex justify-between items-center">
        <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-zinc-500">
          01. Núcleo do Sistema / Filosofia
        </span>
        <span className="hidden md:block font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-700">
          [ Somente Leitura ]
        </span>
      </div>

      {/* O MANIFESTO BLACK LINK (TRADUZIDO) */}
      <div className="w-full max-w-5xl relative z-10">
        <TextReveal className="text-2xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-[1.2]">
          Não construímos apenas sites. Arquitetamos ecossistemas soberanos. 
          Uma fusão de precisão onde a Estética de Alta Classe encontra a 
          Performance Agressiva e a Inteligência Automatizada. 
          Em um mundo de ruído digital, nós projetamos o sinal.
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