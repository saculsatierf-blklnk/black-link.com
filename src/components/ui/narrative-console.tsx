"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useSovereign } from "@/components/providers/sovereign-provider";

export function NarrativeConsole() {
  const { isPreloaderDone, consoleData } = useSovereign();

  if (!consoleData) return null;

  return (
    <motion.div
      layout
      transition={{ ease: [0.23, 1, 0.32, 1], duration: 1.2 }}
      className={`fixed z-[1000] pointer-events-none flex flex-col justify-center border border-white/10 overflow-hidden shadow-2xl bg-white/[0.03] ${
        isPreloaderDone
          ? "bottom-8 right-6 md:right-12 left-6 md:left-auto w-auto max-w-[calc(100vw-3rem)] md:max-w-[400px] rounded-[2.5rem] pointer-events-auto"
          : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:max-w-[540px] text-center rounded-[2.5rem] pointer-events-auto"
      }`}
      style={{
        backdropFilter: 'blur(60px) saturate(180%)',
        WebkitBackdropFilter: 'blur(60px) saturate(180%)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
      }}
    >
      <div className={`transition-all duration-700 w-full ${isPreloaderDone ? 'px-8 py-6 md:px-10 md:py-8' : 'px-10 py-12 md:px-16 md:py-16'}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={consoleData.description}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className={`flex flex-col gap-3 w-full justify-center ${isPreloaderDone ? 'items-start' : 'items-center'}`}
          >
            <p className={`${
              isPreloaderDone 
                ? "font-sans antialiased text-[14px] md:text-[15px] text-zinc-100 font-normal leading-relaxed tracking-tight" 
                : "font-serif antialiased text-2xl md:text-3xl text-white uppercase tracking-tight leading-[1.3] font-medium"
            }`}>
              {consoleData.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
