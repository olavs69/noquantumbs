"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SparklesCore } from "@/components/ui/sparkles";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import QuantumAnalysisPanel from "@/components/QuantumAnalysisPanel";
import Navbar from "@/components/Navbar";

const QuantumResultsPage = () => {
  // Start with loading state by default
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState(null);
  const [provider, setProvider] = useState("Quantinuum");
  const router = useRouter();

  useEffect(() => {
    // Immediately try to get stored results
    const getStoredResults = () => {
      try {
        const storedResults = sessionStorage.getItem("quantumAnalysisResults");

        if (!storedResults) {
          // Redirect back to the main page if no results are found
          router.push("/");
          return;
        }

        const parsedResults = JSON.parse(storedResults);
        setResults(parsedResults);

        // Only set loading to false after we've processed the results
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to parse stored results:", error);
        router.push("/");
      }
    };

    // Execute immediately
    getStoredResults();
  }, [router]);

  const handleBackClick = () => {
    router.push("/");
  };

  // Show the loading spinner immediately when the component mounts
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-quantum-dark">
        <div className="text-white text-center">
          <div className="w-16 h-16 border-4 border-quantum-purple border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-quantum-light-purple/80 font-tech">
            Loading quantum analysis results...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-quantum-dark text-white overflow-x-hidden">
      <Navbar />

      <div className="pt-20 px-4 md:px-8 relative overflow-hidden">
        {/* Sparkles Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <SparklesCore
            id="quantum-results-sparkles"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            speed={1.5}
            particleColor="#8b5cf6"
            particleDensity={40}
            className="w-full h-full"
          />
        </div>

        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-quantum-purple/10 rounded-full blur-[120px] z-0"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-quantum-blue/10 rounded-full blur-[120px] z-0"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Header with back button */}
          <div className="flex items-center mb-8">
            <Button
              onClick={handleBackClick}
              className="mr-4 bg-black/40 hover:bg-black/60 border border-quantum-purple text-quantum-cyan"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold font-quantum text-quantum-light-purple quantum-purple-glow flex-1">
              Quantum Analysis Results
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Provider Selection */}
              <div className="p-6 bg-black/30 quantum-purple-border rounded-lg">
                <h2 className="text-xl font-quantum text-quantum-light-purple mb-4">
                  Quantum Provider Selection
                </h2>
                <div className="grid grid-cols-3 gap-3">
                  {["Quantinuum", "IonQ Aria", "Rigetti Ankaa"].map(
                    (providerOption) => (
                      <button
                        key={providerOption}
                        onClick={() => setProvider(providerOption)}
                        className={`p-4 rounded-lg border ${
                          provider === providerOption
                            ? "border-quantum-cyan bg-quantum-purple/20 text-quantum-cyan"
                            : "border-quantum-purple/30 bg-black/30 text-white/70 hover:bg-black/40"
                        } transition-all duration-300 flex flex-col items-center`}
                      >
                        <div className="text-2xl mb-2">
                          {providerOption === "Quantinuum"
                            ? "🌐"
                            : providerOption === "IonQ Aria"
                            ? "⚛️"
                            : "☁️"}
                        </div>
                        <div className="font-quantum">{providerOption}</div>
                        {provider === providerOption && (
                          <div className="mt-2 text-xs bg-quantum-cyan/20 px-2 py-1 rounded">
                            Selected
                          </div>
                        )}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Detailed Findings */}
              <div className="p-6 bg-black/30 quantum-purple-border rounded-lg">
                <h2 className="text-xl font-quantum text-quantum-light-purple mb-4">
                  Detailed Analysis Findings
                </h2>

                {/* Grover's Algorithm Subsection */}
                {results.groverPotential && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 font-quantum text-green-400 flex items-center">
                      <span className="w-3 h-3 rounded-full bg-green-400 mr-2"></span>
                      Grover&apos;s Algorithm (Search)
                    </h3>
                    <div className="ml-5 text-white/80 font-tech space-y-2">
                      <p>
                        This code contains search patterns that could
                        potentially benefit from Grover&apos;s search algorithm.
                      </p>
                      <p className="mt-2 text-sm text-white/70">
                        Grover&apos;s algorithm provides a quadratic speedup for
                        unstructured search problems. It can find a specific
                        item in an unsorted database faster than classical
                        algorithms. This makes it particularly useful for
                        optimization problems, database searching, and
                        cryptography.
                      </p>
                    </div>
                  </div>
                )}

                {/* Shor's Algorithm Subsection */}
                {results.shorPotential && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 font-quantum text-pink-400 flex items-center">
                      <span className="w-3 h-3 rounded-full bg-pink-400 mr-2"></span>
                      Shor&apos;s Algorithm (Factoring/Period Finding)
                    </h3>
                    <div className="ml-5 text-white/80 font-tech space-y-2">
                      <p>
                        This code contains patterns related to integer
                        factorization or primality testing that could
                        potentially benefit from Shor&apos;s algorithm.
                      </p>
                      <p className="mt-2 text-sm text-white/70">
                        Shor&apos;s algorithm can efficiently factor large
                        integers and compute discrete logarithms, problems that
                        are believed to be intractable for classical computers.
                        It achieves an exponential speedup over the best-known
                        classical algorithms, making it a significant threat to
                        current public-key cryptography systems like RSA.
                      </p>
                    </div>
                  </div>
                )}

                {/* QFT Algorithm Subsection */}
                {results.qftPotential && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 font-quantum text-blue-400 flex items-center">
                      <span className="w-3 h-3 rounded-full bg-blue-400 mr-2"></span>
                      Quantum Fourier Transform (QFT)
                    </h3>
                    <div className="ml-5 text-white/80 font-tech space-y-2">
                      <p>
                        This code contains patterns that might be accelerated
                        using the Quantum Fourier Transform.
                      </p>
                      <p className="mt-2 text-sm text-white/70">
                        The Quantum Fourier Transform is a quantum analogue of
                        the classical discrete Fourier transform. It transforms
                        quantum states from the time domain to the frequency
                        domain and vice versa. QFT is a fundamental building
                        block for many quantum algorithms. It provides an
                        exponential speedup over the classical Fast Fourier
                        Transform for certain applications, particularly in
                        signal processing and period finding.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Cost Estimation Panel */}
            <div className="lg:col-span-1">
              <QuantumAnalysisPanel
                costEstimates={results.costEstimates || []}
                provider={provider}
                initialProblemSize={1000000}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantumResultsPage;
