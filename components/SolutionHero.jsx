"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const SolutionHero = ({
  solutionCount = 142,
  industryCount = 38,
  projectCount = 567,
  spotlight = "NoQuantumBS",
}) => {
  return (
    <div className="flex flex-col items-center text-center pt-12 pb-12">
      <h1 className="text-4xl font-bold font-quantum tracking-wider mb-2 uppercase text-quantum-cyan">
        Quantum Solutions
      </h1>

      <div className="text-sm text-gray-400 mb-4">
        <span className="text-quantum-glow">
          {solutionCount.toLocaleString()}
        </span>{" "}
        quantum solutions for{" "}
        <span className="text-quantum-glow">
          {industryCount.toLocaleString()}
        </span>{" "}
        industries and{" "}
        <span className="text-quantum-glow">
          {projectCount.toLocaleString()}
        </span>{" "}
        projects.
      </div>

      {spotlight && (
        <div className="text-sm mb-6">
          Spotlight:{" "}
          <a
            href="/spotlight"
            className="text-quantum-cyan underline underline-offset-4 hover:text-quantum-glow"
          >
            {spotlight}
          </a>
        </div>
      )}

      <div className="relative w-full max-w-md">
        <input
          className="w-full pl-10 pr-4 py-2 h-10 bg-quantum-darker/70 border border-quantum-blue/40 rounded-md placeholder:text-gray-500 text-gray-300 focus:outline-none focus:border-quantum-cyan"
          placeholder="Find quantum solutions"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          <Search size={16} />
        </div>
        <Button
          size="sm"
          className="absolute right-1 top-1 h-8 bg-quantum-blue hover:bg-quantum-cyan text-black font-quantum"
        >
          <Search size={14} />
        </Button>
      </div>

      <div className="text-xs text-gray-500 mt-2">
        #1 quantum solutions provider. Trusted by 1000+ global companies.
      </div>
    </div>
  );
};

export default SolutionHero;
