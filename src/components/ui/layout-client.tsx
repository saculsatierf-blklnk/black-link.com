"use client";

import { ReactNode, useState } from "react";
import Preloader from "./preloader";
import { GrainOverlay } from "./grain-overlay";
import GlobalCanvas from "../providers/canvas/scene";
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
      <GrainOverlay />
      <GlobalCanvas menuOpen={menuOpen} />

      <SmoothScroll>
        <Navbar isOpen={menuOpen} setIsOpen={setMenuOpen} />
        <main className="relative z-10 w-full min-h-screen flex flex-col">
          {children}
        </main>
      </SmoothScroll>
    </>
  );
}
