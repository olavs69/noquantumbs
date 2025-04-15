"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Vortex } from "@/components/ui/vortex";

const Hero = () => {
  const heroRef = useRef(null);
  const eyesRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current || !eyesRef.current) return;

      const heroRect = heroRef.current.getBoundingClientRect();
      const eyesRect = eyesRef.current.getBoundingClientRect();

      // Calculate center points
      const eyesCenterX = eyesRect.left + eyesRect.width / 2;
      const eyesCenterY = eyesRect.top + eyesRect.height / 2;

      // Calculate the angle between mouse and eyes
      const deltaX = e.clientX - eyesCenterX;
      const deltaY = e.clientY - eyesCenterY;

      // Limit the eye movement
      const maxMovement = 5;
      const movementX = Math.max(
        -maxMovement,
        Math.min(deltaX / 30, maxMovement)
      );
      const movementY = Math.max(
        -maxMovement,
        Math.min(deltaY / 30, maxMovement)
      );

      // Apply the transform
      eyesRef.current.style.transform = `translate(${movementX}px, ${movementY}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Vortex background */}
      <Vortex
        baseHue={150}
        particleCount={800}
        baseSpeed={0.1}
        rangeSpeed={1.0}
        baseRadius={1.2}
        rangeRadius={2.5}
        backgroundColor="rgba(0, 0, 0, 0.02)"
        containerClassName="absolute inset-0"
      />

      <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
        <img
          src="/head.png"
          alt="Quantum face background"
          className="w-full h-full object-cover opacity-20"
        />

        {/* Animated glowing eyes */}
        <div
          ref={eyesRef}
          style={{ opacity: 1 }}
          className="absolute top-1/2 left-1/2 w-[16%] h-[4%] -translate-x-1/2 -translate-y-[30%] transition-transform duration-75"
        >
          <div className="absolute -left-[230px] -top-8 w-5/12 h-full rounded-full bg-quantum-glow animate-pulse-glow eye-glow"></div>
          <div className="absolute right-[115px] -top-8 w-5/12 h-full rounded-full bg-quantum-glow animate-pulse-glow eye-glow"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 z-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-quantum mb-6 tracking-wider">
            <span className="block">Unlock Your</span>
            <span className="quantum-glow text-quantum-cyan">
              Quantum Superpowers
            </span>
          </h1>
          <p className="text-xl md:text-2xl max-w-lg mx-auto mb-8 text-gray-300">
            Find Out What Quantum Computing Can Do for You{" "}
            <span className="quantum-glow text-quantum-cyan">TODAY</span>
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              size="lg"
              className="bg-quantum-blue hover:bg-quantum-cyan text-black font-semibold font-quantum flex items-center space-x-2"
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-quantum-blue text-quantum-blue hover:text-quantum-cyan hover:border-quantum-cyan font-quantum"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
