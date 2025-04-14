"use client";

import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Code, Scan } from "lucide-react";
import { SparklesCore } from "@/components/ui/sparkles";
import {
  Modal,
  ModalBody,
  ModalContent,
  useModal,
} from "@/components/ui/animated-modal";

const CodeCheck = () => {
  const [code, setCode] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const placeholderCode = `// Paste your code here or use this example
function factorialClassical(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// This could be optimized with quantum computing
// for large numbers using Quantum Fourier Transform`;

  const analyzeCode = () => {
    if (!code.trim()) {
      alert("Please enter some code first.");
      return;
    }

    // Simulate analysis process
    setIsAnalyzing(true);
    setResults(null);

    // Mock analysis with timeout to simulate processing
    setTimeout(() => {
      // Calculate a "quantum advantage score"
      let score = Math.floor(Math.random() * 100);

      // Determine if there's quantum advantage
      const quantumAdvantage = score > 50;

      setResults({
        quantumAdvantage,
        score,
      });

      setIsAnalyzing(false);
    }, 2000);
  };

  const AnalysisButton = () => {
    const { setOpen } = useModal();

    const handleClick = () => {
      analyzeCode();
      setOpen(true);
    };

    return (
      <Button
        onClick={handleClick}
        disabled={!code.trim()}
        className="bg-gradient-to-r from-quantum-purple to-quantum-blue hover:from-quantum-bright-purple hover:to-quantum-cyan text-white font-medium font-quantum transition-all duration-300"
      >
        <Scan className="w-4 h-4 mr-2" />
        Analyze Quantum Potential
      </Button>
    );
  };

  return (
    <Modal>
      <div
        id="quantum-assessment"
        className="py-16 px-4 relative overflow-hidden"
      >
        {/* Sparkles Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <SparklesCore
            id="quantum-sparkles"
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

        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-center mb-2 font-quantum tracking-wider">
            Quantum{" "}
            <span className="quantum-glow text-quantum-cyan">Advantage</span>{" "}
            Assessment
          </h2>
          <p className="text-center text-white/70 mb-10 max-w-3xl mx-auto font-tech">
            Paste your code below to analyze its potential for quantum
            optimization. Our tool will assess if quantum computing could
            provide significant performance advantages.
          </p>

          <div className="max-w-4xl mx-auto">
            <div className="relative p-4 bg-black/20 quantum-purple-border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                  <Code className="h-5 w-5 text-quantum-light-purple" />
                  <h3 className="text-quantum-light-purple font-medium font-quantum">
                    Code Analysis
                  </h3>
                </div>
              </div>

              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={placeholderCode}
                className="min-h-[300px] bg-black/40 border border-quantum-purple/30 text-quantum-light-purple/90 font-mono text-sm focus-visible:ring-quantum-blue"
              />

              <div className="mt-4 flex justify-end">
                {isAnalyzing ? (
                  <Button
                    disabled
                    className="bg-gradient-to-r from-quantum-purple to-quantum-blue text-white font-medium font-quantum transition-all duration-300"
                  >
                    <span className="animate-pulse mr-2">Analyzing</span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <div
                        className="w-2 h-2 bg-white rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-white rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </Button>
                ) : (
                  <AnalysisButton />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Modal */}
      <ModalBody className="max-w-2xl w-full bg-black/90 border-quantum-purple">
        <ModalContent className="p-6 quantum-purple-border rounded-lg">
          {results ? (
            <>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-white/70 font-tech">
                    Quantum Advantage Score
                  </span>
                  <span
                    className={`font-bold ${
                      results.score > 70
                        ? "text-quantum-cyan"
                        : results.score > 40
                        ? "text-quantum-purple"
                        : "text-gray-400"
                    }`}
                  >
                    {results.score}%
                  </span>
                </div>
                <div className="w-full bg-black/50 h-2 rounded-full">
                  <div
                    className={`h-full rounded-full ${
                      results.score > 70
                        ? "bg-quantum-blue"
                        : results.score > 40
                        ? "bg-quantum-purple"
                        : "bg-gray-400"
                    }`}
                    style={{ width: `${results.score}%` }}
                  ></div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 mb-6 rounded-full bg-black/40 flex items-center justify-center border border-quantum-purple/30">
                <div className="w-16 h-16 relative">
                  <div className="absolute inset-0 border-2 border-t-transparent border-quantum-purple rounded-full animate-spin"></div>
                  <div
                    className="absolute inset-3 border border-t-transparent border-quantum-blue rounded-full animate-spin"
                    style={{ animationDuration: "3s" }}
                  ></div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 font-quantum text-quantum-light-purple">
                Quantum Analysis Results
              </h3>
              <p className="text-white/70 font-tech">
                Processing your code through our quantum potential analyzer...
              </p>
            </div>
          )}
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};

export default CodeCheck;
