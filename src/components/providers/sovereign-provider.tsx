"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface ConsoleData {
  title: string;
  description: string;
  link?: string;
}

interface SovereignContextType {
  idName: string | null;
  setIdName: (name: string | null) => void;
  isPreloaderDone: boolean;
  setIsPreloaderDone: (status: boolean) => void;
  consoleData: ConsoleData | null;
  setConsoleData: (data: ConsoleData | null) => void;
}

const SovereignContext = createContext<SovereignContextType>({
  idName: null,
  setIdName: () => {},
  isPreloaderDone: false,
  setIsPreloaderDone: () => {},
  consoleData: null,
  setConsoleData: () => {},
});

export function SovereignProvider({ children }: { children: ReactNode }) {
  const [idName, setIdName] = useState<string | null>(null);
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const [consoleData, setConsoleData] = useState<ConsoleData | null>(null);

  return (
    <SovereignContext.Provider value={{ idName, setIdName, isPreloaderDone, setIsPreloaderDone, consoleData, setConsoleData }}>
      {children}
    </SovereignContext.Provider>
  );
}

export function useSovereign() {
  return useContext(SovereignContext);
}
