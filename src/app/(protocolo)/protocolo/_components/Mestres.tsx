"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useProject } from '../_context/ProjectContext';

gsap.registerPlugin(ScrollTrigger);

export default function Mestres() {
  const secaoRef = useRef<HTMLElement>(null);
  const imagemRef = useRef<HTMLDivElement>(null);
  
  // Conexão com o Inventário de Autoridade
  const { ceoName } = useProject();
  const nomeExibicao = ceoName || "A Autoridade";

  useEffect(() => {
    const contexto = gsap.context(() => {
      // 1. Zoom constante e imperceptível (respiração da imagem)
      if (imagemRef.current) {
        gsap.to(imagemRef.current, {
          scale: 1.1,
          duration: 30,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      // 2. Revelação lateral simulando o virar de uma página
      const textos = gsap.utils.toArray<HTMLElement>('.texto-mestre');
      
      textos.forEach((elemento) => {
        gsap.fromTo(elemento, 
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: elemento,
              start: "top 85%", // Dispara quando o topo do texto atinge 85% da tela
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, secaoRef);

    return () => contexto.revert();
  }, []);

  return (
    <section ref={secaoRef} className="relative flex flex-col items-center justify-center bg-[var(--bg-base)] transition-colors duration-1000 min-h-screen md:flex-row">
      
      {/* Lado Esquerdo: Imagem Full Mobile / Metade Desktop */}
      <div className="absolute inset-0 z-0 h-full w-full overflow-hidden md:relative md:sticky md:top-0 md:h-screen md:w-1/2">
        <div 
          ref={imagemRef}
          className="absolute inset-0 z-10 h-full w-full bg-cover bg-center md:bg-top grayscale contrast-125 transition-all duration-[1500ms] hover:grayscale-[0.3]"
          style={{ backgroundImage: "url('/assets/servicos/doctor.jpg')" }}
        />
        {/* Camada Escura Mobile */}
        <div className="absolute inset-0 z-20 bg-black/50 md:bg-transparent" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[var(--bg-base)] via-[var(--bg-base)]/40 to-transparent md:bg-gradient-to-r md:from-[var(--bg-base)] transition-colors duration-1000 opacity-90" />
      </div>

      {/* Lado Direito: Popup Flutuante Glass no Mobile */}
      <div className="relative z-30 flex w-full flex-col items-center p-4 md:w-1/2 md:p-8 lg:px-24">
        
        {/* O Container de Vidro */}
        <div className="w-full max-w-[340px] flex flex-col items-center text-center mx-auto border border-[var(--color-accent)]/30 bg-[var(--bg-surface)]/40 p-8 py-12 md:py-0 md:border-none md:bg-transparent backdrop-blur-[20px] md:backdrop-blur-none rounded-3xl md:rounded-none shadow-[0_20px_60px_rgba(0,0,0,0.8)] md:shadow-none md:max-w-xl md:items-start md:text-left">
          
          <span className="texto-mestre mb-3 md:mb-6 block text-[10px] md:text-xs uppercase tracking-[0.4em] text-[var(--color-accent)] font-bold">
            A Autoridade
          </span>
          
          <h2 className="texto-mestre mb-1 md:mb-2 font-serif text-4xl md:text-5xl lg:text-7xl font-light uppercase text-[var(--text-main)] drop-shadow-md">
            {nomeExibicao}
          </h2>
          
          <h3 className="texto-mestre mb-6 md:mb-12 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-muted)] lg:text-[var(--color-accent)]">
            DIREÇÃO CLÍNICA & FUNDADOR(A)
          </h3>
          
          <div className="texto-mestre mb-6 md:mb-16 h-[1px] w-12 mx-auto bg-[var(--color-accent)] opacity-50" />
          
          <div className="texto-mestre space-y-5 md:space-y-8 text-xs md:text-lg font-light leading-relaxed text-[var(--text-main)] md:text-[var(--text-muted)] drop-shadow-md md:drop-shadow-none text-center">
            <p>
              "Aqui, {nomeExibicao}, é onde sua história encontra a tecnologia. Este espaço foi reservado para narrar sua trajetória e os pilares que sustentam sua marca."
            </p>
            <p>
              "Uma seção 'Sobre' de elite não é biográfica; é o seu maior ativo de conversão."
            </p>
          </div>

        </div>
      </div>
      
    </section>
  );
}
