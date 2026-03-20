import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

// Importa apenas o CSS original da ferramenta
import "./protocolo/protocolo.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Protocolo",
  description: "Ferramenta de Protocolo",
};

export default function ProtocoloLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={montserrat.className}>
      <body className="antialiased m-0 p-0 overflow-x-hidden w-full max-w-none bg-[var(--bg-base)] text-[var(--text-main)] transition-colors duration-1000">
        {children}
      </body>
    </html>
  );
}
