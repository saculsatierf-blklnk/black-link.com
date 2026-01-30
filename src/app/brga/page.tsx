"use client";

import Link from "next/link";

export default function BrgaPage() {
  return (
    <div className="relative w-full h-screen bg-void flex flex-col items-center justify-center overflow-hidden">
      
      {/* Botão Voltar */}
      <Link href="/" className="fixed top-8 left-8 z-50 flex items-center gap-3 px-6 py-3 border border-platinum/10 bg-black/20 backdrop-blur-md rounded-full group hover:border-platinum/30 transition-all">
        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-zinc-500 group-hover:text-platinum transition-colors font-bold">
          System Return
        </span>
      </Link>

      <div className="relative z-10 text-center flex flex-col items-center gap-6">
        <h1 className="font-serif text-[15vw] leading-none text-void text-stroke-platinum opacity-20 tracking-tighter select-none" style={{ WebkitTextStroke: "1px #333" }}>
          BRGA
        </h1>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
          <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-platinum to-transparent opacity-50" />
          <p className="font-sans text-xs text-platinum uppercase tracking-[0.5em] font-bold animate-pulse">
            CLASSIFIED ARTIST
          </p>
          <p className="font-serif text-zinc-600 text-sm">
            Protocolo de lançamento em espera.
          </p>
        </div>
      </div>
    </div>
  );
}