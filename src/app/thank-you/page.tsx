"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function ThankYouPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("blacklink_dna_session");
      localStorage.removeItem("blacklink_dna_session");
      sessionStorage.removeItem("blacklink_visited");
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.2 }
      );
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.8 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main 
      ref={containerRef}
      className="relative w-full h-[100svh] bg-[#000] flex flex-col items-center justify-center px-6 text-white selection:bg-white selection:text-black overflow-hidden z-50 p-0 m-0"
    >
      <Link 
        href="/" 
        className="fixed top-6 left-6 md:top-8 md:left-8 z-[9999] font-sans text-[10px] md:text-xs tracking-widest text-[#E0E0E0] opacity-40 hover:opacity-100 transition-opacity duration-500 uppercase rounded-sm"
        style={{ backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
      >
        BLACK LINK
      </Link>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-10 text-center w-full max-w-4xl mx-auto">
        <h1 
          ref={textRef}
          className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-widest leading-[1.1] opacity-0"
        >
          OBRIGADO<span className="text-white/40">.</span>
        </h1>

        <div ref={buttonRef} className="opacity-0">
          <Link href="/">
            <button className="text-[10px] md:text-[11px] uppercase tracking-[0.4em] font-bold text-white/40 hover:text-white transition-colors duration-500 active:scale-95">
              RETORNAR AO COMANDO
            </button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-12 left-0 w-full flex justify-center opacity-20">
        <span className="font-mono text-[9px] tracking-[0.3em] uppercase">© {new Date().getFullYear()} BLACK LINK — PRIVATE ACCESS</span>
      </div>
    </main>
  );
}
