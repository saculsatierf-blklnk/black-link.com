"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface EngineContextType {
  isEngineReady: boolean;
  setEngineReady: (status: boolean) => void;
}

const EngineContext = createContext<EngineContextType>({
  isEngineReady: false,
  setEngineReady: () => {},
});

export function EngineProvider({ children }: { children: ReactNode }) {
  const [isEngineReady, setEngineReady] = useState(false);

  return (
    <EngineContext.Provider value={{ isEngineReady, setEngineReady }}>
      {children}
    </EngineContext.Provider>
  );
}

export function useEngine() {
  return useContext(EngineContext);
}