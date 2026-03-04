"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";

export function Footer() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const currentYear = new Date().getFullYear();

  // --- FÍSICA DO BOTÃO MAGNÉTICO (Restaurada) ---
  useEffect(() => {
    const button = buttonRef.current;
    const text = textRef.current;

    if (!button || !text) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Movimento do botão (mais pesado)
      gsap.to(button, { 
        x: x * 0.4, 
        y: y * 0.4, 
        scale: 1.1,
        duration: 0.5, 
        ease: "power3.out" 
      });
      
      // Movimento do texto (mais leve para dar profundidade)
      gsap.to(text, { 
        x: x * 0.2, 
        y: y * 0.2, 
        duration: 0.5, 
        ease: "power3.out" 
      });
    };

    const handleMouseLeave = () => {
      gsap.to([button, text], { 
        x: 0, 
        y: 0, 
        scale: 1, 
        duration: 0.8, 
        ease: "elastic.out(1, 0.4)" 
      });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <footer className="w-full bg-black pt-32 pb-12 px-6 md:px-24 border-t border-white/10 flex flex-col justify-between overflow-hidden">
      
      {/* 1. CHAMADA PRINCIPAL COM BOTÃO MAGNÉTICO */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-32 gap-12">
        
        {/* Copy de Autoridade */}
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white mb-6 leading-[1.1]">
            A excelência não<br/>espera pela sorte.
          </h2>
          <p className="text-xl text-zinc-400 font-light">
            Dê ao seu projeto uma base forte. Entre na sala, assuma o comando.
          </p>
        </div>

        {/* O RETORNO DA BOLA (Link para /contact) */}
        <div className="relative group">
           <Link href="/contact">
             <button 
               ref={buttonRef}
               className="relative h-40 w-40 md:h-48 md:w-48 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition-colors cursor-pointer"
             >
               <span ref={textRef} className="text-[18px] md:text-[24px] font-light font-serif uppercase tracking-widest text-center leading-tight whitespace-normal">
                 INICIAR PROJETO
               </span>
             </button>
           </Link>
        </div>

      </div>

      {/* 2. DADOS ESTRUTURAIS (100% PORTUGUÊS) */}
      <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        
        {/* Marca */}
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-bold tracking-tighter text-white">BLACK LINK</span>
          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
            © {currentYear} — Todos os direitos reservados.
          </span>
        </div>

        {/* Navegação Traduzida */}
        <div className="flex gap-12 md:gap-24">
           <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">Navegação</span>
              <Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">Início</Link>
              <Link href="/#work" className="text-sm text-zinc-400 hover:text-white transition-colors">Portfólio</Link>
              <Link href="/contact" className="text-sm text-zinc-400 hover:text-white transition-colors">Contato</Link>
           </div>

           <div className="flex flex-col gap-4">
              <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">Redes</span>
              <a 
                href="https://www.instagram.com/blacklink.com.br/" 
                target="_blank" 
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Instagram
              </a>
              <a 
                href="https://wa.me/5511978291846" 
                target="_blank" 
                className="text-sm text-zinc-400 hover:text-white transition-colors"
              >
                WhatsApp
              </a>
           </div>
        </div>

      </div>
    </footer>
  );
}