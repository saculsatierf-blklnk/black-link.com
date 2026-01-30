export function GrainOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[9998] opacity-[0.06] mix-blend-overlay w-full h-full select-none">
      <svg className="h-full w-full">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            // 0.65 cria um grão mais "cinematográfico/analógico" que o 0.8 (muito digital)
            baseFrequency="0.65" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
        </filter>
        {/* Retângulo preenche a tela com o filtro aplicado */}
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}