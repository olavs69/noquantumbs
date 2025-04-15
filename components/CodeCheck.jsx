"use client";

import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Code, Scan } from "lucide-react";
import { SparklesCore } from "@/components/ui/sparkles";
import {
  ModalBody,
  ModalContent,
  useModal,
} from "@/components/ui/animated-modal";
import { useRouter } from "next/navigation";

const CodeCheck = () => {
  const [code, setCode] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const { open, setOpen } = useModal();
  const router = useRouter();

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

  // Reset the results when modal is closed
  useEffect(() => {
    if (!open) {
      // Small delay to avoid flickering
      const timer = setTimeout(() => {
        if (!isAnalyzing) {
          setResults(null);
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [open, isAnalyzing]);

  const analyzeCode = async () => {
    if (!code.trim()) {
      alert("Please enter some code first.");
      return;
    }

    // First set analyzing state and open the modal
    setIsAnalyzing(true);
    setResults(null);
    setOpen(true);

    try {
      // Then perform the API call
      const response = await fetch("/api/code-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);

        setResults({
          isApiError: true,
          errorTitle: errorData.error || "Analysis Failed",
          errorMessage:
            errorData.details || `Server responded with ${response.status}`,
          detectedLanguage: errorData.detectedLanguage,
        });

        setIsAnalyzing(false);
        return;
      }

      const analysisResults = await response.json();

      // Set results
      setResults(analysisResults);

      // If quantum speedup is possible, redirect to the detailed results page
      if (analysisResults.quantumSpeedupPotential) {
        // Store results in sessionStorage for the results page
        sessionStorage.setItem(
          "quantumAnalysisResults",
          JSON.stringify(analysisResults)
        );

        // Immediately redirect without closing the modal first
        router.push("/quantum-results");
        // Don't close the modal - let the navigation handle it naturally
        // The modal will automatically unmount when navigating away
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setResults({
        isApiError: true,
        errorTitle: "Network Error",
        errorMessage:
          "Could not connect to the analysis service. Please check your network and try again.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <>
      <div
        id="quantum-assessment"
        className="py-6 px-4 relative overflow-hidden"
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
          <p className="text-center text-white/70 mb-4 max-w-3xl mx-auto font-tech">
            Should you quantum compute your code? Paste it below and our tool
            will assess if quantum computing can save you time and money.
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
                  <Button
                    onClick={analyzeCode}
                    disabled={!code.trim()}
                    className="bg-gradient-to-r from-quantum-purple to-quantum-blue hover:from-quantum-bright-purple hover:to-quantum-cyan text-white font-medium font-quantum transition-all duration-300"
                  >
                    <Scan className="w-4 h-4 mr-2" />
                    Analyze Quantum Potential
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Algorithm Support Tags */}
      <h3 className="text-center text-white/80 font-quantum text-sm mb-3">
        Currently supports checks for:
      </h3>
      <div className="flex justify-center gap-2 mb-6">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-black/30 border border-quantum-purple/40 text-green-400 text-xs font-medium">
          <span className="mr-1">●</span> Grover&apos;s Algorithm
        </div>
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-black/30 border border-quantum-purple/40 text-pink-400 text-xs font-medium">
          <span className="mr-1">●</span> Shor&apos;s Algorithm
        </div>
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-black/30 border border-quantum-purple/40 text-blue-400 text-xs font-medium">
          <span className="mr-1">●</span> Quantum Fourier Transform
        </div>
      </div>
      {/* Redirect section */}
      <div className="py-6 px-4 text-center relative z-10">
        <div className="max-w-3xl mx-auto bg-black/30 border border-quantum-purple/50 rounded-xl p-8 shadow-lg relative overflow-hidden">
          {/* Glow effect */}
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-quantum-cyan/20 rounded-full blur-[80px]"></div>
          <div className="absolute -top-10 -left-10 w-48 h-48 bg-quantum-purple/20 rounded-full blur-[80px]"></div>

          <h3 className="text-2xl md:text-3xl font-quantum mb-6 text-white quantum-glow">
            Don&apos;t want to tinker with code but want that advantage?
          </h3>
          <p className="text-white/70 font-tech mb-8 max-w-2xl mx-auto">
            Discover our ready-to-implement quantum solutions that can give your
            business the quantum edge without the technical complexity.
          </p>
          <Button
            onClick={() => router.push("/solutions")}
            className="bg-gradient-to-r from-quantum-blue to-quantum-cyan hover:from-quantum-cyan hover:to-quantum-blue text-white font-medium font-quantum transition-all duration-300 text-lg px-8 py-6 rounded-md shadow-[0_0_15px_rgba(139,92,246,0.5)]"
          >
            Explore Quantum Solutions
          </Button>
        </div>
      </div>

      {/* Results Modal - Only shown for errors or no quantum potential */}
      <ModalBody className="max-w-2xl w-full bg-black/90 border-quantum-purple">
        <ModalContent className="p-6 quantum-purple-border rounded-lg">
          {!results && isAnalyzing ? (
            // Initial loading state
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
          ) : results ? (
            <>
              {/* Display API Error if present */}
              {results.isApiError ? (
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="w-24 h-24 mb-6 rounded-full bg-black/40 flex items-center justify-center border border-quantum-red/50">
                    <span className="text-4xl">❗</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 font-quantum text-quantum-red">
                    {results.errorTitle || "Analysis Error"}
                  </h3>
                  <p className="text-white/70 font-tech mb-4 text-center">
                    {results.errorMessage}
                  </p>
                  {results.detectedLanguage && (
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-black/30 border border-quantum-purple/40 text-yellow-400 text-xs font-medium">
                      <span className="mr-1">●</span> Detected:{" "}
                      {results.detectedLanguage}
                    </div>
                  )}
                </div>
              ) : results.quantumSpeedupPotential ? (
                // For potential quantum speedup, show a transition/loading state
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <div className="w-24 h-24 mb-4 rounded-full bg-black/40 flex items-center justify-center border border-quantum-cyan/50">
                    <div className="w-16 h-16 relative">
                      <div className="absolute inset-0 border-2 border-t-transparent border-quantum-cyan rounded-full animate-spin"></div>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 font-quantum text-quantum-cyan">
                    Quantum Potential Detected!
                  </h3>
                  <p className="text-white/70 font-tech mb-6">
                    Redirecting to detailed analysis...
                  </p>
                  <div className="flex items-center justify-center space-x-1 text-quantum-light-purple">
                    <span>Loading</span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-quantum-light-purple rounded-full animate-pulse"></div>
                      <div
                        className="w-2 h-2 bg-quantum-light-purple rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-quantum-light-purple rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              ) : (
                // No quantum potential found
                <div className="flex flex-col">
                  {/* No Speedup Message */}
                  <div className="py-6 text-center">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-black/40 flex items-center justify-center border border-gray-500/50">
                      <span className="text-4xl">🔍</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-4 font-quantum text-white/80">
                      No Quantum Advantage Found
                    </h3>
                    <p className="text-white/70 font-tech mb-6 max-w-lg mx-auto">
                      Our analysis couldn&apos;t detect any patterns in your
                      code that would benefit from quantum computing algorithms
                      based on our current heuristics.
                    </p>
                    <p className="text-white/70 font-tech mb-6 max-w-lg mx-auto">
                      However, there are quantum solutions that could still
                      provide an advantage to your business.
                    </p>
                    <Button
                      onClick={() => router.push("/solutions")}
                      className="bg-black/40 hover:bg-black/50 border border-quantum-purple/30 text-white font-medium transition-all duration-300"
                    >
                      Explore Quantum Solutions
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : null}
        </ModalContent>
      </ModalBody>
    </>
  );
};

export default CodeCheck;
