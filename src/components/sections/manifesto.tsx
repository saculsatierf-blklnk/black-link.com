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
    // animação só para desktop; mobile não precisa do trigger
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px)", () => {
      const dotsAnim = gsap.fromTo(".status-dot",
        { opacity: 0.2, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: { each: 0.1, repeat: -1, yoyo: true },
          ease: "power1.inOut",
          paused: true
        }
      );

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => dotsAnim.play(),
        onLeave: () => dotsAnim.pause(),
        onEnterBack: () => dotsAnim.play(),
        onLeaveBack: () => dotsAnim.pause()
      });

      return () => {
        dotsAnim.kill();
        st.kill();
      };
    });

    return () => mm.revert();
  }, { scope: containerRef });

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