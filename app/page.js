"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
//import Applications from "@/components/Applications";
import CallToAction from "@/components/CallToAction";
import { initScrollReveal } from "@/utils/scrollAnimation";
import CodeCheck from "@/components/CodeCheck";
export default function Home() {
  useEffect(() => {
    // Initialize scroll reveal animations
    const cleanup = initScrollReveal();
    document.title = "NoQuantumBS - Cutting Through Quantum Computing Hype";
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen bg-quantum-dark text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <CodeCheck />
      {/*   <Applications /> */}
      <CallToAction />
    </div>
  );
}
