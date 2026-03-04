"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";

interface NavbarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Navbar({ isOpen, setIsOpen }: NavbarProps) {
  // menu open state now controlled by parent to avoid unnecessary re-renders
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isImmersivePage = pathname === "/ph7" || pathname === "/brga";

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((o) => !o);

  if (isImmersivePage) return null;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[50] px-6 py-6 md:px-12 md:py-8 flex justify-between items-center mix-blend-difference text-white pointer-events-none">
        <Link href="/" className="pointer-events-auto group">
          <span className="font-sans text-xl md:text-2xl font-medium tracking-tight hover:opacity-70 transition-opacity text-white">
            BLACK LINK
          </span>
        </Link>

        <button
          onClick={toggleMenu}
          className="pointer-events-auto flex flex-col gap-[6px] group p-2 hover:opacity-80 transition-opacity z-[60]"
        >
          <span className={`w-6 md:w-8 h-[2px] bg-white block transition-all duration-500 ease-expo-out ${isOpen ? "rotate-45 translate-y-[8px]" : ""}`} />
          <span className={`w-6 md:w-8 h-[2px] bg-white block transition-all duration-500 ease-expo-out ${isOpen ? "opacity-0 translate-x-4" : ""}`} />
          <span className={`w-6 md:w-8 h-[2px] bg-white block transition-all duration-500 ease-expo-out ${isOpen ? "-rotate-45 -translate-y-[8px]" : ""}`} />
        </button>
      </nav>

      {mounted && createPortal(
        <div
          className={`fixed inset-0 z-[99999] bg-[#050505] transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] ${isOpen ? "opacity-100 visible clip-path-open" : "opacity-0 invisible pointer-events-none"
            }`}
        >
          <div className="relative w-full h-full flex flex-col justify-between p-6 md:p-12">

            <div className="flex justify-end">
              <button
                onClick={toggleMenu}
                className="group flex items-center gap-2 font-mono text-[10px] md:text-xs text-white/40 hover:text-white transition-colors uppercase tracking-widest mt-2"
              >
                <span>Fechar</span>
                <span className="border border-white/20 px-2 py-1 rounded-full group-hover:bg-white group-hover:text-black transition-all">X</span>
              </button>
            </div>

            <div className="flex flex-col items-center justify-center gap-1 md:gap-4 h-full overflow-y-auto">
              <MenuLink href="/" label="Início" index="01" onClick={toggleMenu} />
              <MenuLink href="/#work" label="Projetos" index="02" onClick={toggleMenu} />

              <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent my-2 md:my-4" />

              <div className="text-center mb-2 md:mb-4">
                <p className="font-sans text-[8px] md:text-[10px] uppercase tracking-[0.4em] text-[#C5A059] font-bold opacity-80 mb-2">
                  Acesso Restrito
                </p>
              </div>

              <MenuLink href="/ph7" label="PH7 (MC/CANTOR)" index="03" onClick={toggleMenu} highlight />
              <MenuLink href="/brga" label="PROD. ODÉ" index="04" onClick={toggleMenu} highlight />

              <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent my-2 md:my-4" />

              <MenuLink href="https://wa.me/5511978291846" label="Contato" index="05" onClick={toggleMenu} />
            </div>

            <div className="flex justify-center md:justify-between items-end border-t border-white/10 pt-6">
              <div className="hidden md:block">
                <p className="font-sans text-[10px] uppercase tracking-widest text-white/30">SP, BR</p>
              </div>
              <div className="text-center">
                <p className="font-sans text-[9px] md:text-[10px] uppercase tracking-widest text-white/30">
                  Black Link © 2026
                </p>
              </div>
              <div className="hidden md:block">
                <p className="font-sans text-[10px] uppercase tracking-widest text-white/30">V. 2.0</p>
              </div>
            </div>

          </div>
        </div>,
        document.body
      )}
    </>
  );
}

function MenuLink({ href, label, index, onClick, highlight = false }: any) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group relative flex items-center justify-center p-2 overflow-hidden w-full"
    >
      <div className="relative flex items-baseline gap-2 md:gap-6 z-10 px-4">
        <span className="font-mono text-[9px] md:text-xs text-[#C5A059] opacity-50 group-hover:opacity-100 transition-opacity duration-300">
          {index}
        </span>
        {/* MOBILE: text-3xl | DESKTOP: text-6xl/7xl */}
        <span
          className={`font-serif text-3xl md:text-6xl lg:text-7xl uppercase tracking-tighter transition-all duration-500 text-center ${highlight
            ? "text-white group-hover:text-[#C5A059] group-hover:italic"
            : "text-zinc-500 group-hover:text-white"
            }`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
}