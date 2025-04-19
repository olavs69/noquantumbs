import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HowItWorks = () => {
  return (
    <>
      <div className="py-12 px-4 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Content Box */}
          <div className="bg-black/30 border border-quantum-purple/50 rounded-xl p-8 shadow-lg relative overflow-hidden h-full flex flex-col justify-center">
            {/* Glow effect */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-quantum-purple/20 rounded-full blur-[80px]"></div>
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-quantum-blue/20 rounded-full blur-[80px]"></div>

            <div className="relative text-center flex flex-col items-center">
              <h3 className="text-2xl md:text-3xl font-quantum mb-6 text-white quantum-glow">
                Don&apos;t want to tinker with code but want that advantage?
              </h3>
              <p className="text-white/70 font-tech mb-8 max-w-lg mx-auto">
                Discover our ready-to-implement quantum solutions that can give
                your business the quantum edge without the technical complexity.
              </p>
              <div>
                <Link href="/solutions">
                  <Button className="bg-gradient-to-r from-quantum-blue to-quantum-cyan hover:from-quantum-cyan hover:to-quantum-blue text-white font-medium font-quantum transition-all duration-300 text-lg px-8 py-6 rounded-md shadow-[0_0_15px_rgba(139,92,246,0.5)] relative group">
                    <span className="relative z-10">
                      Explore Quantum Solutions
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Video Box */}
          <div className="bg-black/30 border border-quantum-blue/50 rounded-xl p-8 shadow-lg relative overflow-hidden h-full flex flex-col">
            {/* Glow effect */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-quantum-cyan/20 rounded-full blur-[80px]"></div>
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-quantum-blue/20 rounded-full blur-[80px]"></div>

            {/* Corner SVG decorations */}
            <svg
              className="absolute top-4 left-4 w-8 h-8 text-quantum-purple"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 0V8H16"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            <svg
              className="absolute bottom-4 right-4 w-8 h-8 text-quantum-cyan"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 24V16H8"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>

            {/* Headline */}
            <h3 className="text-2xl md:text-3xl font-quantum mb-6 text-white quantum-glow text-center">
              How It Works
            </h3>

            <div className="aspect-video w-full rounded-xl overflow-hidden quantum-border relative flex-1 flex items-center">
              {/* Pulse overlay */}
              <div className="absolute inset-0 border-2 border-quantum-cyan/20 rounded-xl animate-quantum-wave"></div>
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="How It Works Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
