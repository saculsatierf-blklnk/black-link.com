"use client";

import { ReactNode, useState } from "react";

import dynamic from "next/dynamic";

const GlobalCanvas = dynamic(() => import("../providers/canvas/scene"), {
  ssr: false,
});
const Preloader = dynamic(() => import("./preloader"), {
  ssr: false,
});
import { Navbar } from "./navbar";
import { SmoothScroll } from "../providers/smooth-scroll";

interface LayoutClientProps {
  children: ReactNode;
}

export default function LayoutClient({ children }: LayoutClientProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Preloader />
      <GlobalCanvas menuOpen={menuOpen} />

      <SmoothScroll>
        <Navbar isOpen={menuOpen} setIsOpen={setMenuOpen} />
        <main className="relative z-10 w-full min-h-screen flex flex-col max-w-[1440px] mx-auto">
          {children}
        </main>
      </SmoothScroll>
    </>
  );
}
