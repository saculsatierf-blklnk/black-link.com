"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link"; 

gsap.registerPlugin(ScrollTrigger);

// --- DADOS COM IMAGENS LOCAIS E PORTFÓLIO ATUALIZADO ---
const pillars = [
  {
    id: "01",
    slug: "branding-design",
    title: "Branding & Design Estratégico", 
    headline: "O ROSTO DO SEU IMPÉRIO.", 
    description: "Unimos Identidade Visual de elite a criativos de alto impacto e copywriting estratégico. Não apenas vestimos sua marca; ditamos o valor dela no mercado através de uma narrativa visual proprietária.",
    proofs: [
      { label: "David HBS Viagens", url: "https://davidhbsviagens.com/" },
      { label: "DIINC SP", url: "https://diinc.com.br/" },
      // NOVO LINK ADICIONADO AQUI
      { label: "Gofer Metais", url: "https://www.instagram.com/gofer_metais/" }
    ],
    image: "/assets/works/branding.jpg",
    whatsappMsg: "Olá, tenho interesse em Branding e Design de Autoridade."
  },
  {
    id: "02",
    slug: "trafego-performance",
    title: "Tráfego Pago & Performance", 
    headline: "MATEMÁTICA APLICADA AO LUCRO.", 
    description: "Gerenciamos campanhas de Google e Meta Ads com infraestrutura de dados e rastreamento avançado (Server-Side). Transformamos investimento em escala de faturamento previsível e auditável.",
    proofs: [
      { label: "Gofer Metais", url: "https://gofermetais.com.br/" }
    ],
    image: "/assets/works/trafego.jpg",
    whatsappMsg: "Olá, gostaria de falar sobre Gestão de Tráfego e Performance."
  },
  {
    id: "03",
    slug: "software-dev",
    title: "Desenvolvimento Web & Softwares", 
    headline: "A ENGENHARIA DA LIBERDADE.", 
    description: "Desenvolvemos ecossistemas web, aplicativos Android/iOS e automações de processo. Entregamos código escalável e arquitetura robusta para que sua operação rode 24/7 à prova de falhas.",
    proofs: [
      { label: "Gofer Metais", url: "https://gofermetais.com.br/" },
      { label: "David HBS Viagens", url: "https://davidhbsviagens.com/" }
    ],
    image: "/assets/works/software.jpg",
    whatsappMsg: "Olá, preciso desenvolver um Software, App ou Automação."
  }
];

export function SelectedWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const cards = cardsRef.current.filter(Boolean);
    
    // 1. SETUP ESTÁVEL
    gsap.set(cards, { 
      yPercent: (i) => i === 0 ? 0 : 100, 
      opacity: 1,
      scale: 1, 
      zIndex: (i) => i + 10 
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top", 
        end: "+=400%", 
        pin: true,
        pinSpacing: true,
        scrub: 1, 
        pinType: "transform",
        anticipatePin: 1,
      }
    });

    // 2. EMPILHAMENTO
    cards.forEach((card, i) => {
      if (i === 0) return; 

      tl.to(cards[i - 1], {
        scale: 0.98,
        duration: 1,
        ease: "none",
        force3D: true 
      }, ">")
      
      .to(card, {
        yPercent: 0,
        duration: 1,
        ease: "none",
        force3D: true
      }, "<");
    });

    ScrollTrigger.refresh();

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden z-50">
      
      {/* Header Fixo */}
      <div className="absolute top-0 left-0 w-full z-50 px-6 md:px-24 pt-8 md:pt-12 flex justify-between items-center pointer-events-none mix-blend-difference text-white">
        <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold opacity-70">
          02. Nossas Expertises
        </span>
        <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold opacity-70 hidden md:block">
          [ BLACK LINK // DIRECT ACCESS ]
        </span>
      </div>

      <div className="relative w-full h-full">
        {pillars.map((pillar, index) => (
          <div
            key={pillar.id}
            ref={(el) => { if (el) cardsRef.current[index] = el; }}
            className="absolute inset-0 w-full h-full flex items-center justify-center p-0 md:p-12 will-change-transform"
          >
            {/* CARD CONTAINER */}
            <div className="relative w-full h-full md:h-[90vh] bg-[#0a0a0a] border border-white/10 overflow-hidden shadow-2xl group">
              
              {/* CAMADA 1: IMAGEM BACKGROUND (FULL CARD) */}
              <div className="absolute inset-0 z-0 w-full h-full">
                <Image 
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  sizes="100vw"
                  className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 ease-out grayscale group-hover:grayscale-0"
                  priority={index === 0}
                />
                
                {/* GRADIENTE ESTRATÉGICO */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent opacity-100" />
              </div>

              {/* CAMADA 2: CONTEÚDO (TEXTO POR CIMA) */}
              <div className="relative z-10 w-full md:w-[65%] h-full p-8 md:p-16 flex flex-col justify-between">
                
                {/* Texto Superior */}
                <div>
                   <span className="font-sans text-xs text-zinc-400 uppercase tracking-widest mb-6 block border-l-2 border-white pl-4 font-bold">
                    {pillar.title}
                   </span>
                   <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-[0.9] drop-shadow-lg">
                    {pillar.headline}
                   </h2>
                   <p className="font-sans text-lg text-zinc-300 font-light leading-relaxed mb-8 max-w-xl drop-shadow-md">
                    {pillar.description}
                   </p>
                </div>

                {/* Footer do Card */}
                <div className="flex flex-col gap-6">
                   <div className="flex flex-col gap-3">
                      <span className="font-sans text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Cases & Projetos</span>
                      {pillar.proofs.map((proof, i) => (
                        <a key={i} href={proof.url} target="_blank" className="text-sm font-sans font-bold text-white hover:text-zinc-300 transition-colors flex items-center gap-2 w-fit">
                          → {proof.label}
                        </a>
                      ))}
                   </div>
                   
                   <div className="pt-8 border-t border-white/20 w-full md:w-max">
                      {/* BOTÃO DE WHATSAPP DIRETO */}
                      <a 
                        href={`https://wa.me/5511978291846?text=${encodeURIComponent(pillar.whatsappMsg)}`}
                        target="_blank"
                        className="inline-block px-8 py-4 bg-white text-black font-sans text-xs uppercase tracking-widest font-bold hover:bg-zinc-200 transition-all cursor-pointer shadow-lg hover:shadow-white/20"
                      >
                        Solicitar Orçamento →
                      </a>
                   </div>
                </div>

              </div>

              {/* Tag Fig. flutuante (Opcional) */}
              <div className="absolute bottom-6 right-6 font-sans text-[10px] font-bold text-white/50 border border-white/20 px-3 py-1 rounded-full backdrop-blur-md z-20">
                  Fig. {pillar.id}
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}