"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSovereign } from "@/components/providers/sovereign-provider";

export function NarrativeConsole() {
  const { isPreloaderDone, consoleData } = useSovereign();

  if (!consoleData) return null;

  return (
    <div className="fixed z-[9999] pointer-events-none flex items-center justify-center">
      {/* Halo Layer (Aura de Luz) */}
      <motion.div
        layout
        transition={{ ease: [0.23, 1, 0.32, 1], duration: 1.2 }}
        className={`fixed z-[-1] bg-white/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen opacity-60 ${
          isPreloaderDone
            ? "bottom-8 right-6 md:right-12 w-[300px] h-[100px]"
            : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[150px]"
        }`}
      />

      {/* Main Console Container */}
      <motion.div
        layout
        initial={{ opacity: 0.8 }}
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ 
          layout: { ease: [0.23, 1, 0.32, 1], duration: 1.2 },
          opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        className={`fixed z-[9999] pointer-events-none flex flex-col justify-center border-[0.5px] border-white/20 overflow-hidden bg-white/[0.08] before:absolute before:inset-0 before:rounded-full before:border-t-[1px] before:border-white/40 before:pointer-events-none ${
          isPreloaderDone
            ? "bottom-8 right-6 md:right-12 left-6 md:left-auto w-fit max-w-[90vw] md:max-w-fit rounded-full pointer-events-auto"
            : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit max-w-[90vw] text-center rounded-full pointer-events-auto"
        }`}
        style={{
          backdropFilter: 'blur(64px) saturate(200%) brightness(1.2)',
          WebkitBackdropFilter: 'blur(64px) saturate(200%) brightness(1.2)',
          boxShadow: '0 10px 40px -10px rgba(0,0,0,0.5)'
        }}
      >
        <div className="transition-all duration-700 w-full px-12 py-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={consoleData.description}
              initial={{ opacity: 0.2, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="flex flex-col w-full justify-center items-center"
            >
              <p className="font-sans antialiased text-[10px] text-white font-semibold tracking-[0.3em] uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                {consoleData.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
