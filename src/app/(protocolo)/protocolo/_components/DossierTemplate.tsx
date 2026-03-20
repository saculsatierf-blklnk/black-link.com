"use client";

import { forwardRef } from 'react';
import { useProject } from '../_context/ProjectContext';

const baseProtocolos: Record<string, { imagem: string, copy: string }> = {
  "Harmonização Orofacial": { imagem: "/assets/servicos/harmonizacao.jpg", copy: "Arquitetura facial de elite. Proporções matemáticas para um rosto de impacto e sofisticação." },
  "Bioestimuladores": { imagem: "/assets/servicos/bioestimuladores.jpg", copy: "Redensificação dérmica avançada. O retorno do colágeno para uma sustentação impecável." },
  "Ultraformer III": { imagem: "/assets/servicos/ultraformer.jpg", copy: "Lifting não cirúrgico de alta precisão. Ancoragem muscular com tecnologia micro e macrofocada." },
  "Glass Skin": { imagem: "/assets/servicos/glass-skin.jpg", copy: "Textura de porcelana. Refinamento de poros e luminosidade absoluta para uma pele inconfundível." },
  "Fios PDO": { imagem: "/assets/servicos/fios-pdo.jpg", copy: "Sustentação biológica. Reposicionamento de tecidos com indução máxima de colágeno." },
  "Toxina Botulínica": { imagem: "/assets/servicos/toxina.jpg", copy: "Suavização inteligente. Expressões preservadas com a eliminação de marcas de fadiga." },
  "Rinomodelação": { imagem: "/assets/servicos/rinomodelacao.jpg", copy: "Reestruturação nasal não invasiva. Simetria e perfil perfeitamente alinhados." },
  "Transplante Capilar": { imagem: "/assets/servicos/transplante-capilar.jpg", copy: "Redensificação folicular de precisão. O resgate definitivo do volume e da moldura facial." },
  "Lentes de Porcelana": { imagem: "/assets/servicos/lentes.jpg", copy: "Sorriso de assinatura. Acabamento mirror effect com espessura mínima e resistência máxima." },
  "Implantes de Zircônia": { imagem: "/assets/servicos/implantes.jpg", copy: "A evolução metal-free. Integração óssea perfeita com estética gengival irretocável." },
  "Alinhadores Invisíveis": { imagem: "/assets/servicos/alinhadores.jpg", copy: "Ortodontia digital de alta performance. Movimentação milimétrica com invisibilidade total." },
  "Clareamento a Laser": { imagem: "/assets/servicos/clareamento.jpg", copy: "Fotobiomodulação estética. Brancura em níveis máximos com proteção estrutural do esmalte." },
  "Facetas em Resina": { imagem: "/assets/servicos/facetas-resina.jpg", copy: "Escultura manual de elite. Remodelagem imediata com polimento de alto brilho." },
  "Diagnóstico Digital": { imagem: "/assets/servicos/diagnostico-tech.jpg", copy: "Mapeamento 3D absoluto. Previsibilidade cirúrgica e planejamento milimétrico de cada detalhe." }
};

export const DossierTemplate = forwardRef<HTMLDivElement, {}>((props, ref) => {
  const { clinicName, location, ceoName, typography, theme, selectedProtocols, expansionPillars } = useProject();

  const protocolosAtivos = selectedProtocols.length > 0 ? selectedProtocols : Object.keys(baseProtocolos).slice(0, 3);
  
  // Agrupar protocolos de 2 em 2 para cada página A4 (1123px altura)
  const chunksServicos = [];
  for (let i = 0; i < protocolosAtivos.length; i += 2) {
    chunksServicos.push(protocolosAtivos.slice(i, i + 2));
  }

  // Define se é tema escuro para inverter cores quando necessário, mas usará vars nativas
  return (
    <div style={{ position: 'fixed', left: '-9999px', top: 0, zIndex: -10 }}>
      <div 
        ref={ref} 
        id="dossier-capture-root"
        className="flex flex-col bg-[var(--bg-base)] text-[var(--text-main)]"
        style={{ width: '794px' }}
      >
        
        {/* --- CAPA (PÁGINA 1) --- */}
        <div className="dossier-page relative flex h-[1123px] w-[794px] flex-col items-center justify-center overflow-hidden bg-[var(--bg-base)] p-12">
          {/* Fundo Glass Puro */}
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-[var(--bg-surface)] to-[var(--bg-base)] opacity-50"></div>
          
          {/* Bordas Duplas Premium Mapeando a Folha */}
          <div className="absolute inset-8 z-10 border border-[var(--color-accent)] opacity-20 rounded-xl"></div>
          
          <div className="relative z-20 flex w-full max-w-[600px] flex-col items-center text-center border border-[var(--color-accent)]/30 bg-[var(--bg-surface)]/50 backdrop-blur-3xl p-16 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
            <div className="mb-10 h-16 w-[1px] bg-[var(--color-accent)]"></div>
            <span className="mb-4 text-sm uppercase tracking-[0.5em] text-[var(--color-accent)] font-bold drop-shadow-md">
              Arquitetura de Autoridade
            </span>
            <h1 className="mb-10 font-serif text-6xl uppercase leading-[1.1] text-[var(--text-main)] drop-shadow-lg" style={{ fontFamily: 'var(--font-heading)' }}>
              Dossiê<br/>Estratégico
            </h1>
            <div className="mb-12 h-[1px] w-32 bg-[var(--color-accent)] opacity-50"></div>
            
            <h2 className="mb-4 text-xl font-bold uppercase tracking-widest text-[var(--text-main)]">
              EXCLUSIVO PARA:<br/>
              <span className="text-2xl mt-3 block text-[var(--text-muted)]">{clinicName || "CLÍNICA ELITE"}</span>
            </h2>
            <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] mt-4">
              DIREÇÃO CLÍNICA: {ceoName || "DR(A)."}
            </p>
          </div>

          <div className="absolute bottom-16 flex w-full justify-center">
            <span className="text-[9px] uppercase tracking-[0.4em] text-[var(--text-muted)] opacity-50 text-center">
              CONFIDENCIAL | BLACK LINK ECOSYSTEM | 2026
            </span>
          </div>
        </div>

        {/* --- ESTRATÉGIA TEMA & TIPOGRAFIA (PÁGINA 2) --- */}
        <div className="dossier-page relative flex h-[1123px] w-[794px] flex-col items-center justify-center overflow-hidden bg-[var(--bg-base)] p-16">
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-[var(--bg-surface)] to-[var(--bg-base)] opacity-40"></div>
          
          <div className="relative z-10 flex h-full w-full max-w-[660px] flex-col items-center justify-center border border-[var(--text-muted)]/20 p-16 backdrop-blur-3xl bg-[var(--bg-surface)]/50 shadow-[0_20px_60px_rgba(0,0,0,0.6)] rounded-3xl text-center">
            <h3 className="mb-6 font-serif text-4xl uppercase text-[var(--color-accent)]">
              I. O Peso da Imagem
            </h3>
            <div className="mb-12 h-[1px] w-32 bg-[var(--color-accent)] opacity-50 mx-auto"></div>
            
            <p className="mb-16 text-xl leading-relaxed text-[var(--text-muted)] tracking-wider">
              A paleta "<span className="font-bold text-[var(--text-main)]">{theme.toUpperCase()}</span>" aliada à tipografia "<span className="font-bold text-[var(--text-main)]">{typography.toUpperCase()}</span>" foi 
              arquitetada para estabelecer imediatamente a percepção de alto ticket em <span className="font-bold text-[var(--text-main)]">{location || "sua região"}</span>. 
              Esta estrutura converte através de gatilhos visuais inconscientes, blindando a excelência do(a) {ceoName || "Doutor(a)"} contra comparações de preço.
            </p>

            {/* Simulação de um Moodboard de Luxo em Linha Simétrica */}
            <div className="flex w-full justify-center gap-12 mt-4">
              <div className="h-56 w-56 bg-gradient-to-t from-[var(--bg-base)] to-[var(--bg-surface)] border border-[var(--text-muted)]/20 flex flex-col items-center justify-center rounded-2xl shadow-xl">
                 <span className="text-4xl font-serif text-[var(--text-main)] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>Aa</span>
                 <span className="text-[9px] uppercase tracking-widest text-[var(--text-muted)]">{typography}</span>
              </div>
              <div className="h-56 w-56 bg-[var(--base-theme)] border border-[var(--color-accent)]/80 flex flex-col items-center justify-center opacity-90 backdrop-blur-md rounded-2xl shadow-xl" style={{ backgroundColor: 'var(--color-accent)' }}>
                 <div className="h-10 w-10 border border-white/40 rotate-45 mb-4 shadow-[0_0_20px_rgba(255,255,255,0.3)]"></div>
                 <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--bg-base)]">Cor Escudo</span>
                 <span className="text-[8px] uppercase tracking-widest text-[var(--bg-base)]/70">{theme}</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- PROTOCOLOS (RENDERIZADOS COMO CARDS GLASS) --- */}
        {chunksServicos.map((chunk, pageIndex) => (
          <div key={`page-${pageIndex}`} className="dossier-page relative flex h-[1123px] w-[794px] flex-col overflow-hidden bg-[var(--bg-base)] p-16">
            <h3 className="mb-6 font-serif text-3xl uppercase text-[var(--color-accent)]">
              {pageIndex === 0 ? 'II. Inventário de Cânones' : 'Inventário (Cont.)'}
            </h3>
            <div className="mb-10 h-[1px] w-full bg-[var(--text-muted)]/20"></div>

            <div className="flex flex-col gap-10 flex-1">
              {chunk.map((item, idx) => {
                const servico = baseProtocolos[item];
                return (
                  <div key={idx} className="relative flex h-[400px] w-full overflow-hidden border border-[var(--text-muted)]/40 bg-[var(--bg-surface)] shadow-2xl">
                    {/* Imagem de Fundo Completa com Efeito Glow */}
                    {servico?.imagem ? (
                      <img src={servico.imagem} crossOrigin="anonymous" className="absolute inset-0 h-full w-full object-cover opacity-50 grayscale transition-all mix-blend-overlay" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-base)] to-black opacity-80" />
                    )}
                    
                    {/* Gradientes Glass */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-[var(--bg-base)]/80 to-transparent"></div>
                    
                    <div className="relative z-10 flex h-full flex-col justify-end p-10">
                      <span className="mb-2 text-xs font-bold uppercase tracking-[0.4em] text-[var(--color-accent)]">Protocolo de Conversão</span>
                      <h4 className="mb-4 font-serif text-4xl uppercase text-[var(--text-main)] shadow-black drop-shadow-md" style={{ fontFamily: 'var(--font-heading)' }}>
                        {item}
                      </h4>
                      <p className="text-sm leading-relaxed tracking-wider text-[var(--text-muted)] max-w-xl">
                        {servico?.copy || "Estrutura personalizada de captação e apresentação para elevação de resultados numéricos e autoridade percebida."}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* --- EXPANSÕES E FECHAMENTO (SIMETRIA GLASS CENTRAL) --- */}
        {expansionPillars && expansionPillars.length > 0 && (
          <div className="dossier-page relative flex h-[1123px] w-[794px] flex-col items-center justify-center overflow-hidden bg-[var(--bg-base)] p-16">
            {/* Background Otimizado para Fechamento */}
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-[var(--bg-surface)] to-[var(--bg-base)] opacity-60"></div>

            <div className="relative z-10 w-full max-w-[600px] flex flex-col items-center border border-[var(--color-accent)]/30 bg-[var(--bg-surface)]/60 p-16 backdrop-blur-3xl shadow-[0_20px_80px_rgba(0,0,0,0.8)] rounded-3xl">
              <h3 className="mb-4 font-serif text-4xl uppercase text-[var(--color-accent)] text-center drop-shadow-md">
                III. Escudo de Expansão
              </h3>
              <p className="text-center text-[var(--text-main)] uppercase tracking-[0.4em] font-bold text-xs mb-14 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">Infraestrutura Selecionada</p>
              
              <div className="flex w-full flex-col items-center gap-6">
                {expansionPillars.map((pilar, pIdx) => (
                  <div key={pIdx} className="w-full flex flex-col items-center justify-center border-b border-[var(--text-muted)]/10 pb-6 mb-2">
                    <span className="text-lg uppercase text-[var(--text-main)] tracking-widest text-center mb-3 font-serif" style={{ fontFamily: 'var(--font-heading)' }}>{pilar}</span>
                    <span className="text-[10px] uppercase text-[var(--color-accent)] tracking-[0.4em] font-bold opacity-80">[ MÓDULO ALINHADO ]</span>
                  </div>
                ))}
              </div>

              <div className="mt-16 flex w-full flex-col items-center">
                <div className="mb-8 h-[1px] w-24 bg-[var(--color-accent)]"></div>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)] text-center leading-relaxed max-w-sm">
                  A fundação estrutural está consolidada. Aguardamos o acionamento para a arquitetura do portal definitivo de {clinicName}.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
});

DossierTemplate.displayName = "DossierTemplate";
