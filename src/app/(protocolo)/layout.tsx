import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Link from "next/link";

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
      <body className="antialiased m-0 p-0 overflow-x-hidden w-full max-w-none bg-[var(--bg-base)] text-[var(--text-main)] transition-colors duration-1000 relative">
        <Link 
          href="/" 
          className="fixed top-6 left-6 md:top-8 md:left-8 z-[9999] font-sans text-xs tracking-widest text-white opacity-40 hover:opacity-100 transition-all duration-500 pointer-events-auto uppercase px-3 py-2 -ml-3 -mt-2 rounded-lg"
          style={{ backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
        >
          BLACK LINK
        </Link>
        {children}
      </body>
    </html>
  );
}
