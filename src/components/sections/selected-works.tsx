"use client";

import Image from "next/image";

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
      { label: "Gofer Metais", url: "https://gofermetais.com.br/" },
      // Nova prova requisitada pelo time de UX
      { label: "DIINC SP", url: "https://www.instagram.com/diinc_sp" }
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
      { label: "David HBS Viagens", url: "https://davidhbsviagens.com/" },
      // link extra acrescentado pelo briefing
      { label: "DIINC SP", url: "https://diinc.com.br/" }
    ],
    image: "/assets/works/software.jpg",
    whatsappMsg: "Olá, preciso desenvolver um Software, App ou Automação."
  }
];

export function SelectedWorks() {
  return (
    <section className="relative w-full bg-black h-auto z-50">


      {/* Container Principal - Fluxo normal de blocos */}
      <div className="relative w-full flex flex-col gap-16 md:gap-24 pb-24 md:pb-32 -mt-8 md:-mt-12">
        {pillars.map((pillar, index) => (
          <div
            key={pillar.id}
            className="relative w-full h-auto flex items-center justify-center px-4 md:px-12"
          >
            {/* CARD CONTAINER */}
            <div className="relative w-full h-auto md:min-h-[85vh] border border-white/10 overflow-hidden shadow-2xl group bg-black md:bg-[#0a0a0a]">

              {/* CAMADA 1: IMAGEM BACKGROUND */}
              <div className="absolute inset-0 z-0 w-full h-full bg-black">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  sizes="100vw"
                  className="object-cover opacity-40 md:opacity-60 md:group-hover:opacity-80 md:group-hover:scale-105 transition-all duration-700 ease-out md:grayscale md:group-hover:grayscale-0"
                  priority
                />
                {/* GRADIENTE ESTRATÉGICO */}
                <div className="hidden md:block absolute inset-0 to-transparent opacity-100 bg-gradient-to-r from-black via-black/90" />
              </div>

              {/* CAMADA 2: CONTEÚDO */}
              <div className="relative z-10 w-full md:w-[65%] h-full p-8 md:p-16 flex flex-col justify-center gap-12 md:gap-16">
                
                {/* Texto Superior */}
                <div>
                  <span className="font-sans text-xs text-zinc-400 uppercase tracking-widest mb-6 block border-l-2 border-white pl-4 font-bold">
                    {pillar.title}
                  </span>
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-8 leading-[0.9] drop-shadow-lg">
                    {pillar.headline}
                  </h2>
                  <p className="font-sans text-lg text-zinc-300 font-light leading-relaxed max-w-xl drop-shadow-md">
                    {pillar.description}
                  </p>
                </div>

                {/* Footer do Card */}
                <div className="flex flex-col gap-8 md:gap-12">
                  <div className="flex flex-col gap-3">
                    <span className="font-sans text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Cases & Projetos</span>
                    {pillar.proofs.map((proof, i) => (
                      <a key={i} href={proof.url} target="_blank" rel="noopener noreferrer" className="text-sm font-sans font-bold text-white hover:text-zinc-300 transition-colors flex items-center gap-2 w-fit pointer-events-auto">
                        → {proof.label}
                      </a>
                    ))}
                  </div>

                  <div className="pt-8 border-t border-white/20 w-full md:w-max">
                    <a
                      href={`https://wa.me/5511978291846?text=${encodeURIComponent(pillar.whatsappMsg)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-8 py-4 bg-white text-black font-sans text-xs uppercase tracking-widest font-bold hover:bg-zinc-200 transition-all cursor-pointer shadow-lg hover:shadow-white/20 pointer-events-auto"
                    >
                      VER MAIS
                    </a>
                  </div>
                </div>

              </div>


            </div>
          </div>
        ))}
      </div>
    </section>
  );
}