"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSovereign } from "@/components/providers/sovereign-provider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Pillar = {
  id: string;
  title: string;
  headline: string;
  image: string;
  whatsappMsg: string;
  caseName: string;
  caseLink: string;
};

const pillars: Pillar[] = [
  {
    id: "01",
    title: "BRANDING & DESIGN",
    headline: "Sua Identidade como Ativo de Valor.",
    image: "/assets/works/branding.webp",
    whatsappMsg: "Olá, tenho interesse em Branding.",
    caseName: "Case: Diinc Incorporadora",
    caseLink: "https://www.instagram.com/diinc_sp"
  },
  {
    id: "02",
    title: "TRÁFEGO & PERFORMANCE",
    headline: "Sua Escala sob Controle Matemático.",
    image: "/assets/works/trafego.webp",
    whatsappMsg: "Olá, gostaria de falar sobre Gestão de Tráfego.",
    caseName: "Case: Gofer Metais",
    caseLink: "https://www.instagram.com/gofer_metais"
  },
  {
    id: "03",
    title: "DESENVOLVIMENTO WEB",
    headline: "Sua Operação Livre de Ruído Técnico.",
    image: "/assets/works/software.webp",
    whatsappMsg: "Olá, preciso desenvolver um Software.",
    caseName: "Case: David HBS",
    caseLink: "https://davidhbsviagens.com/"
  }
];

export function SelectedWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setConsoleData, isPreloaderDone } = useSovereign();

  const resetConsole = () => {
    if (isPreloaderDone) {
      setConsoleData({
        title: "",
        description: "Estes são os resultados de quem confiou na nossa execução."
      });
    }
  };

  useEffect(() => {
    if (!isPreloaderDone) return;
    const ctx = gsap.context(() => {
      // General Section Trigger
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: resetConsole,
        onEnterBack: resetConsole,
      });

      // Mobile Specific ScrollTriggers (On Desktop we use hover)
      const isMobile = window.innerWidth <= 768;
      if (isMobile) {
        pillars.forEach((pillar, index) => {
          ScrollTrigger.create({
            trigger: `#pillar-grid-${index}`,
            start: "top 50%",
            end: "bottom 50%",
            onEnter: () => setConsoleData({
              title: "",
              description: pillar.headline,
              link: `https://wa.me/5511978291846?text=${encodeURIComponent(pillar.whatsappMsg)}`
            }),
            onEnterBack: () => setConsoleData({
              title: "",
              description: pillar.headline,
              link: `https://wa.me/5511978291846?text=${encodeURIComponent(pillar.whatsappMsg)}`
            })
          });
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, [setConsoleData, isPreloaderDone]);

  return (
    <section ref={containerRef} className="relative w-full bg-[#000] z-10 flex flex-col items-center pb-32">
      
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {pillars.map((pillar, index) => (
            <div 
              id={`pillar-grid-${index}`} 
              key={pillar.id} 
              className="relative w-full h-[60vh] md:h-[65vh] rounded-[2rem] overflow-hidden shadow-2xl group border border-white/5 bg-[#0a0a0a]"
              onMouseEnter={() => window.innerWidth > 768 && isPreloaderDone && setConsoleData({
                title: "",
                description: pillar.headline,
                link: `https://wa.me/5511978291846?text=${encodeURIComponent(pillar.whatsappMsg)}`
              })}
              onMouseLeave={() => window.innerWidth > 768 && isPreloaderDone && resetConsole()}
            >
              <Image
                src={pillar.image}
                alt={pillar.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover opacity-60 md:grayscale md:group-hover:grayscale-0 transition-all duration-[1.5s] ease-out will-change-transform transform-gpu md:group-hover:scale-105 pointer-events-none"
                priority={index === 0}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#000]/90 via-[#000]/10 to-transparent pointer-events-none mix-blend-multiply" />
              
              <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center justify-end p-8 transition-all duration-300 h-1/2">
                <h2 
                  className="font-serif text-white pointer-events-none mb-3 text-center tabular-nums text-balance w-full"
                  style={{
                    fontSize: "clamp(1.2rem, 3.5vw, 2rem)",
                    lineHeight: "1.1",
                    letterSpacing: "-0.04em",
                    fontVariantNumeric: "tabular-nums"
                  }}
                >
                  {pillar.title}
                </h2>
                
                <div className="flex flex-col gap-2 items-center">
                  <a 
                    href={pillar.caseLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="font-sans text-[11px] font-bold tracking-widest text-[#E0E0E0] hover:text-white transition-colors pointer-events-auto flex items-center gap-2"
                  >
                    → {pillar.caseName}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}