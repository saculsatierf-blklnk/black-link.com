"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";

interface NavbarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Navbar({ isOpen, setIsOpen }: NavbarProps) {
  const [montado, setMontado] = useState(false);
  const [artistasAberto, setArtistasAberto] = useState(false);
  
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const ecossistemaRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const paginaImersiva = pathname === "/ph7" || pathname === "/prod-brga";

  useEffect(() => { setMontado(true); }, []);

  // GSAP for Menu Dropdown (Floating tiny element, no scroll lock)
  useEffect(() => {
    if (isOpen && menuPanelRef.current) {
      gsap.fromTo(
        menuPanelRef.current,
        { y: -20, opacity: 0, autoAlpha: 0 },
        { y: 0, opacity: 1, autoAlpha: 1, duration: 0.5, ease: "power3.out" }
      );
    } else if (menuPanelRef.current) {
      gsap.to(menuPanelRef.current, { y: -20, opacity: 0, autoAlpha: 0, duration: 0.3, ease: "power2.in" });
      setArtistasAberto(false);
    }
  }, [isOpen]);

  // GSAP for Ecossistema Accordion Dropdown
  useEffect(() => {
    if (!ecossistemaRef.current) return;
    
    if (artistasAberto) {
      gsap.to(ecossistemaRef.current, { height: "auto", duration: 0.4, ease: "power2.out" });
      gsap.fromTo(ecossistemaRef.current.querySelectorAll('.sub-item'), 
        { opacity: 0, x: -10 }, 
        { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: "power1.out", delay: 0.1 }
      );
    } else {
      gsap.to(ecossistemaRef.current, { height: 0, duration: 0.3, ease: "power2.in" });
    }
  }, [artistasAberto]);

  const alternarMenu = () => setIsOpen((estado) => !estado);

  if (paginaImersiva) return null;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-6 md:px-12 md:py-8 flex justify-between items-center text-white pointer-events-none">
        <Link href="/" className="pointer-events-auto">
          <span className="font-sans text-xl md:text-2xl font-medium tracking-tight hover:opacity-70 transition-opacity">
            BLACK LINK
          </span>
        </Link>
        <button onClick={alternarMenu} className="pointer-events-auto flex flex-col gap-[6px] p-2 hover:opacity-80 transition-opacity z-[9999] relative">
          <span className={`w-6 md:w-8 h-[2px] bg-white block transition-all duration-500 ease-out ${isOpen ? "rotate-45 translate-y-[8px]" : ""}`} />
          <span className={`w-6 md:w-8 h-[2px] bg-white block transition-all duration-500 ease-out ${isOpen ? "opacity-0 translate-x-4" : ""}`} />
          <span className={`w-6 md:w-8 h-[2px] bg-white block transition-all duration-500 ease-out ${isOpen ? "-rotate-45 -translate-y-[8px]" : ""}`} />
        </button>
      </nav>

      {montado && (
        <div 
          ref={menuPanelRef}
          className="fixed top-24 right-6 md:right-12 w-80 md:w-[400px] bg-[#050505] border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8 z-[9000] invisible pointer-events-auto"
        >
          <div className="flex flex-col gap-6">
            <NavItem href="/" rotulo="Início" aoClicar={alternarMenu} />
            
            <div 
              className="flex flex-col group cursor-pointer"
              onMouseEnter={() => setArtistasAberto(true)}
              onMouseLeave={() => setArtistasAberto(false)}
            >
              <span className="font-cinzel text-2xl md:text-3xl tracking-wider text-white group-hover:text-white/70 transition-colors uppercase">
                Ecossistema
              </span>
              
              <div ref={ecossistemaRef} className="overflow-hidden h-0 flex flex-col gap-4 pl-4 border-l border-white/10 mt-4">
                
                <div className="flex flex-col gap-2 sub-item">
                  <span className="text-white/30 text-[9px] uppercase tracking-[0.2em] font-sans">Entretenimento</span>
                  <SubLink href="/ph7" rotulo="PH7" aoClicar={alternarMenu} />
                  <SubLink href="/prod-brga" rotulo="PROD.BRGA" aoClicar={alternarMenu} />
                </div>
                
                <div className="flex flex-col gap-2 sub-item">
                  <span className="text-white/30 text-[9px] uppercase tracking-[0.2em] font-sans">Saúde</span>
                  <SubLink href="/assets/dra-natallia/index.html" rotulo="Dra. Natállia" nativo aoClicar={alternarMenu} />
                </div>
                
                <div className="flex flex-col gap-2 sub-item">
                  <span className="text-white/30 text-[9px] uppercase tracking-[0.2em] font-sans">Performance</span>
                  <SubLink href="https://gofermetais.com.br" rotulo="Gofer Metais" externo aoClicar={alternarMenu} />
                  <SubLink href="https://davidhbsviagens.com" rotulo="David HBS" externo aoClicar={alternarMenu} />
                  <SubLink href="https://diinc.com.br" rotulo="DIINC SP" externo aoClicar={alternarMenu} />
                </div>
              </div>
            </div>

            <NavItem href="/contact" rotulo="Contato" aoClicar={alternarMenu} />
          </div>
        </div>
      )}
    </>
  );
}

function NavItem({ href, rotulo, aoClicar }: { href: string, rotulo: string, aoClicar: () => void }) {
  return (
    <Link href={href} onClick={aoClicar} className="block w-fit">
      <span className="font-cinzel text-2xl md:text-3xl tracking-wider text-white hover:text-white/70 transition-colors uppercase">
        {rotulo}
      </span>
    </Link>
  );
}

function SubLink({ href, rotulo, aoClicar, externo, nativo }: { href: string, rotulo: string, aoClicar: () => void, externo?: boolean, nativo?: boolean }) {
  if (externo || nativo) {
    return (
      <a 
        href={href} 
        onClick={aoClicar}
        target={externo ? "_blank" : undefined}
        rel={externo ? "noopener noreferrer" : undefined}
        className="font-sans text-sm text-zinc-400 hover:text-white transition-colors w-fit block tracking-widest"
      >
        {rotulo}
      </a>
    );
  }

  return (
    <Link 
      href={href} 
      onClick={aoClicar}
      className="font-sans text-sm text-zinc-400 hover:text-white transition-colors w-fit block tracking-widest"
    >
      {rotulo}
    </Link>
  );
}