import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // --- 1. PERFORMANCE VISUAL (Image Optimization) ---
  images: {
    // Prioriza o formato AVIF para manter a qualidade dos gradientes e tons de preto (Noir)
    // Fallback para WebP garantindo alta compatibilidade.
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
      {
        protocol: 'https',
        hostname: 'lrusivgaeyvgxtljkfct.supabase.co', // Domínio Supabase (Ativos de Hospedagem)
        port: '',
        pathname: '/**',
      },
    ],
  },

  // --- 2. CORE ENGINEERING (Build & Runtime) ---
  reactStrictMode: true, // Modo estrito para detecção de vazamentos de memória (hooks)
  compress: true,        // Explicitamente ativo para comprimir o payload no servidor (TTFB reduzido)
  poweredByHeader: false, // Segurança: Remove assinatura "X-Powered-By: Next.js"
  
  // --- 3. HIGIENE DE PRODUÇÃO ---
  compiler: {
    // Remove qualquer rastro de debug no produto final
    removeConsole: process.env.NODE_ENV === "production",
  },
  
  // --- 4. ECOSYSTEM COMPATIBILITY (GSAP & R3F) ---
  // Garante que módulos ESM/CJS complexos sejam transpilados corretamente
  transpilePackages: ['gsap', '@gsap/react', 'three', '@react-three/fiber', '@react-three/drei'],

  // --- 5. EXPERIMENTAL FLAGS (Se necessário para App Router avançado) ---
  experimental: {
    // optimizePackageImports: ['lucide-react', 'date-fns'], // Otimização de Tree-shaking se usar libs grandes
    // serverActions: {
    //   bodySizeLimit: '2mb', // Limite para uploads via Server Actions
    // },
  },
};

export default nextConfig;