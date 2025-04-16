"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
//import Applications from "@/components/Applications";
import CallToAction from "@/components/CallToAction";
import { initScrollReveal } from "@/utils/scrollAnimation";
import CodeCheck from "@/components/CodeCheck";
import { ModalProvider } from "@/components/ui/animated-modal";

export default function Home() {
  useEffect(() => {
    // Initialize scroll reveal animations
    const cleanupScroll = initScrollReveal();
    document.title = "NoQuantumBS - Cutting Through Quantum Computing Hype";

    // Load Voiceflow chat widget
    (function (d, t) {
      var v = d.createElement(t),
        s = d.getElementsByTagName(t)[0];
      v.onload = function () {
        window.voiceflow.chat.load({
          verify: { projectID: "67ff5159c11ab40f19e70467" },
          url: "https://general-runtime.voiceflow.com",
          versionID: "production",
          voice: {
            url: "https://runtime-api.voiceflow.com",
          },
        });
      };
      v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
      v.type = "text/javascript";
      s.parentNode.insertBefore(v, s);
    })(document, "script");

    // Cleanup function for scroll reveal
    return cleanupScroll;
  }, []);

  return (
    <div className="min-h-screen bg-quantum-dark text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <ModalProvider>
        <CodeCheck />
      </ModalProvider>
      {/*   <Applications /> */}
      <CallToAction />
    </div>
  );
}
