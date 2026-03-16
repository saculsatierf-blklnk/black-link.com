"use client";

import React, { useState, useEffect } from "react";

export default function ProdBrgaPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const targetDate = new Date("2026-04-04T00:00:00").getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#000000] text-white flex flex-col justify-center items-center overflow-hidden">
      
      {/* Container Principal */}
      <div className="flex flex-col items-center justify-center z-10 space-y-8">
        
        {/* Texto Acima */}
        <h1 className="text-white/40 text-xs md:text-sm tracking-[0.3em] font-sans font-light uppercase">
          PROD.BRGA.
        </h1>

        {/* Contador */}
        <div className="text-3xl md:text-5xl lg:text-7xl font-sans font-thin tabular-nums tracking-widest text-white/90">
          {timeLeft.days} : {timeLeft.hours} : {timeLeft.minutes} : {timeLeft.seconds}
        </div>

        {/* Texto Abaixo */}
        <h2 className="text-white/40 text-[10px] md:text-xs tracking-[0.4em] font-sans font-light uppercase">
          PRÓXIMO LANÇAMENTO ARTÍSTICO.
        </h2>

      </div>

      {/* Linha Horizontal Animada em Loop */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2 overflow-hidden opacity-20 pointer-events-none">
        <div className="w-[200%] h-full bg-gradient-to-r from-transparent via-white to-transparent animate-scan"></div>
      </div>
      
      <style jsx>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(50%); }
        }
        .animate-scan {
          animation: scan 10s linear infinite;
        }
      `}</style>
    </div>
  );
}
