import type { Metadata } from "next";
import { Cinzel, Manrope } from "next/font/google";
import "../global.css";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-cinzel" });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-manrope" });

export const metadata: Metadata = {
  title: "Ação Concluída | BLACK LINK"
};

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${cinzel.variable}`}>
      <body className="font-sans antialiased bg-[#000] text-white overflow-hidden m-0 p-0">
        {children}
      </body>
    </html>
  );
}
