"use client";

import React from "react";
import { Timeline as AceternityTimeline } from "@/components/ui/timeline";
import { SparklesCore } from "@/components/ui/sparkles";

const timelineData = [
  {
    title: "Phase 1",
    content: (
      <div className="bg-quantum-darker/50 p-6 rounded-lg quantum-border mb-6">
        <h4 className="text-quantum-glow text-xl md:text-2xl font-quantum mb-4">
          No Quantum BS
        </h4>
        <p className="text-gray-200 mb-4 font-tech">
          A prototype platform to help users navigate existing quantum computing
          solutions & potential.
        </p>
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-quantum-blue mr-2 animate-pulse"></div>
          <span className="text-quantum-blue font-tech">Completed</span>
        </div>
      </div>
    ),
  },
  {
    title: "Phase 2",
    content: (
      <div className="bg-quantum-darker/50 p-6 rounded-lg quantum-border mb-6">
        <h4 className="text-quantum-glow text-xl md:text-2xl font-quantum mb-4">
          No Quantum BS, but good
        </h4>
        <p className="text-gray-200 mb-4 font-tech">
          Fix security, scale-ability and usability issues. More robust
          analysis, enhanced UX. Run tests, remove AI-generated gobbledygook.
          User feedback, launch on ProductHunt, get traction, iterate.
        </p>
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-quantum-cyan mr-2 animate-pulse"></div>
          <span className="text-quantum-cyan font-tech">
            In Progress (estimate 06-2025)
          </span>
        </div>
      </div>
    ),
  },
  {
    title: "Phase 3",
    content: (
      <div className="bg-quantum-darker/50 p-6 rounded-lg quantum-purple-border mb-6">
        <h4 className="text-quantum-purple-glow text-xl md:text-2xl font-quantum mb-4">
          QI/QD (Quantum Integration/Quantum Deployment)
        </h4>
        <p className="text-gray-200 mb-4 font-tech">
          Pipeline to simply integrate quantum computing into existing
          applications. Unit & integration tests, transpilation, verification,
          calibration, deployment.
        </p>
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-quantum-purple mr-2 animate-pulse"></div>
          <span className="text-quantum-purple font-tech">
            @Fr8 (09-2025 💪)
          </span>
        </div>
      </div>
    ),
  },
  {
    title: "Phase 4",
    content: (
      <div className="bg-quantum-darker/50 p-6 rounded-lg quantum-purple-border mb-6">
        <h4 className="text-quantum-purple-glow text-xl md:text-2xl font-quantum mb-4">
          Quantum Supremacy
        </h4>
        <p className="text-gray-200 mb-4 font-tech">
          Literally integrate quantum computing everywhere. Start developing a
          super computer that enables transportation between multiverses.
        </p>
        <div className="flex items-center">
          <div className="h-2 w-2 rounded-full bg-quantum-light-purple mr-2 animate-pulse"></div>
          <span className="text-quantum-light-purple font-tech">
            Future Goal
          </span>
        </div>
      </div>
    ),
  },
];

const Timeline = () => {
  return (
    <section className="w-full pt-16 bg-quantum-dark reveal relative overflow-hidden">
      {/* Sparkles Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <SparklesCore
          id="timeline-sparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          speed={1.5}
          particleColor="#8b5cf6"
          particleDensity={70}
          className="w-full h-full"
        />
      </div>

      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-quantum-purple/10 rounded-full blur-[120px] z-0"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-quantum-blue/10 rounded-full blur-[120px] z-0"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-quantum mb-4 quantum-glow">
            Roadmap
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto font-tech">
            Our journey to bring quantum computing to the masses.
          </p>
        </div>
        <AceternityTimeline data={timelineData} />
      </div>
    </section>
  );
};

export default Timeline;
