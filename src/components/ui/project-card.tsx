"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface ProjectCardProps {
  title: string;
  description: string;
  metrics: string;
  span: number; // 8 for destaque, 4 for suporte
}

export function ProjectCard({ title, description, metrics, span }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const content = contentRef.current;

    if (!card || !content) return;

    // Hover effect setup
    const handleMouseEnter = () => {
      gsap.to(card, {
        borderColor: "rgba(255, 255, 255, 0.3)",
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(content, {
        y: -10,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        borderColor: "rgba(255, 255, 255, 0.1)",
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(content, {
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative col-span-1 md:col-span-${span} bg-[#111111]/90 border border-white/10 rounded-lg p-6 md:p-8 group cursor-pointer transition-all duration-300 transform-gpu`}
    >
      <div ref={contentRef} className="relative z-10">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight">
          {title}
        </h3>
        <p className="text-zinc-400 text-sm md:text-base leading-relaxed mb-6">
          {description}
        </p>
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 border-t border-white/5">
          <div className="text-xs md:text-sm text-zinc-500 uppercase tracking-wider font-medium">
            Performance Metrics
          </div>
          <div className="text-sm md:text-base text-white font-semibold mt-1">
            {metrics}
          </div>
        </div>
      </div>
    </div>
  );
}