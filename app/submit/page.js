"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import SolutionHero from "@/components/SolutionHero";
import SolutionSidebar from "@/components/SolutionSidebar";
import SubmitSolutionForm from "@/components/SubmitSolutionForm";
import { Menu } from "lucide-react";

export default function SubmitPage() {
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

          {/* Submit Form Section */}
          <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-4xl font-bold text-quantum-cyan mb-6">
              Submit Your Solution
            </h1>
            <p className="text-gray-300 mb-8">
              Have a quantum computing solution that&apos;s not yet in our
              directory? Fill out this form to submit your solution for review
              and inclusion.
            </p>
            <SubmitSolutionForm />
          </div>
        </div>
      </div>
    </div>
  );
}
