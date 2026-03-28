"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useProject } from '../_context/ProjectContext';

export default function Ritual() {
  const { 
    clinicName, setClinicName, 
    location, setLocation, 
    ceoName, setCeoName,
    instagram, setInstagram,
    contactNumber, setContactNumber,
    selectedProtocols, toggleProtocol, addCustomProtocol, 
    typography, setTypography,
    theme, setTheme,
    isUnlocked, unlockSite, resetExperience 
  } = useProject();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [etapa, setEtapa] = useState(1);
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erroSenha, setErroSenha] = useState(false);
  const [tentativaFalha, setTentativaFalha] = useState(false);
  const [erroCampos, setErroCampos] = useState(false);
  const [customInput, setCustomInput] = useState('');

  const protocolosSeguros = selectedProtocols || [];

  // Matriz de Seleção Expandida (Simetria Preservada)
  const listasOficiais = {
    estetica: [
      "Harmonização Orofacial", "Bioestimuladores", "Ultraformer III", 
      "Glass Skin", "Fios PDO", "Toxina Botulínica", "Rinomodelação", "Transplante Capilar"
    ],
    dental: [
      "Lentes de Porcelana", "Implantes de Zircônia", "Alinhadores Invisíveis", 
      "Clareamento a Laser", "Facetas em Resina", "Diagnóstico Digital"
    ]
  };

  useEffect(() => {
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  useEffect(() => {
    if (isUnlocked) { document.body.style.overflow = 'auto'; }
  }, [isUnlocked]);

  const validarSenha = () => {
    if (senha === 'clienteblk') {
      setErroSenha(false);
      setEtapa(2);
    } else {
      setErroSenha(true);
      setTentativaFalha(true);
      setTimeout(() => setErroSenha(false), 3000);
    }
  };

  const handleAddCustom = () => {
    addCustomProtocol(customInput);
    setCustomInput('');
  };

  const handleUnlock = () => {
    if (!clinicName.trim() || !location.trim()) {
      setErroCampos(true);
      setTimeout(() => setErroCampos(false), 2000);
      return;
    }

    document.body.style.overflow = 'auto';
    window.scrollTo(0, 0);

    if (!containerRef.current) {
      unlockSite();
      return;
    }
    
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 1.1,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        unlockSite();
      }
    });
  };

  const handleReset = () => {
    resetExperience();
    window.location.reload();
  };

  if (isUnlocked) return null;

  const linkWhatsApp = `https://wa.me/5511978291846?text=${encodeURIComponent('Olá, Lucas. Estou no portal da minha clínica mas ainda não tenho a minha chave de acesso.')}`;

  return (
    <div ref={containerRef} className="relative z-50 flex w-full min-h-screen flex-col bg-[var(--bg-base)] text-[var(--text-main)] overflow-visible pb-32 transition-colors duration-1000">
      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center justify-start gap-16 px-6 pt-32 pb-32">
        
        <h1 className="mt-12 text-center text-3xl uppercase leading-[0.9] md:text-5xl">
          ACESSO PRIVADO
        </h1>

        <div className="flex w-full max-w-4xl flex-col gap-10">
          
          {etapa === 1 ? (
            <div className="animate-in fade-in mx-auto flex w-full max-w-xl flex-col gap-6 duration-700">
              <div className="flex flex-col gap-2">
                <label className="mb-2 text-center text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  Lembra da senha que te mandei? É aqui que você insere ela.
                </label>
                
                <div className="relative w-full">
                  <input 
                    type={mostrarSenha ? "text" : "password"} 
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && validarSenha()}
                    className={`w-full rounded-none border bg-[var(--bg-surface)] p-5 text-center text-lg tracking-wide text-[var(--text-main)] transition-colors duration-300 focus:outline-none ${erroSenha ? 'border-red-900/50' : 'border-[var(--text-muted)]'}`}
                    placeholder="Sua chave"
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-widest text-[var(--text-muted)] transition-colors hover:text-[var(--text-main)] focus:outline-none"
                  >
                    {mostrarSenha ? '[ OCULTAR ]' : '[ MOSTRAR ]'}
                  </button>
                </div>

                <div className={`text-center text-xs tracking-widest text-red-900 transition-opacity duration-300 ${erroSenha ? 'opacity-100' : 'opacity-0'}`}>
                  Essa chave não abriu o acesso. Tenta de novo?
                </div>
              </div>

              <button 
                onClick={validarSenha}
                className="rounded-none border border-[var(--text-muted)] bg-transparent px-8 py-4 text-xs uppercase tracking-widest text-[var(--text-main)] transition-all duration-300 hover:border-[var(--text-main)] hover:bg-[var(--bg-surface)] focus:outline-none"
              >
                Avançar
              </button>

              <div className={`flex justify-center transition-opacity duration-700 ${tentativaFalha ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <a 
                  href={linkWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-[10px] uppercase tracking-widest text-[var(--text-muted)] underline decoration-[var(--text-muted)] underline-offset-4 transition-colors hover:text-[var(--text-main)]"
                >
                  Não tem uma senha? Solicite a sua aqui.
                </a>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in flex flex-col gap-12 duration-700">
              
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="flex flex-col gap-3">
                  <label className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">Como vamos identificar seu império?</label>
                  <input type="text" value={clinicName} onChange={(e) => setClinicName(e.target.value)}
                    className={`w-full rounded-none border bg-[var(--bg-surface)] p-5 text-lg tracking-wide text-[var(--text-main)] transition-colors focus:outline-none focus:border-[var(--color-accent)] ${erroCampos && !clinicName.trim() ? 'border-red-900/50' : 'border-[var(--text-muted)]'}`}
                    placeholder="Ex: Clínica Blanc" />
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">Onde você está fazendo história?</label>
                  <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}
                    className={`w-full rounded-none border bg-[var(--bg-surface)] p-5 text-lg tracking-wide text-[var(--text-main)] transition-colors focus:outline-none focus:border-[var(--color-accent)] ${erroCampos && !location.trim() ? 'border-red-900/50' : 'border-[var(--text-muted)]'}`}
                    placeholder="Ex: São Paulo" />
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">A Autoridade (Nome)</label>
                  <input type="text" value={ceoName} onChange={(e) => setCeoName(e.target.value)}
                    className="w-full rounded-none border bg-[var(--bg-surface)] p-5 text-lg tracking-wide text-[var(--text-main)] transition-colors focus:border-[var(--color-accent)] focus:outline-none border-[var(--text-muted)]"
                    placeholder="Ex: Dr. Valmont" />
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">Instagram Oficial</label>
                  <input type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)}
                    className="w-full rounded-none border bg-[var(--bg-surface)] p-5 text-lg tracking-wide text-[var(--text-main)] transition-colors focus:border-[var(--color-accent)] focus:outline-none border-[var(--text-muted)]"
                    placeholder="Ex: @clinica.blanc" />
                </div>

                <div className="flex flex-col gap-3 md:col-span-2">
                  <label className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">WhatsApp para Reservas</label>
                  <input type="text" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)}
                    className="w-full rounded-none border bg-[var(--bg-surface)] p-5 text-lg tracking-wide text-[var(--text-main)] transition-colors focus:border-[var(--color-accent)] focus:outline-none border-[var(--text-muted)]"
                    placeholder="Apenas números" />
                </div>
              </div>

              {/* Bloco de Configuração Visual de Elite */}
              <div className="flex flex-col gap-8 border-t border-[var(--text-muted)] pt-6">
                <label className="text-center text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  A Assinatura Visual do Império
                </label>
                
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="flex flex-col gap-4">
                    <h3 className="mb-2 text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)] transition-colors">Conjuntos de Poder (Identidade)</h3>
                    {[
                      { id: 'dominio', nome: '01. Domínio', desc: 'Extenda & Inter', psic: 'Vanguarda e Estabilidade.', cssHeading: '"Oswald", sans-serif', cssBody: '"Inter", sans-serif' },
                      { id: 'heranca', nome: '02. Herança', desc: 'Fortune Daily & Montserrat', psic: 'Tradição e Presença Institucional.', cssHeading: '"DM Serif Display", serif', cssBody: '"Montserrat", sans-serif' },
                      { id: 'precisao', nome: '03. Precisão', desc: 'Comparison & Open Sans', psic: 'Rigor Clínico Absoluto.', cssHeading: '"Playfair Display", serif', cssBody: '"Open Sans", sans-serif' },
                      { id: 'ruptura', nome: '04. Ruptura', desc: 'Brigends & Geist', psic: 'Minimalismo e Presença Digital Pura.', cssHeading: '"Bebas Neue", sans-serif', cssBody: '"Geist", sans-serif' },
                      { id: 'soberania', nome: '05. Soberania', desc: 'Cormorant Garamond & Lato', psic: 'Soberania e Visão de Resultado.', cssHeading: '"Cormorant Garamond", serif', cssBody: '"Lato", sans-serif' },
                      { id: 'vanguarda', nome: '06. Vanguarda', desc: 'Syne & Outfit', psic: 'Funcionalismo Estrutural.', cssHeading: '"Syne", sans-serif', cssBody: '"Outfit", sans-serif' }
                    ].map((font) => (
                      <button key={font.id} onClick={() => setTypography(font.id)}
                        className={`group flex flex-col items-start rounded-none border px-6 py-4 text-left transition-all duration-300 ${typography === font.id ? 'border-[var(--color-accent)] bg-[var(--bg-surface)] shadow-sm' : 'border-[var(--text-muted)] bg-transparent hover:border-[var(--text-main)]'}`}>
                        <span style={{ fontFamily: font.cssHeading }} className={`font-preview-heading text-xl tracking-wide ${typography === font.id ? 'text-[var(--color-accent)]' : 'text-[var(--text-main)]'}`}>{font.nome}</span>
                        <span style={{ fontFamily: font.cssBody }} className={`font-preview-body mt-1 text-xs tracking-wide ${typography === font.id ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)]'}`}>{font.desc}</span>
                        <span className={`mt-3 text-[9px] uppercase tracking-wider ${typography === font.id ? 'text-[var(--text-main)]' : 'text-[var(--text-muted)]'}`}>{font.psic}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col gap-4">
                    <h3 className="mb-2 text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)] transition-colors">Espectro de Cor</h3>
                    {[
                      { id: 'obsidian', nome: 'Obsidian Gold', hexBg: '#030303', hexAccent: '#C5A059' },
                      { id: 'chrome', nome: 'Chrome Silver', hexBg: '#0a0a0a', hexAccent: '#E2E8F0' },
                      { id: 'alabaster', nome: 'Alabaster Silk', hexBg: '#F9F7F2', hexAccent: '#8E6D45' },
                      { id: 'emerald', nome: 'Deep Emerald', hexBg: '#05120B', hexAccent: '#E2E2E2' },
                      { id: 'royal', nome: 'Royal Midnight', hexBg: '#0A0F1A', hexAccent: '#C0C0C0' },
                      { id: 'vantablack', nome: 'Vantablack', hexBg: '#000000', hexAccent: '#ffffff' }
                    ].map((t) => (
                      <button key={t.id} onClick={() => setTheme(t.id)}
                        className={`flex items-center justify-between rounded-none border px-6 py-4 text-left transition-all duration-300 ${theme === t.id ? 'border-[var(--color-accent)] bg-[var(--bg-surface)] shadow-sm' : 'border-[var(--text-muted)] bg-transparent hover:border-[var(--text-main)]'}`}>
                        <span className={`text-xs uppercase tracking-widest ${theme === t.id ? 'text-[var(--color-accent)]' : 'text-[var(--text-main)]'}`}>{t.nome}</span>
                        <div className="flex h-5 w-5 overflow-hidden rounded-full border border-[var(--text-muted)]">
                          <div className="h-full w-1/2" style={{ backgroundColor: t.hexBg }}></div>
                          <div className="h-full w-1/2" style={{ backgroundColor: t.hexAccent }}></div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bloco Expandido de Serviços */}
              <div className="flex flex-col gap-8 border-t border-[var(--text-muted)] pt-6">
                <label className="text-center text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
                  Selecione os pilares do seu império
                </label>
                
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div className="flex flex-col gap-4">
                    <h3 className="mb-2 text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)] transition-colors">Estética Avançada</h3>
                    {listasOficiais.estetica.map((protocolo) => {
                      const ativo = protocolosSeguros.includes(protocolo);
                      return (
                        <button key={protocolo} onClick={() => toggleProtocol(protocolo)}
                          className={`rounded-none border px-6 py-4 text-left text-xs uppercase tracking-widest transition-all duration-300 ${ativo ? 'border-[var(--color-accent)] bg-[var(--bg-surface)] text-[var(--color-accent)] shadow-sm' : 'border-[var(--text-muted)] bg-transparent text-[var(--text-main)] hover:border-[var(--text-main)]'}`}>
                          {protocolo}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex flex-col gap-4">
                    <h3 className="mb-2 text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)] transition-colors">Odontologia de Alta Complexidade</h3>
                    {listasOficiais.dental.map((protocolo) => {
                      const ativo = protocolosSeguros.includes(protocolo);
                      return (
                        <button key={protocolo} onClick={() => toggleProtocol(protocolo)}
                          className={`rounded-none border px-6 py-4 text-left text-xs uppercase tracking-widest transition-all duration-300 ${ativo ? 'border-[var(--color-accent)] bg-[var(--bg-surface)] text-[var(--color-accent)] shadow-sm' : 'border-[var(--text-muted)] bg-transparent text-[var(--text-main)] hover:border-[var(--text-main)]'}`}>
                          {protocolo}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mx-auto mt-4 flex w-full max-w-2xl border border-[var(--text-muted)] bg-transparent transition-colors focus-within:border-[var(--color-accent)]">
                  <input type="text" value={customInput} onChange={(e) => setCustomInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleAddCustom()}
                    className="w-full bg-transparent p-4 text-sm tracking-wide text-[var(--text-main)] focus:outline-none"
                    placeholder="Outro Protocolo de Intervenção..." />
                  <button onClick={handleAddCustom} className="px-6 text-xs uppercase tracking-widest text-[var(--text-muted)] transition-colors hover:text-[var(--color-accent)]">
                    INCLUIR
                  </button>
                </div>
              </div>

              <div className="flex justify-center pt-8">
                <button onClick={handleUnlock} className="rounded-none bg-[var(--text-main)] px-12 py-5 font-bold uppercase tracking-widest text-[var(--bg-base)] transition-all duration-300 hover:opacity-80 focus:outline-none">
                  GERAR ESTRUTURA
                </button>
              </div>
            </div>
          )}

        </div>

        <button onClick={handleReset} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest opacity-20 transition-opacity duration-500 hover:opacity-100 text-[var(--text-main)]">
          Reiniciar Configuração
        </button>

      </div>
    </div>
  );
}
