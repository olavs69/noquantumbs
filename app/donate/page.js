"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import SolutionSidebar from "@/components/SolutionSidebar";
import { Zap, Heart, ExternalLink, Check } from "lucide-react";
import { initScrollReveal } from "@/utils/scrollAnimation";

const DonatePage = () => {
  useEffect(() => {
    // Initialize scroll reveal animations
    const cleanupScroll = initScrollReveal();
    document.title = "Donate & Support - NoQuantumBS";

    // Cleanup function
    return () => {
      cleanupScroll();
    };
  }, []);

  return (
    <div className="min-h-screen bg-quantum-dark text-white">
      <Navbar />
      <div className="flex max-w-screen overflow-hidden">
        {/* Sidebar - hidden on mobile, shown on desktop */}
        <div className="hidden lg:block lg:w-[280px] flex-shrink-0">
          <SolutionSidebar />
        </div>

        {/* Main content area */}
        <div className="flex-grow w-full max-w-full overflow-x-hidden">
          <div className="pt-24 lg:pt-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
            <div className="mb-8 reveal-slide-up">
              <h1 className="text-4xl md:text-5xl font-quantum text-quantum-cyan mb-4 tracking-wider">
                Support Our <span className="text-quantum-glow">Mission</span>
              </h1>
              <p className="text-lg mb-6 max-w-3xl text-gray-300">
                Help us continue to cut through quantum computing hype and
                provide valuable, honest assessments of quantum computing
                applications.
              </p>

              <div className="flex items-center mb-8 space-x-3">
                <Heart className="text-quantum-glow h-6 w-6" />
                <span className="text-sm text-gray-400">
                  100% of your donations go toward maintaining our tools and
                  research
                </span>
              </div>
            </div>

            {/* Donation options */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 reveal-slide-up">
              {/* Monthly supporter */}
              <div className="rounded-lg border border-quantum-blue/30 bg-black/60 backdrop-blur-md overflow-hidden transition-all hover:border-quantum-cyan/50 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-quantum text-quantum-cyan">
                      Monthly Supporter
                    </h3>
                    <div className="bg-quantum-blue/20 p-1.5 rounded-full">
                      <Zap className="h-5 w-5 text-quantum-glow" />
                    </div>
                  </div>
                  <div className="mb-5">
                    <span className="text-3xl font-bold">$10</span>
                    <span className="text-gray-400 ml-2">/month</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-quantum-cyan mr-2 flex-shrink-0 mt-0.5" />
                      <span>Early access to new features</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-quantum-cyan mr-2 flex-shrink-0 mt-0.5" />
                      <span>Recognition on our supporters page</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-quantum-cyan mr-2 flex-shrink-0 mt-0.5" />
                      <span>Monthly Q&A access with our team</span>
                    </li>
                  </ul>
                  <a
                    href="https://youtu.be/dQw4w9WgXcQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-2.5 px-4 bg-quantum-blue text-black rounded-md font-quantum hover:bg-quantum-cyan transition-colors"
                  >
                    Become a Supporter
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </div>
              </div>

              {/* One-time donation */}
              <div className="rounded-lg border border-quantum-blue/30 bg-black/60 backdrop-blur-md overflow-hidden transition-all hover:border-quantum-cyan/50 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-quantum text-quantum-cyan">
                      One-Time Donation
                    </h3>
                    <div className="bg-quantum-blue/20 p-1.5 rounded-full">
                      <Heart className="h-5 w-5 text-quantum-glow" />
                    </div>
                  </div>
                  <div className="mb-5">
                    <span className="text-3xl font-bold">$25</span>
                    <span className="text-gray-400 ml-2">or any amount</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-quantum-cyan mr-2 flex-shrink-0 mt-0.5" />
                      <span>Help us build new assessment tools</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-quantum-cyan mr-2 flex-shrink-0 mt-0.5" />
                      <span>
                        Support the advancement of quantum technologies
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-quantum-cyan mr-2 flex-shrink-0 mt-0.5" />
                      <span>Contribute to the future of humanity</span>
                    </li>
                  </ul>
                  <a
                    href="https://youtu.be/dQw4w9WgXcQ"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full py-2.5 px-4 bg-quantum-blue text-black rounded-md font-quantum hover:bg-quantum-cyan transition-colors"
                  >
                    Donate Now
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </div>
              </div>

              {/* Corporate sponsor */}
              <div className="rounded-lg border border-quantum-blue/30 bg-black/60 backdrop-blur-md overflow-hidden transition-all hover:border-quantum-cyan/50 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-quantum text-quantum-cyan">
                      Corporate Sponsor
                    </h3>
                    <div className="bg-quantum-blue/20 p-1.5 rounded-full">
                      <Zap className="h-5 w-5 text-quantum-glow" />
                    </div>
                  </div>
                  <div className="mb-5">
                    <span className="text-3xl font-bold">$500</span>
                    <span className="text-gray-400 ml-2">+</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-quantum-cyan mr-2 flex-shrink-0 mt-0.5" />
                      <span>Logo placement on our website</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-quantum-cyan mr-2 flex-shrink-0 mt-0.5" />
                      <span>Custom quantum computing assessment</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-quantum-cyan mr-2 flex-shrink-0 mt-0.5" />
                      <span>Monthly consultations with our experts</span>
                    </li>
                  </ul>
                  <a
                    href="https://youtu.be/dQw4w9WgXcQ"
                    className="flex items-center justify-center w-full py-2.5 px-4 bg-quantum-blue text-black rounded-md font-quantum hover:bg-quantum-cyan transition-colors"
                  >
                    Contact Us
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </div>
              </div>
            </div>

            {/* Thank you message */}
            <div className="text-center mb-20 reveal-slide-up">
              <div className="inline-block p-6 rounded-lg border border-quantum-blue/20 bg-gradient-to-r from-quantum-darker to-black">
                <h2 className="text-xl font-quantum text-quantum-cyan mb-3">
                  Thank You for Your Support
                </h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Every contribution helps us continue our mission to provide
                  honest, no-BS quantum computing assessments and resources to
                  the community.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile sidebar implementation is now handled with proper media queries in the SolutionSidebar component itself */}
      </div>
    </div>
  );
};

export default DonatePage;
