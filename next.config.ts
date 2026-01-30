import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // --- 1. PERFORMANCE VISUAL (Image Optimization) ---
  images: {
    // Prioriza formatos de nova geração para reduzir payload das texturas
    formats: ['image/avif', 'image/webp'],
    
    // Configurações de Cache e Domínios
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      // Adicionar aqui domínios futuros (ex: CDN próprio, S3)
    ],
  },

  // --- 2. CORE ENGINEERING (Build & Runtime) ---
  reactStrictMode: true, // Modo estrito para detecção de vazamentos de memória (hooks)
  compress: true,        // Compressão Gzip/Brotli ativa no servidor Edge
  poweredByHeader: false, // Segurança: Remove assinatura "X-Powered-By: Next.js"
  
  // --- 3. ECOSYSTEM COMPATIBILITY (GSAP & R3F) ---
  // Garante que módulos ESM/CJS complexos sejam transpilados corretamente
  transpilePackages: ['gsap', '@gsap/react', 'three', '@react-three/fiber', '@react-three/drei'],

  // --- 4. EXPERIMENTAL FLAGS (Se necessário para App Router avançado) ---
  experimental: {
    // optimizePackageImports: ['lucide-react', 'date-fns'], // Otimização de Tree-shaking se usar libs grandes
    // serverActions: {
    //   bodySizeLimit: '2mb', // Limite para uploads via Server Actions
    // },
  },
};

export default nextConfig;