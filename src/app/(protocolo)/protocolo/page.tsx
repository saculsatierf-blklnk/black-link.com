"use client";

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Oswald, Inter, Montserrat, Open_Sans } from "next/font/google";
import Protocolos from './_components/Protocolos';
import Mestres from './_components/Mestres';
import ToolFooter from './_components/ToolFooter';
import Ritual from './_components/Ritual';
import { ProjectProvider, useProject } from './_context/ProjectContext';
import './protocolo.css';

// Configurando Fontes de Elite via Google Fonts (Next.js Optimization)
const oswald = Oswald({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-oswald" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-montserrat" });
const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-opensans" });

function ToolContent() {
  const conteudoRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { clinicName, location, expansionPillars, toggleExpansion, isUnlocked, ceoName, typography, theme } = useProject();

  // AÇÃO DE EMERGÊNCIA: Supressão de Layout Global
  useEffect(() => {
    const globalBg = document.getElementById('global-canvas-container');
    if (globalBg) {
      globalBg.style.display = 'none';
      globalBg.style.visibility = 'hidden'; // Força bruta extra
    }
    
    // Restaurar ao sair
    return () => {
      if (globalBg) {
        globalBg.style.display = 'block';
        globalBg.style.visibility = 'visible';
      }
    };
  }, []);

  useEffect(() => {
    if (!isUnlocked) return;

    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
    
    // Reset Absoluto (Obrigatório)
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0; // Fallback hard reset

    if (!conteudoRef.current) return;

    gsap.fromTo(conteudoRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: 'power2.out' }
    );

    const letras = heroRef.current?.querySelectorAll('.letra');
    if (letras) {
      gsap.fromTo(letras,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.04, ease: 'power2.out', delay: 0.4 }
      );
    }
  }, [isUnlocked]);

  const fontVariables = `${oswald.variable} ${inter.variable} ${montserrat.variable} ${openSans.variable}`;

  if (!isUnlocked) return null;

  return (
      <div id="protocolo-view" className={`${fontVariables} w-full max-w-full overflow-x-hidden`} style={{ fontFamily: 'var(--font-body-tool)' }}>
        
        {/* Motor de Injeção em Tempo Real para Tipografia Isolada da Ferramenta */}
        <style dangerouslySetInnerHTML={{__html: `
          #protocolo-view h1, #protocolo-view h2, #protocolo-view h3, #protocolo-view .font-serif {
            font-family: var(--font-heading-tool) !important;
          }
          #protocolo-view button, #protocolo-view span, #protocolo-view p {
            font-family: var(--font-body-tool);
          }
        `}} />

      <div ref={conteudoRef} className="relative z-10 flex w-full flex-col opacity-0 transition-colors duration-1000">
        
        {/* Hero Dinâmico: A Porta de Entrada Otimizada para Neurodesign */}
        <main className="relative flex min-h-[100svh] w-full flex-col px-4 pt-20 pb-6 md:pt-32 md:pb-24 bg-[var(--bg-base)] overflow-hidden transition-colors duration-1000">
          
          <div ref={heroRef} className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-col items-center justify-center text-center my-auto">
            
            <h1 className="mb-3 md:mb-6 flex flex-wrap justify-center font-serif text-[clamp(2.5rem,8vw,7rem)] uppercase leading-[0.9]">
              {clinicName.split("").map((caractere, indice) => (
                <span key={indice} className="letra inline-block">
                  {caractere === " " ? "\u00A0" : caractere}
                </span>
              ))}
            </h1>

            <h2 className="mb-8 lg:mb-14 text-[9px] md:text-sm tracking-[0.3em] md:tracking-[0.4em] uppercase text-[var(--text-muted)] drop-shadow-md">
              A Nova Referência de {location}
            </h2>

            {/* Fake CTA para manter Imersão */}
            <div className="relative group w-full max-w-[340px] md:max-w-sm mx-auto">
              <div className="absolute -inset-1 bg-[var(--color-accent)] blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
              <button disabled className="relative w-full rounded-none border border-[var(--text-muted)]/50 bg-[var(--bg-surface)]/30 backdrop-blur-sm px-6 py-4 md:px-10 md:py-5 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--text-main)] transition-all duration-500 group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-accent)] active:scale-95">
                Agendar Primeira Consulta
              </button>
            </div>
            
          </div>

          {/* Pop-up Guia de Arquitetura (Simetria Frontal) */}
          <div className="relative z-40 mx-auto mt-auto flex w-full max-w-[340px] md:max-w-md flex-col items-center text-center gap-3 p-5 rounded-2xl border border-[var(--color-accent)]/30 bg-[var(--bg-surface)]/50 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] lg:absolute lg:bottom-12 lg:left-8 lg:right-auto lg:top-auto lg:mx-0 lg:w-auto lg:p-8 lg:bg-[var(--bg-surface)]/30 lg:rounded-none lg:shadow-2xl">
            <div className="flex items-center justify-center gap-2 mb-1">
               <div className="h-2 w-2 rounded-full bg-[var(--color-accent)] animate-pulse shadow-[0_0_10px_var(--color-accent)]"></div>
               <span className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-[var(--text-main)] opacity-80">Primeira Impressão</span>
            </div>
            <p className="text-[10px] md:text-[13px] text-[var(--text-muted)] tracking-wider leading-relaxed line-clamp-3 md:line-clamp-none">
              Sua percepção de valor é imposta imediatamente. Nos primeiros 3 segundos, o seu paciente não lê; ele sente e se rende à sua autoridade. A tipografia <strong className="text-[var(--text-main)]">{typography.toUpperCase()}</strong> e a cor <strong className="text-[var(--text-main)]">{theme}</strong> blindam seu posicionamento.
            </p>
          </div>

          {/* Marcador de Arquitetura no Rodapé */}
          <div className="absolute bottom-8 right-8 xl:bottom-12 xl:right-12 hidden lg:flex flex-col items-end gap-2 z-20 opacity-40">
             <div className="h-6 w-[1px] bg-[var(--color-accent)] mb-2"></div>
             <span className="text-[8px] uppercase tracking-[0.4em] text-[var(--text-main)]">Baseado em Conversoes Reais</span>
             <span className="text-[8px] uppercase tracking-[0.4em] text-[var(--text-muted)]">Black Link Core</span>
          </div>

        </main>

        <Protocolos />
        <Mestres />

        {/* A Narrativa de Escolha: Upsell Ativo com Retórica Médica */}
        <section className="relative z-20 flex w-full flex-col items-center bg-[var(--bg-base)] px-4 md:px-6 py-24 md:py-48 border-t border-[var(--text-muted)]/20 transition-colors duration-1000">
          
          {/* Overlap Didático dos Upsells */}
          <div className="absolute top-8 md:top-12 left-1/2 -translate-x-1/2 flex flex-col items-center text-center opacity-30 mt-8">
            <div className="w-[1px] h-12 md:h-16 bg-[var(--color-accent)] mb-4"></div>
            <span className="text-[7px] md:text-[8px] uppercase tracking-[0.5em] text-[var(--color-accent)] line-clamp-1 w-[80vw]">Sessão Estratégica: Escalonamento</span>
          </div>

          <div className="w-full max-w-6xl mt-16 md:mt-24">
            
            <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
              <h2 className="font-serif text-3xl uppercase leading-[1.1] md:leading-[0.9] md:text-5xl lg:text-6xl text-[var(--text-main)] mb-6 md:mb-10 drop-shadow-xl">
                SUA AUTORIDADE ESTÁ INTACTA.<br/>QUAL SERÁ SEU PRÓXIMO MOVIMENTO?
              </h2>
              <p className="max-w-3xl text-[11px] md:text-xs tracking-[0.2em] text-[var(--text-muted)] leading-[2] uppercase">
                A arquitetura principal que montamos acima já blinda sua excelência clínica. Mas para dominar {location || 'sua região'}, precisamos expandir sua máquina. Selecione abaixo os módulos que resolverão seus maiores gargalos de volume e conversão hoje. Isto gerará um Dossiê ultra personalizado para a nossa reunião.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                { id: 'Fluxo de Elite', nome: 'Fluxo de Pacientes Estabilizado', desc: 'Tráfego Pago & Captação Ativa', dor: 'Tenho a estrutura, mas sofro quando vejo cadeiras vazias sabendo da minha excelência clínica.' },
                { id: 'Identidade Absoluta', nome: 'O Peso da Sua Marca', desc: 'Branding & Design System Global', dor: 'Sinto que o meu serviço é superior, mas sei que uma construção estratégica elevaria o resultado.' },
                { id: 'Narrativa de Autoridade', nome: 'Autoridade Incontestável', desc: 'Gestão Cirúrgica do Instagram', dor: 'Preciso que você remova de mim o peso de traduzir a minha técnica complexa em conversão silenciosa.' }
              ].map((modulo) => {
                const ativo = expansionPillars.includes(modulo.id);
                return (
                  <button key={modulo.id} onClick={() => toggleExpansion(modulo.id)}
                    className={`group relative flex flex-col items-center justify-center overflow-hidden border border-[var(--text-muted)]/20 px-6 py-10 md:px-8 md:py-16 text-center transition-all duration-700 ease-out active:scale-95 md:active:scale-100 ${ativo ? 'bg-[var(--bg-surface)]/90 shadow-[0_0_50px_-10px_var(--color-accent)] md:scale-[1.03] transform-gpu' : 'bg-[var(--bg-surface)]/10 hover:bg-[var(--bg-surface)]/50 md:hover:shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)]'}`}>
                    
                    {/* Glow interno no card selecionado */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-[var(--color-accent)]/10 to-transparent transition-opacity duration-700 ${ativo ? 'opacity-100' : 'opacity-0'}`}></div>
                    
                    {/* Borda Acendendo Esculpida */}
                    <div className={`absolute inset-0 border border-[var(--color-accent)] transition-opacity duration-700 ${ativo ? 'opacity-50' : 'opacity-0 md:group-hover:opacity-20'}`}></div>

                    <div className={`absolute top-4 right-4 md:top-6 md:right-6 transition-all duration-500 scale-100 md:scale-125 ${ativo ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-45'}`}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_var(--color-accent)]">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>

                    <span className={`relative z-10 mb-3 text-[12px] md:text-[13px] uppercase tracking-widest font-bold transition-colors duration-500 text-center ${ativo ? 'text-[var(--color-accent)] drop-shadow-[0_0_10px_rgba(197,160,89,0.3)]' : 'text-[var(--text-main)] md:group-hover:text-white'}`}>{modulo.nome}</span>
                    <span className={`relative z-10 mb-8 md:mb-10 text-[9px] uppercase tracking-[0.3em] transition-colors duration-500 text-center ${ativo ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)]'}`}>{modulo.desc}</span>
                    
                    <div className={`relative z-10 p-5 mt-2 border-t-2 w-full max-w-[280px] mx-auto text-center transition-colors duration-500 ${ativo ? 'border-[var(--color-accent)] bg-[var(--bg-base)]/60' : 'border-[var(--text-muted)]/30 bg-transparent'}`}>
                      <p className={`text-[11px] italic tracking-wider transition-colors duration-500 leading-relaxed ${ativo ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)]'}`}>
                        "{modulo.dor}"
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <ToolFooter />
        
      </div>
    </div>
  );
}

export default function ProtocoloPage() {
  return (
    <ProjectProvider>
      <Ritual />
      <ToolContent />
    </ProjectProvider>
  );
}
