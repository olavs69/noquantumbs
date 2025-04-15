"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import SolutionHero from "@/components/SolutionHero";
import SolutionSidebar from "@/components/SolutionSidebar";
import { Menu, ArrowRight } from "lucide-react";
import Image from "next/image";

const CommunityPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-quantum-dark text-white">
      <Navbar />

      {/* Mobile sidebar toggle */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-20 left-4 z-50 bg-quantum-darker/80 p-2 rounded-md border border-quantum-blue/30 text-quantum-cyan"
        >
          <Menu size={20} />
        </button>
      )}

      {/* Sidebar (hidden on mobile unless toggled) */}
      <SolutionSidebar
        className={`transition-transform duration-300 z-40 ${
          isMobile
            ? isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        }`}
      />

      {/* Main content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen && !isMobile ? "pl-[250px]" : "pl-0"
        }`}
      >
        <div className="pt-16 relative">
          {/* Dark overlay when mobile sidebar is open */}
          {isMobile && isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/70 z-30"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          <SolutionHero />

          {/* Discord Community Section */}
          <section className="max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="bg-quantum-darker rounded-xl overflow-hidden border border-quantum-blue/30">
              <div className="grid md:grid-cols-2 gap-8 p-8">
                <div className="flex flex-col justify-center">
                  <h2 className="text-3xl font-bold text-quantum-cyan mb-4">
                    Join Our Discord Community
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Connect with quantum enthusiasts, get support, and stay
                    updated on the latest developments in our active Discord
                    community.
                  </p>
                  <div className="space-y-4">
                    <a
                      href="https://discord.gg/qwH7fKnc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-[#5865F2] hover:bg-[#4752c4] transition-colors text-white font-medium px-6 py-3 rounded-md"
                    >
                      Join Discord Server{" "}
                      <ArrowRight
                        className="ml-2"
                        size={18}
                      />
                    </a>
                    <p className="text-sm text-gray-400">
                      Scan the QR code with your mobile device to join
                      instantly.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="bg-white p-4 rounded-lg">
                    <Image
                      src="/qr200.png"
                      alt="Discord QR Code"
                      width={200}
                      height={200}
                      className="rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
