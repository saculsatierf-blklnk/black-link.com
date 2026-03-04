"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useEngine } from "@/components/providers/engine-provider";

function GenesisWeave({ isMobile, triggerTransition }: { isMobile: boolean; triggerTransition: boolean }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const particleCount = isMobile ? 80 : 200;

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = [] as { speed: number; offset: number }[];

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      vel.push({
        speed: 0.005 + Math.random() * 0.01,
        offset: Math.random() * Math.PI * 2,
      });
    }

    return [pos, vel] as const;
  }, [particleCount]);

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const maxPositions = new Float32Array(particleCount * 2 * 3);
    geometry.setAttribute("position", new THREE.BufferAttribute(maxPositions, 3));
    return geometry;
  }, [particleCount]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (coreRef.current) {
      coreRef.current.rotation.y += 0.005;
      coreRef.current.rotation.z += 0.002;

      if (!triggerTransition) {
        const scale = 1 + Math.sin(time) * 0.1;
        coreRef.current.scale.setScalar(scale);
      } else {
        const targetScale = new THREE.Vector3(60, 60, 60);
        coreRef.current.scale.lerp(targetScale, 0.04);
        
        const material = coreRef.current.material as THREE.MeshBasicMaterial;
        material.opacity = THREE.MathUtils.lerp(material.opacity, 0, 0.05);
      }
    }

    if (pointsRef.current && linesRef.current) {
      const positionsAttribute = pointsRef.current.geometry.attributes.position;
      const currentPositions = positionsAttribute.array as Float32Array;
      const linePositions = linesRef.current.geometry.attributes.position.array as Float32Array;
      let lineVertexIndex = 0;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const v = velocities[i];

        currentPositions[i3] += Math.sin(time * v.speed + v.offset) * 0.02;
        currentPositions[i3 + 1] += Math.cos(time * v.speed + v.offset) * 0.02;

        const distSq =
          currentPositions[i3] ** 2 +
          currentPositions[i3 + 1] ** 2 +
          currentPositions[i3 + 2] ** 2;

        if (distSq < 9) {
          linePositions[lineVertexIndex++] = currentPositions[i3];
          linePositions[lineVertexIndex++] = currentPositions[i3 + 1];
          linePositions[lineVertexIndex++] = currentPositions[i3 + 2];

          linePositions[lineVertexIndex++] = 0;
          linePositions[lineVertexIndex++] = 0;
          linePositions[lineVertexIndex++] = 0;
        }
      }

      positionsAttribute.needsUpdate = true;
      linesRef.current.geometry.setDrawRange(0, lineVertexIndex / 3);
      linesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color={0xE5E4E2} wireframe={true} transparent={true} opacity={0.3} />
      </mesh>

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} array={positions} itemSize={3} count={particleCount} />
        </bufferGeometry>
        <pointsMaterial color={0xC5A059} size={isMobile ? 0.08 : 0.05} transparent opacity={0.8} />
      </points>

      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color={0xC5A059} transparent={true} opacity={0.15} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  );
}

function SceneSetup({ isMobile }: { isMobile: boolean }) {
  const { gl, camera, size } = useThree();

  useEffect(() => {
    gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const aspect = size.width / size.height;

    if (aspect < 1) {
      (camera as THREE.PerspectiveCamera).fov = 85;
      camera.position.set(0, 0, 12);
    } else {
      (camera as THREE.PerspectiveCamera).fov = 50;
      camera.position.set(0, 0, 6);
    }

    camera.updateProjectionMatrix();
    camera.lookAt(0, 0, 0);
  }, [isMobile, gl, camera, size]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (!isMobile) {
      camera.position.x = Math.sin(time * 0.5) * 0.2;
      camera.position.y = Math.cos(time * 0.5) * 0.2;
    } else {
      camera.position.x = 0;
      camera.position.y = 0;
    }

    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function Preloader() {
  const isMobile = useIsMobile();
  const [triggerTransition, setTriggerTransition] = useState(false);
  const [textHidden, setTextHidden] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const { setEngineReady } = useEngine();

  useEffect(() => {
    // remove intro copy slightly before particle transition
    const hideTextTimer = setTimeout(() => {
      setTextHidden(true);
    }, 300);

    const timer = setTimeout(() => {
      setTriggerTransition(true);
    }, 400);

    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1200);

    const cleanup = setTimeout(() => {
      setEngineReady(true);
      setShouldRender(false);
    }, 1800);

    return () => {
      clearTimeout(hideTextTimer);
      clearTimeout(timer);
      clearTimeout(fadeOutTimer);
      clearTimeout(cleanup);
    };
  }, [setEngineReady]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#000000] w-screen h-[100dvh] flex items-center justify-center overflow-hidden touch-none transition-opacity duration-700 ease-in-out ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <Canvas
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        className="block w-full h-full"
      >
        <color attach="background" args={["#000000"]} />
        <SceneSetup isMobile={!!isMobile} />

        <group position={[0, 0, 0]}>
          <GenesisWeave isMobile={!!isMobile} triggerTransition={triggerTransition} />
        </group>
      </Canvas>

      <div
        className={`absolute bottom-[10dvh] left-0 w-full text-center px-4 pointer-events-none transition-opacity duration-500 ${
          textHidden ? "opacity-0" : "opacity-50"
        }`}
      >
        <p className="text-[#E5E4E2] text-[10px] tracking-[6px] uppercase font-sans">
          Definindo visão.
        </p>
      </div>
    </div>
  );
}