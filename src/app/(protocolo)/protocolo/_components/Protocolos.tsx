"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useProject } from '../_context/ProjectContext';

gsap.registerPlugin(ScrollTrigger);

// Sincronização Estrita de Ativos (.jpg) e Nomenclatura
const baseProtocolos: Record<string, { foco: string, imagem: string, categoria: string }> = {
  // Estética Avançada
  "Harmonização Orofacial": { foco: "Escultura de Ângulos", imagem: "/assets/servicos/harmonizacao.jpg", categoria: "Estética Facial" },
  "Bioestimuladores": { foco: "Protocolos de Firmeza", imagem: "/assets/servicos/bioestimuladores.jpg", categoria: "Estética Facial" },
  "Ultraformer III": { foco: "Lifting sem Cortes", imagem: "/assets/servicos/ultraformer.jpg", categoria: "Estética Facial" },
  "Glass Skin": { foco: "Textura de Porcelana", imagem: "/assets/servicos/glass-skin.jpg", categoria: "Estética Facial" },
  "Fios PDO": { foco: "Estímulo Biológico", imagem: "/assets/servicos/fios-pdo.jpg", categoria: "Estética Facial" },
  "Toxina Botulínica": { foco: "Suavização Natural", imagem: "/assets/servicos/toxina.jpg", categoria: "Estética Facial" },
  "Rinomodelação": { foco: "Reestruturação Nasal", imagem: "/assets/servicos/rinomodelacao.jpg", categoria: "Estética Facial" },
  "Transplante Capilar": { foco: "Redensificação Folicular", imagem: "/assets/servicos/transplante-capilar.jpg", categoria: "Especialidades" },
  
  // Odontologia de Elite e Tecnologia
  "Lentes de Porcelana": { foco: "Acabamento Mirror Effect", imagem: "/assets/servicos/lentes.jpg", categoria: "Odontologia" },
  "Implantes de Zircônia": { foco: "Tecnologia Metal-Free", imagem: "/assets/servicos/implantes.jpg", categoria: "Odontologia" },
  "Alinhadores Invisíveis": { foco: "Ortodontia Digital", imagem: "/assets/servicos/alinhadores.jpg", categoria: "Odontologia" }, 
  "Clareamento a Laser": { foco: "Fotobiomodulação", imagem: "/assets/servicos/clareamento.jpg", categoria: "Odontologia" }, 
  "Facetas em Resina": { foco: "Escultura Manual", imagem: "/assets/servicos/facetas-resina.jpg", categoria: "Odontologia" },
  "Diagnóstico Digital": { foco: "Mapeamento 3D", imagem: "/assets/servicos/diagnostico-tech.jpg", categoria: "Tecnologia" }
};

export default function Protocolos() {
  const secaoRef = useRef<HTMLElement>(null);
  
  const { selectedProtocols, clinicName, location, ceoName, contactNumber } = useProject();

  const protocolosSeguros = selectedProtocols || [];

  useEffect(() => {
    if (protocolosSeguros.length === 0) return;

    const contexto = gsap.context(() => {
      const cartoes = gsap.utils.toArray<HTMLElement>('.cartao-conversao');

      cartoes.forEach((cartao, index) => {
        gsap.fromTo(cartao, 
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: (index % 4) * 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cartao,
              start: "top 85%",
            }
          }
        );
      });
    }, secaoRef);

    return () => contexto.revert();
  }, [protocolosSeguros.length]);

  if (protocolosSeguros.length === 0) return null;

  return (
    <section ref={secaoRef} className="relative z-20 flex flex-col items-center w-full bg-[var(--bg-surface)] pt-16 pb-16 md:py-32 transition-colors duration-1000">
      
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-6">
        
        {/* Title Block Mapeamento de Serviços - Simetria Central */}
        <div className="mb-10 flex w-full flex-col items-center justify-center text-center gap-4 border-b border-[var(--text-muted)]/20 pb-10">
          <span className="text-[9px] uppercase tracking-[0.4em] text-[var(--color-accent)] font-bold">Mapeamento de Serviços</span>
          <h2 className="font-serif text-3xl uppercase leading-[1.0] text-[var(--text-main)] md:text-5xl lg:text-5xl drop-shadow-md">
            Arsenal de Elite:<br/>
            <span className="text-[var(--text-muted)]">{clinicName || 'Sua Clínica'}</span>
          </h2>
          <p className="hidden md:flex max-w-lg mt-4 text-[10px] text-[var(--text-muted)] tracking-wider leading-relaxed">
            * O design premium de portfólio eleva a percepção de valor dos serviços antes mesmo do seu preço ser revelado. É aqui que o desejo suplementa o valor.
          </p>
        </div>

        {/* Pop-up Guia de Arquitetura - Simetria Total */}
        <div className="relative z-40 mx-auto mb-10 w-full max-w-[340px] flex-col items-center text-center gap-3 p-5 rounded-2xl border border-[var(--color-accent)]/30 bg-[var(--bg-surface)]/50 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] md:max-w-md lg:absolute lg:top-[340px] lg:right-8 lg:left-auto lg:mx-0 lg:w-auto lg:p-8 lg:bg-[var(--bg-surface)]/30 lg:rounded-none lg:shadow-2xl xl:top-[300px] xl:right-24">
          <div className="flex items-center justify-center gap-2 mb-1">
             <div className="h-2 w-2 rounded-full bg-[var(--color-accent)] animate-pulse shadow-[0_0_10px_var(--color-accent)]"></div>
             <span className="text-[9px] uppercase tracking-[0.4em] text-[var(--text-main)] opacity-80">Como vender sem dar preço?</span>
          </div>
          <p className="text-[10px] md:text-[13px] text-[var(--text-muted)] tracking-wider leading-relaxed">
            Entregamos sua vitrine. Em vez de uma "tabela de preços" fria, cada tratamento é embalado como uma arquitetura exclusiva. Isso elimina objeções e fecha tickets Premium.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          
          {protocolosSeguros.map((nome, index) => {
            const conhecido = baseProtocolos[nome];
            const isCustom = !conhecido;
            
            const cleanNumber = contactNumber ? contactNumber.replace(/\D/g, '') : '';
            const mensagem = `Olá, ${ceoName || 'Doutor(a)'}! Vi o protocolo de ${nome} no portal e quero agendar uma avaliação.`;
            const linkWpp = cleanNumber 
              ? `https://wa.me/${cleanNumber}?text=${encodeURIComponent(mensagem)}` 
              : '#';

            // Rotas de segurança
            const imagemBg = conhecido ? conhecido.imagem : "/assets/servicos/hero.jpg";
            const foco = isCustom ? "Arquitetura Exclusiva" : conhecido.foco;
            const categoria = isCustom ? "Protocolo Especial" : conhecido.categoria;

            return (
              <a 
                key={`${nome}-${index}`}
                href={linkWpp}
                target={cleanNumber ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="cartao-conversao group relative flex w-full aspect-[3/4] cursor-pointer flex-col justify-end overflow-hidden border border-[var(--text-muted)]/30 bg-[var(--bg-base)] transition-all duration-700 hover:z-10 hover:border-[var(--color-accent)] hover:shadow-[0_0_40px_-10px_var(--color-accent)] scale-100 hover:scale-[1.02] transform-gpu"
              >
                
                <img
                  src={imagemBg}
                  alt={nome}
                  loading="lazy"
                  className="absolute inset-0 z-0 h-full w-full object-cover opacity-60 transition-transform duration-[2000ms] group-hover:scale-110 group-hover:opacity-100"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                
                {/* Granular Gradients for Depth */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[var(--bg-base)] via-[var(--bg-base)]/70 md:via-[var(--bg-base)]/60 to-transparent opacity-100 transition-opacity duration-500 group-hover:opacity-80" />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[var(--color-accent)]/20 to-transparent opacity-0 transition-opacity duration-700 md:group-hover:opacity-100 mix-blend-overlay" />
                
                <div className="relative z-20 m-4 flex flex-col items-center text-center border border-[var(--text-muted)]/10 bg-[var(--bg-surface)]/80 md:bg-[var(--bg-surface)]/40 p-6 backdrop-blur-xl transition-all duration-500 transform-gpu md:group-hover:-translate-y-2 group-hover:bg-[var(--bg-surface)]/90 group-hover:border-[var(--color-accent)]/80 shadow-[0_8px_32px_rgba(0,0,0,0.5)] active:scale-[0.98]">
                  
                  <div className="mb-4 flex w-full flex-col items-center justify-center border-b border-[var(--text-muted)]/10 pb-3 md:border-none md:pb-0 gap-2">
                    <span className="text-[8px] uppercase tracking-[0.4em] text-[var(--color-accent)] font-bold">
                      {categoria}
                    </span>
                    <span className="text-[9px] text-[var(--text-muted)] tracking-widest opacity-100 md:opacity-0 transition-opacity duration-300 md:group-hover:opacity-100 flex items-center justify-center gap-1">
                      CLIQUEM <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </span>
                  </div>
                  
                  <h3 className="mb-2 w-full font-serif text-2xl uppercase leading-[1.1] text-[var(--text-main)] drop-shadow-md text-center">
                    {nome}
                  </h3>

                  <span className={`w-full text-center text-[10px] uppercase tracking-[0.3em] font-bold text-[var(--text-muted)] md:group-hover:text-[var(--text-main)] transition-colors duration-500 mb-6 md:mb-8`}>
                    {String(index + 1).padStart(2, '0')} — {foco}
                  </span>

                  <div className="flex w-full items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-widest text-[var(--color-accent)] md:text-[var(--text-main)] opacity-100 md:opacity-50 transition-all duration-300 md:group-hover:text-[var(--color-accent)] md:group-hover:opacity-100">
                    <span>Atendimento Privado</span>
                  </div>
                  
                </div>
              </a>
            );
          })}

        </div>
      </div>
    </section>
  );
}
