"use client";

import { useEffect, useRef } from "react";
import { TextReveal } from "@/components/ui/text-reveal";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSovereign } from "@/components/providers/sovereign-provider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Manifesto() {
  const containerRef = useRef<HTMLElement>(null);
  const { setConsoleData, isPreloaderDone } = useSovereign();

  useEffect(() => {
    if (!isPreloaderDone) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "center center",
        end: "bottom 40%",
        onEnter: () => setConsoleData({ title: "", description: "Tecnologia não deve ser um peso. Construímos a infraestrutura que sustenta a sua autoridade." }),
        onEnterBack: () => setConsoleData({ title: "", description: "Tecnologia não deve ser um peso. Construímos a infraestrutura que sustenta a sua autoridade." }),
      });
    }, containerRef);
    return () => ctx.revert();
  }, [setConsoleData, isPreloaderDone]);



  return (
    <section ref={containerRef} className="relative min-h-[80vh] w-full flex flex-col items-center justify-center px-6 py-32 md:px-24 bg-black">

      {/* O MANIFESTO BLACK LINK (HUMANIZADO) */}
      <div className="w-full max-w-5xl relative z-10 flex flex-col items-center gap-8">
        <TextReveal className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-normal leading-[1.3] text-center drop-shadow-2xl">
          Olá. Nós somos a engenharia por trás das marcas que não aceitam o comum.
        </TextReveal>
        <p className="font-sans text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-3xl text-center mt-4">
          Simplificamos sua tecnologia e elevamos sua estética para que você foque apenas no que faz de melhor. Descubra como podemos transformar sua presença digital.
        </p>
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