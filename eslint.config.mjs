import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Compatibilidade para estender configurações legadas do Next.js
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // 1. Pilares Base (Next Core & TypeScript)
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 2. Regras de "Código Soberano" (BLACK LINK Standards)
  {
    rules: {
      // Silêncio é o luxo supremo. Logs em produção são ruído.
      "no-console": ["warn", { allow: ["warn", "error"] }],
      
      // Tipagem precisa. "Any" é falha de arquitetura.
      "@typescript-eslint/no-explicit-any": "warn",
      
      // Código limpo. Variáveis mortas são eliminadas.
      "@typescript-eslint/no-unused-vars": ["warn", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_" 
      }],
      
      // Performance de rendering (Imagens otimizadas)
      "@next/next/no-img-element": "error"
    },
  },

  // 3. Zonas de Exclusão (Ignores)
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      "node_modules/**",
      "next-env.d.ts"
    ],
  },
];

export default eslintConfig;