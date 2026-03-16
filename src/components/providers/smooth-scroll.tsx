"use client";

import { ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  // Desativado a pedido do cliente para teste de performance via scroll nativo
  return (
    <div className="w-full min-h-screen">
      {children}
    </div>
  );
}