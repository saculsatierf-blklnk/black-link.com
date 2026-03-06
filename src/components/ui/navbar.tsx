"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import gsap from "gsap";

interface NavbarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// Mapa de Imagens Noir para a Câmara Esquerda
const imagensIdentidade: Record<string, string> = {
  ph7: "/assets/ph7-noir.jpg", // Substitua pelos caminhos reais
  "prod-ode": "/assets/ode-noir.jpg",
  projetos: "/assets/vault-noir.jpg",
};

export function Navbar({ isOpen, setIsOpen }: NavbarProps) {
  const [montado, setMontado] = useState(false);
  const [artistasAberto, setArtistasAberto] = useState(false);
  const [linkFocado, setLinkFocado] = useState<string | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);
  const artistasRef = useRef<HTMLDivElement>(null);
  const camaraEsquerdaRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const paginaImersiva = pathname === "/ph7" || pathname === "/brga";

  useEffect(() => { setMontado(true); }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  // Spotlight Magnético no Fundo
  useEffect(() => {
    if (!isOpen || !montado) return;
    
    const moverSpotlight = (e: MouseEvent) => {
      gsap.to(spotlightRef.current, {
        x: e.clientX - 150, // Centraliza o raio de 300px
        y: e.clientY - 150,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", moverSpotlight);
    return () => window.removeEventListener("mousemove", moverSpotlight);
  }, [isOpen, montado]);

  // Animação de Entrada do Menu
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const itensMenu = menuRef.current.querySelectorAll(".item-revelado");
      gsap.fromTo(
        itensMenu,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", stagger: 0.08, clearProps: "all" }
      );
    } else {
      setArtistasAberto(false);
      setLinkFocado(null);
    }
  }, [isOpen]);

  // Coreografia do Acordeão (Shift Lateral e Revelação)
  useEffect(() => {
    if (!artistasRef.current || !menuRef.current) return;

    const outrosItens = menuRef.current.querySelectorAll(".item-primario:not(.grupo-artistas)");
    const subItens = artistasRef.current.querySelectorAll(".sub-item-revelado");

    if (artistasAberto) {
      // Shift Lateral dos outros links
      gsap.to(outrosItens, { x: -40, opacity: 0.2, duration: 0.6, ease: "power3.out" });
      
      // Expansão do Container e Revelação dos Sub-itens
      gsap.to(artistasRef.current, { height: "auto", duration: 0.6, ease: "power3.inOut" });
      gsap.fromTo(
        subItens,
        { opacity: 0, scale: 0.8, filter: "blur(10px)", y: 20 },
        { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 0.8, ease: "power4.out", stagger: 0.1, delay: 0.2 }
      );
    } else {
      gsap.to(outrosItens, { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" });
      gsap.to(artistasRef.current, { height: 0, duration: 0.5, ease: "power2.inOut" });
      gsap.to(subItens, { opacity: 0, duration: 0.3 });
    }
  }, [artistasAberto]);

  // Transição de Imagem Noir na Câmara Esquerda
  useEffect(() => {
    const imagemAlvo = camaraEsquerdaRef.current?.querySelector(".imagem-ativa");
    if (imagemAlvo) {
      gsap.fromTo(
        imagemAlvo,
        { opacity: 0, filter: "blur(15px)" },
        { opacity: 0.8, filter: "blur(0px)", duration: 1.2, ease: "expo.out" }
      );
    }
  }, [linkFocado]);

  const alternarMenu = () => setIsOpen((estado) => !estado);

  if (paginaImersiva) return null;

  return (
    <>
      <style jsx global>{`
        @keyframes fervuraPelicula {
          0% { background-position: 0% 0%; }
          25% { background-position: -5% 10%; }
          50% { background-position: 15% -10%; }
          75% { background-position: -15% 5%; }
          100% { background-position: 0% 0%; }
        }
        .animacao-ruido {
          animation: fervuraPelicula 0.4s steps(1) infinite;
        }
        .filtro-vidro:hover {
          filter: url(#liquid);
        }
        .filtro-noir {
          filter: grayscale(100%) contrast(150%) brightness(60%);
        }
      `}</style>

      {/* SVG Oculto para Distorção Líquida */}
      <svg className="hidden">
        <filter id="liquid">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="10" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Navegação Superior */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-6 md:px-12 md:py-8 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
        <Link href="/" className="pointer-events-auto">
          <span className="font-sans text-xl md:text-2xl font-medium tracking-tight hover:opacity-70 transition-opacity">
            BLACK LINK
          </span>
        </Link>
        <button onClick={alternarMenu} className="pointer-events-auto flex flex-col gap-[6px] p-2 hover:opacity-80 transition-opacity z-[60]">
          <span className={`w-6 md:w-8 h-[2px] bg-white block transition-all duration-500 ease-out ${isOpen ? "rotate-45 translate-y-[8px]" : ""}`} />
          <span className={`w-6 md:w-8 h-[2px] bg-white block transition-all duration-500 ease-out ${isOpen ? "opacity-0 translate-x-4" : ""}`} />
          <span className={`w-6 md:w-8 h-[2px] bg-white block transition-all duration-500 ease-out ${isOpen ? "-rotate-45 -translate-y-[8px]" : ""}`} />
        </button>
      </nav>

      {montado && createPortal(
        <div className={`fixed inset-0 z-[9990] bg-black/40 backdrop-blur-[40px] overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] ${isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
          
          {/* Spotlight Desfoque */}
          <div ref={spotlightRef} className="absolute top-0 left-0 w-[300px] h-[300px] pointer-events-none z-[9993] rounded-full backdrop-blur-[20px]" style={{ maskImage: "radial-gradient(circle at center, black 0%, transparent 70%)", WebkitMaskImage: "radial-gradient(circle at center, black 0%, transparent 70%)" }} />

          {/* Ruído 35mm Cinético */}
          <div className="pointer-events-none absolute inset-0 z-[9991] bg-[url('/noise.png')] opacity-[0.04] animacao-ruido mix-blend-overlay" />

          {/* Estrutura Principal */}
          <div ref={menuRef} className="relative z-[9994] w-full h-screen flex flex-col md:grid md:grid-cols-12">
            
            {/* Câmara Esquerda (Identity Fragments) */}
            <div ref={camaraEsquerdaRef} className="relative col-span-12 md:col-span-5 p-6 md:p-12 flex flex-col justify-between h-full border-b md:border-b-0 border-white/10 z-[9992] overflow-hidden">
              {linkFocado && imagensIdentidade[linkFocado] && (
                <img src={imagensIdentidade[linkFocado]} alt="" className="absolute inset-0 w-full h-full object-cover filtro-noir imagem-ativa -z-10" />
              )}
              
              <div className="flex justify-between items-center w-full z-10">
                <span className="text-white/50 text-xs tracking-[0.2em] font-sans">NAVEGAÇÃO</span>
                <button onClick={alternarMenu} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white transition-all duration-[600ms] hover:rotate-180 hover:bg-white/5 backdrop-blur-md">X</button>
              </div>
              <div className="hidden md:block z-10">
                 <p className="font-sans text-[10px] uppercase tracking-widest text-white/30 backdrop-blur-sm p-2 rounded">Black Link © 2026<br/>Santo André, SP</p>
              </div>
            </div>

            {/* Divisória Proporção Áurea */}
            <div className="hidden md:block absolute left-[38.2vw] top-0 w-[1px] h-full bg-white/10 z-[9994]" />

            {/* Bloco Direito (Interações Magnéticas) */}
            <div className="col-span-12 md:col-span-7 p-6 md:p-12 flex items-center justify-center md:justify-start h-full relative z-[9994]">
              <div className="flex flex-col items-start w-full max-w-2xl gap-2">
                
                <LinkMagnético id="inicio" href="/" rotulo="Início" aoClicar={alternarMenu} focado={linkFocado} definirFoco={setLinkFocado} classe="item-primario" />
                <LinkMagnético id="projetos" href="/vault" rotulo="Projetos" aoClicar={alternarMenu} focado={linkFocado} definirFoco={setLinkFocado} classe="item-primario" />
                
                <div className="w-full h-[1px] bg-white/10 my-4 item-revelado item-primario" />

                {/* Acordeão de Artistas */}
                <div className={`w-full flex flex-col items-start transition-all duration-500 item-revelado grupo-artistas item-primario ${linkFocado && linkFocado !== 'artistas' ? 'opacity-20 blur-[2px]' : 'opacity-100'}`}
                  onMouseEnter={() => setLinkFocado('artistas')}
                  onMouseLeave={() => setLinkFocado(null)}
                >
                  <button onClick={() => setArtistasAberto(!artistasAberto)} className="py-2 text-left z-[9995]">
                    <span className="font-cinzel text-5xl md:text-7xl uppercase tracking-wider text-white hover:text-white/80 transition-colors filtro-vidro">
                      Nossos Artistas
                    </span>
                  </button>

                  <div ref={artistasRef} className="flex flex-col items-start gap-4 w-full overflow-hidden h-0 pl-4 md:pl-12 border-l border-white/20 ml-2 mt-4 z-[9995]">
                    <div className="sub-item-revelado"><LinkMagnético id="ph7" href="/ph7" rotulo="PH7" aoClicar={alternarMenu} focado={linkFocado} definirFoco={setLinkFocado} subItem /></div>
                    <div className="sub-item-revelado"><LinkMagnético id="prod-ode" href="/prod-ode" rotulo="PROD. ODÉ" aoClicar={alternarMenu} focado={linkFocado} definirFoco={setLinkFocado} subItem /></div>
                  </div>
                </div>

                <div className="w-full h-[1px] bg-white/10 my-4 item-revelado item-primario" />

                <LinkMagnético id="contato" href="/contact" rotulo="Contato" aoClicar={alternarMenu} focado={linkFocado} definirFoco={setLinkFocado} classe="item-primario" />
                
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

// Sub-componente Magnético Isolado
interface LinkMagnéticoProps {
  id: string;
  href: string;
  rotulo: string;
  aoClicar: () => void;
  focado: string | null;
  definirFoco: (id: string | null) => void;
  subItem?: boolean;
  classe?: string;
}

function LinkMagnético({ id, href, rotulo, aoClicar, focado, definirFoco, subItem = false, classe = "" }: LinkMagnéticoProps) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const textoRef = useRef<HTMLSpanElement>(null);
  const animacaoRespiraRef = useRef<gsap.core.Tween | null>(null);
  
  const estaOculto = focado && focado !== id && focado !== 'artistas'; 

  const lidarComMovimento = (e: React.MouseEvent) => {
    if (!containerRef.current || !textoRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centroX = rect.left + rect.width / 2;
    const centroY = rect.top + rect.height / 2;
    const distanciaX = e.clientX - centroX;
    const distanciaY = e.clientY - centroY;
    
    // Raio de 50px de magnetismo
    if (Math.abs(distanciaX) < 50 && Math.abs(distanciaY) < 50) {
      gsap.to(textoRef.current, {
        x: distanciaX * 0.4,
        y: distanciaY * 0.4,
        duration: 0.4,
        ease: "power3.out"
      });
    }
  };

  const lidarComEntrada = () => {
    definirFoco(id);
    animacaoRespiraRef.current = gsap.to(textoRef.current, {
      letterSpacing: subItem ? "0.15em" : "0.08em",
      duration: 1.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    });
  };

  const lidarComSaida = () => {
    definirFoco(null);
    animacaoRespiraRef.current?.kill();
    gsap.to(textoRef.current, {
      x: 0,
      y: 0,
      letterSpacing: subItem ? "0.1em" : "normal",
      duration: 0.6,
      ease: "elastic.out(1, 0.3)"
    });
  };

  return (
    <Link
      href={href}
      onClick={aoClicar}
      ref={containerRef}
      onMouseMove={lidarComMovimento}
      onMouseEnter={lidarComEntrada}
      onMouseLeave={lidarComSaida}
      className={`relative flex items-center py-4 item-revelado transition-opacity duration-500 w-full md:w-auto ${classe} ${estaOculto ? "opacity-20 blur-[2px]" : "opacity-100 blur-none"}`}
    >
      <span
        ref={textoRef}
        className={`font-cinzel uppercase transition-colors duration-300 filtro-vidro inline-block ${
          subItem ? "text-2xl md:text-4xl text-zinc-400 hover:text-[#C5A059]" : "text-5xl md:text-7xl tracking-wider text-white"
        }`}
      >
        {rotulo}
      </span>
    </Link>
  );
}