"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function RotatingKnot() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.35, 128, 128, 1, 3]} />
        
        {/* MATERIAL METAL PURO
            - Metalness 1.0: Metal total.
            - Roughness 0.15: O desfoque natural do material (não do ambiente).
            - Color White: Base neutra para reflexos.
        */}
        <meshStandardMaterial 
          color="#ffffff"
          metalness={1.0}
          roughness={0.15}
        />
      </mesh>
    </Float>
  );
}

export function TorusLogo() {
  return (
    // 'pointer-events-none' garante que o usuário possa clicar nas coisas atrás (se houver botões)
    // 'z-10' (opcional) garante que fique na frente das estrelas, mas com fundo transparente
    <div className="fixed inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }} // alpha: true é CRUCIAL para ver as estrelas atrás
      >
        {/* ILUMINAÇÃO
           - preset="city": Dá o contraste preto/branco do metal.
           - background={false}: Garante que o Environment não pinte o fundo, mantendo a transparência.
        */}
        <Environment preset="city" background={false} />

        {/* Luz de recorte para destacar as bordas */}
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={10} 
          castShadow 
        />

        <RotatingKnot />
      </Canvas>
    </div>
  );
}