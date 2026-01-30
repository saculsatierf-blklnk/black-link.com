"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PH7Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorMainRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);

  // --- 1. LÓGICA DE ÁUDIO ---
  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((e) => console.log("Autoplay bloqueado pelo navegador", e));
      setIsPlaying(true);
    }
  };

  // Tentar autoplay suave ao carregar (muitos navegadores bloqueiam, então o botão é necessário)
  useEffect(() => {
    const handleFirstClick = () => {
      if (!isPlaying && audioRef.current) {
        toggleAudio();
        window.removeEventListener('click', handleFirstClick);
      }
    };
    window.addEventListener('click', handleFirstClick);
    return () => window.removeEventListener('click', handleFirstClick);
  }, [isPlaying]);

  // --- 2. CANVAS DE PARTÍCULAS ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    let particles: {x: number, y: number, vx: number, vy: number, size: number, alpha: number}[] = [];
    let animationFrameId: number;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener('resize', resize);
    resize();

    // Criar partículas
    for(let i=0; i<80; i++) {
      particles.push({
        x: Math.random()*w, 
        y: Math.random()*h, 
        vx: (Math.random()-0.5)*0.2, 
        vy: (Math.random()-0.5)*0.2, 
        size: Math.random()*1.5, 
        alpha: Math.random()*0.4
      });
    }

    const animateCanvas = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx; 
        p.y += p.vy;
        if(p.x < 0) p.x = w; if(p.x > w) p.x = 0;
        if(p.y < 0) p.y = h; if(p.y > h) p.y = 0;
        ctx.fillStyle = `rgba(197, 160, 89, ${p.alpha})`;
        ctx.beginPath(); 
        ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); 
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animateCanvas);
    };
    animateCanvas();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // --- 3. CURSOR CUSTOMIZADO ---
  useEffect(() => {
    const cursorMain = cursorMainRef.current;
    const cursorFollower = cursorFollowerRef.current;
    if (!cursorMain || !cursorFollower) return;

    let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;
    
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(cursorMain, {x: mouseX - 5, y: mouseY - 5, duration: 0});
    };

    const animateCursor = () => {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      gsap.set(cursorFollower, {x: followerX - 25, y: followerY - 25});
      requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', onMouseMove);
    animateCursor();

    // Efeito Magnético em links
    const magnetics = document.querySelectorAll('a, button, .magnetic-trigger');
    magnetics.forEach(el => {
      el.addEventListener('mouseenter', () => { 
        gsap.to(cursorFollower, {scale: 1.5, borderColor: '#C5A059', duration: 0.3}); 
        gsap.to(cursorMain, {scale: 0}); 
      });
      el.addEventListener('mouseleave', () => { 
        gsap.to(cursorFollower, {scale: 1, borderColor: 'rgba(197,160,89,0.3)', duration: 0.3}); 
        gsap.to(cursorMain, {scale: 1}); 
      });
    });

    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  // --- 4. ANIMAÇÕES GSAP (SCROLL & REVEAL) ---
  useGSAP(() => {
    // Reveal Inicial
    const tl = gsap.timeline();
    tl.from(".animate-title-up", {
      y: "100%", 
      duration: 1.5, 
      ease: "power4.out", 
      stagger: 0.2,
      delay: 0.5
    })
    .from(".animate-text-reveal", {
      y: 20, 
      opacity: 0, 
      duration: 1
    }, "-=1");

    // Parallax
    gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
      gsap.to(el, {
        y: (i, target) => -20 * parseFloat(target.dataset.speed || "0") + "%",
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 0,
        },
      });
    });

    // Skew Effect
    let proxy = { skew: 0 };
    const skewSetter = gsap.quickSetter(".skew-elem", "skewY", "deg");
    const clamp = gsap.utils.clamp(-20, 20);

    ScrollTrigger.create({
      onUpdate: (self) => {
        const skew = clamp(self.getVelocity() / -300);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: "power3",
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew),
          });
        }
      },
    });
  }, { scope: containerRef });

  return (
    // 'cursor-none' esconde o cursor padrão do sistema para usar o nosso
    <div ref={containerRef} className="bg-void min-h-screen w-full text-platinum overflow-hidden cursor-none selection:bg-gold-dust selection:text-void">
      
      {/* BACKGROUND MUSIC (Invisível) */}
      <audio ref={audioRef} loop src="/assets/ph7/beat.mp3" />

      {/* BACKGROUND CANVAS */}
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full z-0 opacity-40 pointer-events-none" />

      {/* CURSOR CUSTOMIZADO */}
      <div ref={cursorMainRef} className="fixed w-[10px] h-[10px] bg-gold-dust rounded-full pointer-events-none z-[10000] mix-blend-difference top-0 left-0" />
      <div ref={cursorFollowerRef} className="fixed w-[50px] h-[50px] border border-gold-dust/30 rounded-full pointer-events-none z-[9999] top-0 left-0" />

      {/* UI: BOTÃO VOLTAR (SYSTEM RETURN) */}
      <Link href="/" className="fixed top-8 left-8 z-50 flex items-center gap-3 px-6 py-3 border border-platinum/30 bg-black/20 backdrop-blur-md rounded-full group transition-all duration-500 hover:border-gold-dust hover:bg-black/60 cursor-none overflow-hidden magnetic-trigger">
        <div className="absolute inset-0 bg-gold-dust/10 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-platinum group-hover:text-gold-dust transition-colors relative z-10">
            <path d="m12 19-7-7 7-7"></path>
            <path d="M19 12H5"></path>
        </svg>
        <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-platinum group-hover:text-gold-dust font-bold relative z-10 transition-colors">
          System Return
        </span>
      </Link>

      {/* UI: CONTROLE DE ÁUDIO */}
      <div onClick={toggleAudio} className="fixed bottom-8 right-8 z-50 flex items-center gap-3 cursor-none mix-blend-difference group magnetic-trigger">
        <span className={`font-sans text-[10px] uppercase tracking-widest transition-colors ${isPlaying ? "text-gold-dust" : "text-platinum"}`}>
          {isPlaying ? "SOUND :: ON" : "SOUND :: OFF"}
        </span>
        {/* Equalizador Animado */}
        <div className={`flex items-end h-5 gap-[2px] ${!isPlaying ? "opacity-50" : ""}`}>
          <div className={`w-[3px] bg-gold-dust animate-pulse ${isPlaying ? "h-3" : "h-[2px]"}`} style={{ animationDuration: "0.5s" }} />
          <div className={`w-[3px] bg-gold-dust animate-pulse ${isPlaying ? "h-5" : "h-[2px]"}`} style={{ animationDuration: "0.7s" }} />
          <div className={`w-[3px] bg-gold-dust animate-pulse ${isPlaying ? "h-2" : "h-[2px]"}`} style={{ animationDuration: "0.4s" }} />
          <div className={`w-[3px] bg-gold-dust animate-pulse ${isPlaying ? "h-4" : "h-[2px]"}`} style={{ animationDuration: "0.6s" }} />
        </div>
      </div>

      {/* UI: LAUNCH PROTOCOL */}
      <nav className="fixed w-full z-50 px-8 py-8 flex justify-end items-center mix-blend-exclusion pointer-events-none">
        <a href="https://www.instagram.com/blacklink.co" target="_blank" className="text-[10px] uppercase tracking-[0.3em] font-sans border border-white/20 px-6 py-3 rounded-full hover:bg-gold-dust hover:text-void transition-all duration-500 pointer-events-auto cursor-none magnetic-trigger">
            Launch Protocol
        </a>
      </nav>

      {/* --- SEÇÃO HERO --- */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/ph7/hero.jpg"
            alt="PH7 Atmosphere"
            fill
            className="object-cover opacity-50 scale-110"
            data-speed="0.5"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" />
        </div>

        <div className="relative z-10 text-center skew-elem">
          <div className="overflow-hidden mb-2">
            <span className="animate-text-reveal font-sans text-platinum text-xs md:text-sm uppercase tracking-[0.4em] border border-white/10 inline-block px-4 py-1 rounded-full bg-void/50 backdrop-blur-sm">
              20.12.2025
            </span>
          </div>
          <div className="overflow-hidden mb-4">
            <p className="animate-text-reveal font-sans text-gold-dust text-[10px] uppercase tracking-[0.6em] font-bold">
              PRE_SAVE :: NOW
            </p>
          </div>
          <h1 className="font-serif text-[15vw] leading-[0.8] text-platinum mix-blend-overlay uppercase tracking-tighter">
            <div className="overflow-hidden"><span className="animate-title-up block">PH-VZ1</span></div>
            <div className="overflow-hidden">
              <span className="animate-title-up block italic text-gold-dust font-light text-[5vw] tracking-normal mt-4">
                PH7 feat. Kauan Costa
              </span>
            </div>
          </h1>
        </div>
      </section>

      {/* --- SEÇÃO QUOTE --- */}
      <section className="py-40 px-6 md:px-20 bg-void relative z-10 flex items-center justify-center min-h-[50vh]">
        <p className="font-serif text-2xl md:text-5xl leading-[1.3] text-zinc-500 max-w-6xl mx-auto skew-elem text-center">
          "A tensão sonora não é um movimento no espaço, mas uma <span className="text-platinum">expansão do espírito</span>."
        </p>
      </section>

      {/* --- SEÇÃO TEASER 1 --- */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden border-y border-white/5 group">
        <div className="absolute inset-0 z-0">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-40 group-hover:opacity-80 transition-opacity duration-1000 scale-105" data-speed="0.3">
            <source src="/assets/ph7/teaser1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-void/20" />
        </div>
        <div className="relative z-10 text-center mix-blend-overlay">
          <h2 className="font-serif text-[10vw] text-platinum leading-none tracking-tighter skew-elem">ATMOSFERA</h2>
          <p className="font-sans text-xs text-gold-dust uppercase tracking-[1em] mt-4 font-bold">Raw_Material_01</p>
        </div>
      </section>

      {/* --- SEÇÃO PRE-SAVE --- */}
      <section className="relative h-screen w-full flex flex-col justify-center items-center bg-void z-10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/ph7/capa.png"
            alt="Capa Single"
            fill
            className="object-cover opacity-60 scale-110 blur-sm"
            data-speed="0.4"
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        
        <div className="relative z-10 text-center">
          <a href="https://distrokid.com/hyperfollow/ph72/ph-vz1-feat-kauan-costa" target="_blank" className="magnetic-trigger group relative flex flex-col items-center justify-center p-12 md:p-24 transition-transform hover:scale-105 cursor-none">
            <div className="absolute inset-0 bg-gold-dust blur-[100px] opacity-0 group-hover:opacity-30 transition-opacity duration-700 rounded-full" />
            <h2 className="font-serif text-[12vw] leading-none text-platinum group-hover:text-gold-dust transition-colors duration-500 mix-blend-overlay">
              PRE-SAVE
            </h2>
            <div className="mt-10 flex items-center gap-3 border border-white/30 px-8 py-3 rounded-full group-hover:bg-gold-dust group-hover:border-gold-dust group-hover:text-void transition-all duration-500 bg-black/50 backdrop-blur-md">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs uppercase tracking-widest font-sans font-bold">Acessar Distrokid</span>
            </div>
          </a>
        </div>
      </section>

      {/* --- SEÇÃO TEASER 2 --- */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden border-t border-white/5 group">
        <div className="absolute inset-0 z-0">
          <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-40 group-hover:opacity-80 transition-opacity duration-1000 scale-105" data-speed="0.2">
            <source src="/assets/ph7/teaser2.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="relative z-10 text-center">
          <h2 className="font-serif text-[8vw] text-transparent leading-none tracking-tighter skew-elem" style={{ WebkitTextStroke: "1px #E5E4E2" }}>
            POTÊNCIA
          </h2>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-zinc-950 py-10 px-6 md:px-20 border-t border-white/10 relative z-10">
        <div className="flex justify-between items-end">
          <div>
            <p className="font-serif text-xl text-platinum">BLACK LINK.</p>
            <p className="font-sans text-[10px] text-gray-500 uppercase tracking-widest mt-1">© 2025</p>
          </div>
          <div className="text-right">
            <a href="https://wa.me/5511988053899" className="text-[10px] uppercase text-gray-500 hover:text-white transition-colors cursor-none magnetic-trigger">Contato</a>
          </div>
        </div>
      </footer>

    </div>
  );
}