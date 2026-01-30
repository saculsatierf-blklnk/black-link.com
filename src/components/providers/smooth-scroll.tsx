"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registra o plugin do GSAP globalmente
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // --- CONFIGURAÇÃO "HEAVY INDUSTRY" ---
    // Duration alta (1.5) + Easing Exponencial = Sensação de peso e luxo.
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curva suave e precisa
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2, // Responsividade tátil no mobile
      infinite: false,
    });

    lenisRef.current = lenis;

    // --- SINCRONIA GSAP x LENIS ---
    // Faz o ScrollTrigger atualizar a cada frame do Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // Integra o loop do Lenis ao ticker do GSAP (Heartbeat da aplicação)
    // Isso garante que Scroll e Animações rodem no mesmo ciclo de renderização (evita jitter)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Desativa o lag smoothing do GSAP para evitar "pulos" visuais ao scrolar rápido
    // Em interfaces imersivas, a precisão posicional é mais importante que a suavização de lag
    gsap.ticker.lagSmoothing(0);

    // --- CLEANUP ---
    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="w-full min-h-screen will-change-transform">
      {children}
    </div>
  );
}