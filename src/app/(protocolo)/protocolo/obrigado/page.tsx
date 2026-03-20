"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function ThankYouPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.5 }
      );
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 1 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main 
      ref={containerRef}
      className="relative w-full h-screen bg-[#000] flex flex-col items-center justify-center px-6 text-white selection:bg-white selection:text-black overflow-hidden"
    >
      {/* Luz ambiental sutil */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center gap-12 text-center">
        <h1 
          ref={textRef}
          className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter leading-[1.1] max-w-4xl"
        >
          PROTOCOLADO COM SUCESSO.<br />
          <span className="opacity-50">O PRÓXIMO NÍVEL COMEÇA AGORA.</span>
        </h1>

        <div ref={buttonRef} className="mt-4">
          <Link href="/">
            <button className="px-8 py-4 border border-white/20 hover:border-white hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-[0.2em] text-[10px] font-bold">
              RETORNAR AO PORTAL
            </button>
          </Link>
        </div>
      </div>

      {/* Footer minimalista */}
      <div className="absolute bottom-12 left-0 w-full flex justify-center opacity-20">
        <span className="font-mono text-[9px] tracking-[0.3em]">© 2026 BLACK LINK — PRIVATE ACCESS</span>
      </div>
    </main>
  );
}
