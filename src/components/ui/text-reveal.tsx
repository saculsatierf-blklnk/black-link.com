"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import clsx from "clsx";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  className?: string;
}

export function TextReveal({ children, className }: TextRevealProps) {
  const container = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);

  // Divide o texto em palavras para controle individual
  const words = children.split(" ");

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        // Começa quando o topo do container entra nos 85% da tela (quase embaixo)
        start: "top 85%", 
        // Termina quando o fundo do container passa dos 45% (centro da tela)
        // Isso força o usuário a scrolar para ler, criando engajamento físico
        end: "bottom 45%", 
        scrub: 1, // Suavidade de 1s para o scrub (efeito manteiga)
      },
    });

    // Animação "Materialize from Void"
    tl.fromTo(
      wordsRef.current,
      { 
        opacity: 0.1, 
        filter: "blur(10px)", // Blur pesado (vidro fosco)
        y: 20, // Texto sobe levemente
        color: "#52525b" // Começa cinza escuro (Zinc-600)
      },
      { 
        opacity: 1, 
        filter: "blur(0px)", 
        y: 0,
        color: "#ffffff", // Termina Branco Puro
        stagger: 0.05, // Efeito cascata rápido
        ease: "power2.out" 
      }
    );
  }, { scope: container });

  return (
    <div 
      ref={container} 
      className={clsx("flex flex-wrap leading-tight mix-blend-difference", className)}
    >
      {words.map((word, i) => (
        <span 
          key={i} 
          className="mr-[0.25em] will-change-transform" // Otimização de performance
          ref={(el) => { if (el) wordsRef.current[i] = el; }}
        >
          {word}
        </span>
      ))}
    </div>
  );
}