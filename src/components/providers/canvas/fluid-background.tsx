"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// --- VERTEX SHADER ---
// Mapeia a geometria diretamente para o Clip Space (Tela Cheia), ignorando a câmera.
// Isso garante que o fundo seja estático e performático.
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    // Posição direta (-1 a 1) preenche a tela inteira
    gl_Position = vec4(position, 1.0);
  }
`;

// --- FRAGMENT SHADER (THE VOID PHYSICS) ---
// Algoritmo FBM (Fractal Brownian Motion) modificado para simular óleo digital.
const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  varying vec2 vUv;

  // Randômico pseudo-determinístico
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  // Ruído 2D Suave
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  // Fractal Brownian Motion (Ondas sobrepostas)
  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    // 5 oitavas para detalhe extra (Industrial Grunge)
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(st);
      st *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    // Normalização de coordenadas
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 st_corrected = st * aspect;
    vec2 mouse_corrected = uMouse * aspect;

    // --- INTERAÇÃO (GRAVITY WELL) ---
    // Cria uma distorção gravitacional onde o mouse passa
    float dist = distance(st_corrected, mouse_corrected);
    float influence = smoothstep(0.5, 0.0, dist); 

    // --- DOMAIN WARPING (A Mágica do Fluido) ---
    vec2 q = vec2(0.);
    q.x = fbm(st + 0.02 * uTime); // Movimento base lento
    q.y = fbm(st + vec2(1.0));

    vec2 r = vec2(0.);
    // O mouse adiciona "caos" à distorção (influence * 2.0)
    r.x = fbm(st + 1.0 * q + vec2(1.7, 9.2) + 0.10 * uTime + (influence * 0.8)); 
    r.y = fbm(st + 1.0 * q + vec2(8.3, 2.8) + 0.08 * uTime - (influence * 0.8));

    float f = fbm(st + r);

    // --- PALETA BLACK LINK (NOIR) ---
    // Base: Void (#020202) -> Highlight: Carbon (#0A0A0A)
    // O mix é muito sutil para não distrair o usuário do conteúdo
    vec3 colorBase = vec3(0.008, 0.008, 0.008); // Quase preto absoluto
    vec3 colorHigh = vec3(0.08, 0.08, 0.09);    // Cinza chumbo profundo

    // Mistura baseada no ruído (f) com contraste acentuado (pow)
    vec3 color = mix(colorBase, colorHigh, pow(f, 3.0));
    
    // --- TEXTURA INDUSTRIAL (FILM GRAIN) ---
    // Adiciona realidade tátil
    float grain = (random(st * uTime) - 0.5) * 0.05;
    color += grain;

    // Vinheta sutil para focar no centro
    float vignette = 1.0 - smoothstep(0.5, 1.5, length(st - 0.5));
    color *= vignette;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export function FluidBackground() {
  const mesh = useRef<THREE.Mesh>(null);
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));

  // Otimização: Uniforms estáveis
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    []
  );

  // Listener de Mouse Nativo (Fora do React Cycle para performance)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = 1.0 - (e.clientY / window.innerHeight); // Inverter Y para WebGL
      mouse.current.set(x, y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Loop de Renderização (60/120 FPS)
  useFrame((state) => {
    const { clock, size } = state;
    if (mesh.current) {
      const material = mesh.current.material as THREE.ShaderMaterial;
      
      // Atualiza Tempo e Resolução
      material.uniforms.uTime.value = clock.getElapsedTime();
      material.uniforms.uResolution.value.set(size.width, size.height);
      
      // Física de Mouse com Inércia (Lerp)
      // Faz o fluido parecer "pesado" e viscoso
      const targetX = mouse.current.x;
      const targetY = mouse.current.y;
      const currentUniform = material.uniforms.uMouse.value;
      
      currentUniform.x += (targetX - currentUniform.x) * 0.05; // 0.05 = Alta viscosidade
      currentUniform.y += (targetY - currentUniform.y) * 0.05;
    }
  });

  return (
    <mesh ref={mesh} frustumCulled={false}>
      {/* Geometria 2x2 cobre o clip space de -1 a 1 */}
      <planeGeometry args={[2, 2]} /> 
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={false}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}