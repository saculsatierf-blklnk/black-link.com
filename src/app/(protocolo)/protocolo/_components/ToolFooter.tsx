"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useProject } from '../_context/ProjectContext';
import { gerarDossiePdf } from '../_utils/gerarDossie';

export default function ToolFooter() {
  const botaoRef = useRef<HTMLButtonElement>(null);
  const textoBotaoRef = useRef<HTMLSpanElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const projeto = useProject();
  const { contactNumber, instagram, ceoName, clinicName, expansionPillars } = projeto;

  useEffect(() => {
    const botao = botaoRef.current;
    const texto = textoBotaoRef.current;
    if (!botao || !texto) return;

    const moverBotao = (e: MouseEvent) => {
      const { left, top, width, height } = botao.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) * 0.3;
      const y = (e.clientY - top - height / 2) * 0.3;

      gsap.to(botao, { x, y, duration: 0.8, ease: "power3.out" });
      gsap.to(texto, { x: x * 0.4, y: y * 0.4, duration: 0.8, ease: "power3.out" });
    };

    const resetarBotao = () => {
      gsap.to(botao, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
      gsap.to(texto, { x: 0, y: 0, duration: 1, ease: "elastic.out(1, 0.3)" });
    };

    botao.addEventListener("mousemove", moverBotao);
    botao.addEventListener("mouseleave", resetarBotao);

    return () => {
      botao.removeEventListener("mousemove", moverBotao);
      botao.removeEventListener("mouseleave", resetarBotao);
    };
  }, []);

  const cleanInsta = instagram.replace(/[@/]/g, '').trim() || 'BLACKLINK.ELITE';
  const cleanNumber = contactNumber.replace(/\D/g, ''); 

  const linkInstagram = `https://instagram.com/${cleanInsta}`;
  const linkWhatsApp = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(`Olá, ${ceoName || 'Doutor(a)'}! Gostaria de reservar um horário exclusivo para uma avaliação.`)}`;
  
  const quantidadeModulos = (expansionPillars || []).length;
  const textoBotaoFinal = quantidadeModulos === 0 
    ? "LIBERAR APENAS PORTAL" 
    : `LIBERAR PORTAL + ${quantidadeModulos} EXPANS${quantidadeModulos > 1 ? 'ÕES' : 'ÃO'}`;

  const baixarEAtivar = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      // Usamos o Gerador Nativo jsPDF de Alta Fidelidade (Magazine Layout) 
      // para blindar contra bugs do Tailwind v4 (Oklab/Oklch crashers na DOM)
      const cloudUrl = await gerarDossiePdf(projeto);
      
      const nomeClinica = clinicName || 'clínica';
      const linkSeguro = cloudUrl ? cloudUrl : '[Link de Nuvem Indisponível - Documento Retido Localmente]';
      
      const mensagemBlackLink = `Olá, Lucas!
Finalizei a modelagem arquitetural para a ${nomeClinica.toUpperCase()}.

📄 *MEU DOSSIÊ BLACK LINK*
Acesse a base atual da nossa estratégia aqui:
${linkSeguro}

Gostaria de conversar melhor sobre o desenvolvimento dessa fundação e as potenciais melhorias dessa estrutura.`;
      const linkAtivacao = `https://wa.me/5511978291846?text=${encodeURIComponent(mensagemBlackLink)}`;

      // O Redirecionamento é acionado estritamente após a Promise resolver
      window.open(linkAtivacao, '_blank');
      
    } catch (error) {
      console.error("Falha no processo de ativação:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <footer className="relative z-10 flex w-full flex-col items-center justify-center border-t border-[var(--text-muted)]/20 bg-[var(--bg-surface)] px-4 py-16 text-[var(--text-main)] transition-colors duration-1000">

      <div className="relative flex w-[95%] mx-auto max-w-5xl flex-col items-center justify-center overflow-hidden border border-[var(--color-accent)]/30 bg-[var(--bg-base)]/50 p-6 md:p-20 rounded-xl md:rounded-3xl backdrop-blur-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] xl:shadow-[0_0_80px_rgba(0,0,0,0.5)]">
        {/* Glow Superior */}
        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-50"></div>
        <div className="absolute -top-32 w-full max-w-[250px] md:max-w-lg h-96 bg-[var(--color-accent)] blur-[80px] md:blur-[150px] rounded-full opacity-10 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center text-center w-full">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[var(--color-accent)] font-bold mb-4">Ação Final</span>
            <h2 className="font-serif text-3xl md:text-5xl uppercase text-[var(--text-main)] mb-6 drop-shadow-lg" style={{ fontFamily: 'var(--font-heading)' }}>
               Seu template encerra-se aqui.
            </h2>
            <p className="text-[11px] md:text-[13px] text-[var(--text-muted)] tracking-wider leading-relaxed max-w-xl mb-12 md:mb-16">
               Você degustou de uma amostra isolada da Engenharia Visual Black Link. Para reter todo esse valor gerado e receber propostas ativas para fundação da sua clínica, clique abaixo e solicite o seu caso (Dossiê).
            </p>

            {/* Painel de Status */}
            <div className="flex flex-col items-center gap-2 mb-10 md:mb-12 border border-[var(--text-muted)]/20 bg-[var(--bg-surface)]/80 backdrop-blur-md w-[90%] md:w-auto px-4 py-4 md:px-12 md:py-5 shadow-2xl rounded-sm">
              <div className="flex items-center gap-3 mb-1">
                 <div className="h-2 w-2 rounded-full bg-[var(--color-accent)] animate-pulse shadow-[0_0_10px_var(--color-accent)]"></div>
                 <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-[var(--color-accent)] font-bold">Pronto para Exportação</span>
              </div>
              <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-[var(--text-main)] opacity-70">1 Base Core + {quantidadeModulos} Expansões Selecionadas</span>
            </div>

            {/* Botão Magnético de Dossiê */}
            <button 
              onClick={baixarEAtivar}
              disabled={isProcessing}
              ref={botaoRef}
              className={`group relative flex w-[90%] md:w-auto items-center justify-center overflow-hidden border border-[var(--color-accent)] bg-[var(--color-accent)]/5 px-6 py-5 md:px-16 md:py-7 transition-all duration-700 ease-out active:scale-95 focus:outline-none ${isProcessing ? 'opacity-50 cursor-wait' : 'md:hover:shadow-[0_0_50px_-5px_var(--color-accent)] md:hover:bg-[var(--color-accent)]/15 md:hover:scale-105'}`}
            >
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[var(--color-accent)]/30 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
              
              <span ref={textoBotaoRef} className={`relative z-10 text-[11px] md:text-[13px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] transition-all duration-500 ${isProcessing ? 'text-[var(--text-muted)]' : 'text-[var(--text-main)] group-hover:text-white group-hover:drop-shadow-[0_0_10px_var(--color-accent)]'}`}>
                {isProcessing ? 'COMPILANDO DOSSIÊ...' : textoBotaoFinal}
              </span>
            </button>
        </div>

        {/* Rodapé Interno do Painel de Glass */}
        <div className="relative z-10 mt-16 md:mt-24 flex w-[90%] md:w-full flex-col md:flex-row justify-between items-center border-t border-[var(--text-muted)]/20 pt-8 gap-6 md:gap-8">
            <a 
              href={linkInstagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col gap-1 items-center md:items-start active:opacity-50"
            >
              <span className="text-[7px] md:text-[8px] uppercase tracking-[0.3em] text-[var(--text-muted)] transition-colors group-hover:text-[var(--text-main)]">Instagram Global</span>
              <span className="font-serif text-[15px] md:text-lg uppercase tracking-[0.2em] text-[var(--text-main)] transition-colors group-hover:text-[var(--color-accent)]">@{cleanInsta}</span>
            </a>

            <a 
              href={cleanNumber ? linkWhatsApp : '#'}
              target={cleanNumber ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-[var(--text-muted)] transition-all active:scale-95 active:text-[var(--color-accent)] md:hover:text-[var(--color-accent)]"
            >
              Agendar Reunião Privada
            </a>
        </div>
      </div>
      
      <span className="mt-12 text-[9px] uppercase tracking-[0.4em] text-[var(--text-muted)] opacity-50">
          Black Link Ecosystem | Todos os direitos reservados
      </span>
    </footer>
  );
}
