"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSovereign } from "@/components/providers/sovereign-provider";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function SovereignPreloader() {
  const { isPreloaderDone, setIsPreloaderDone, setConsoleData } = useSovereign();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRendered, setIsRendered] = useState(true);

  useEffect(() => {
    // A mente (O Console) recebe os textos estritamente da matriz
    // Frame 0-2s: Frase 1 | Frame 2-4s: Frase 2 | Frame 4s: Fade out
    const ctx = gsap.context(() => {
      gsap.delayedCall(0, () => setConsoleData({ title: "", description: "Seja Bem-Vindo à Black Link." }));
      gsap.delayedCall(2, () => setConsoleData({ title: "", description: "Um espaço de simplificação para sua operação." }));
      gsap.delayedCall(4, () => {
        setIsPreloaderDone(true);
        gsap.to(containerRef.current, { 
          opacity: 0, 
          duration: 0.8, 
          ease: "expo.out",
          onComplete: () => {
            setIsRendered(false);
            if (typeof window !== "undefined") {
               window.dispatchEvent(new Event('resize')); 
               ScrollTrigger.refresh();
            }
          } 
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [setIsPreloaderDone, setConsoleData]);

  if (!isRendered) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999] bg-[#030303] flex items-center justify-center"
    />
  );
}
