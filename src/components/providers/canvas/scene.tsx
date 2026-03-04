"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { FluidBackground } from "./fluid-background";

interface GlobalCanvasProps {
  menuOpen: boolean;
}

function GlobalCanvas({ menuOpen }: GlobalCanvasProps) {
  const [dprRange, setDprRange] = useState<[number, number]>([1, 1.5]);

  useEffect(() => {
    // during menu transitions we pin DPR to 1 to free CPU
    setDprRange(menuOpen ? [1, 1] : [1, 1.5]);
  }, [menuOpen]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full bg-void">
      <Canvas
        className="w-full h-full"
        // Otimização Extrema para Shaders 2D
        gl={{ 
          antialias: false,        // Desnecessário para fluidos/fumaça
          powerPreference: "high-performance",
          alpha: false,            // Fundo opaco (performance boost)
          stencil: false,          // Buffer desnecessário
          depth: false,            // Shader roda em Screen Space (clip space)
          preserveDrawingBuffer: false
        }}
        // Câmera Ortopédica garante que não haja distorção de perspectiva no shader
        camera={{ position: [0, 0, 1], fov: 75, near: 0.1, far: 1000 }}
        // Ajustável para transições de menu
        dpr={dprRange}
        // Desativa Tone Mapping para cores exatas do Shader (Hex #020202 real)
        flat 
        linear
      >
        <Suspense fallback={null}>
          <FluidBackground />
          <Preload all /> 
        </Suspense>
      </Canvas>
    </div>
  );
}

export default React.memo(GlobalCanvas);