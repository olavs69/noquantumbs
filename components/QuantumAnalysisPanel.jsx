"use client";

import React, { useState, useEffect } from "react";
import { estimateQuantumSavings } from "@/utils/costEstimator";

const QuantumAnalysisPanel = ({
  costEstimates = [], // Accept array of initial estimates
  provider,
  initialProblemSize = 1000000,
}) => {
  const [problemSize, setProblemSize] = useState(initialProblemSize);
  const [estimations, setEstimations] = useState([]); // State holds array of estimates
  const [sizeOptions, setSizeOptions] = useState([]);
  const [logScaleRange, setLogScaleRange] = useState({
    min: Math.log(100),
    max: Math.log(initialProblemSize * 10000),
  });

  // Utility functions for logarithmic scale conversion
  const sizeToSliderPosition = (size) => {
    const { min, max } = logScaleRange;
    return ((Math.log(size) - min) / (max - min)) * 100;
  };

  const sliderPositionToSize = (position) => {
    const { min, max } = logScaleRange;
    return Math.round(Math.exp(min + (position / 100) * (max - min)));
  };

  // Calculate size options and initial estimations
  useEffect(() => {
    // Calculate size options (independent of estimates)
    const minSize = 100;
    const maxSize = initialProblemSize * 10000; // Keep a wide range
    const numPoints = 8;
    const sizes = [];
    for (let i = 0; i <= numPoints; i++) {
      const size = Math.round(
        Math.exp(
          Math.log(minSize) +
            (Math.log(maxSize) - Math.log(minSize)) * (i / numPoints)
        )
      );
      sizes.push(size);
    }
    setSizeOptions(sizes);

    // Set log scale range once
    setLogScaleRange({
      min: Math.log(minSize),
      max: Math.log(maxSize),
    });

    // Initial estimation based on passed costEstimates and initialProblemSize
    if (provider && costEstimates.length > 0) {
      const initialEstimations = costEstimates
        .map((initialEstimate) => {
          try {
            return estimateQuantumSavings({
              algorithm: initialEstimate.algorithm, // This could be an algorithm name or "Combined (...)"
              algorithmsInvolved: initialEstimate.algorithmsInvolved, // Pass the array of algorithms if present
              n: problemSize, // Use current problemSize state
              provider: provider,
            });
          } catch (error) {
            console.error(
              `Failed initial estimation for ${
                Array.isArray(initialEstimate.algorithm)
                  ? initialEstimate.algorithm.join(", ")
                  : initialEstimate.algorithm
              }:`,
              error
            );
            return null; // Handle potential errors during estimation
          }
        })
        .filter(Boolean); // Remove nulls if any estimation failed
      setEstimations(initialEstimations);
    }
  }, [costEstimates, provider, initialProblemSize]); // Rerun if initial data changes

  // Update estimations when problem size or provider changes
  useEffect(() => {
    if (!provider || costEstimates.length === 0) {
      setEstimations([]); // Clear estimates if no provider or initial data
      return;
    }

    const updatedEstimations = costEstimates
      .map((initialEstimate) => {
        try {
          return estimateQuantumSavings({
            algorithm:
              initialEstimate.algorithmsInvolved || initialEstimate.algorithm,
            n: problemSize,
            provider: provider,
          });
        } catch (error) {
          console.error(
            `Failed estimation update for ${
              Array.isArray(initialEstimate.algorithm)
                ? initialEstimate.algorithm.join(", ")
                : initialEstimate.algorithm
            }:`,
            error
          );
          return null;
        }
      })
      .filter(Boolean);

    setEstimations(updatedEstimations);
  }, [problemSize, provider, costEstimates]); // Rerun when size or provider changes

  // Helper functions
  const formatNumber = (num) => {
    return num >= 1000 ? num.toLocaleString() : num.toString();
  };
  const formatSmallNumber = (num) => {
    if (num === 0) return "0.00000";
    return num < 0.001 && num !== 0 ? num.toExponential(2) : num.toFixed(5);
  };

  // Helper to get algorithm badge color
  const getAlgorithmBadgeColor = (algorithmName) => {
    switch (algorithmName) {
      case "Grover":
        return "bg-green-800/30 text-green-400";
      case "Shor":
        return "bg-pink-800/30 text-pink-400";
      case "QFT":
        return "bg-blue-800/30 text-blue-400";
      default:
        return "bg-purple-800/30 text-purple-400";
    }
  };

  // Render nothing if no estimations are available
  if (estimations.length === 0) {
    return (
      <div className="p-4 bg-black/30 quantum-purple-border rounded-lg mb-4 text-white/60 font-tech text-center">
        Select a provider and ensure analysis found potential algorithms.
      </div>
    );
  }

  return (
    <div className="p-4 bg-black/30 quantum-purple-border rounded-lg mb-4 space-y-6">
      {/* Problem Size Slider (remains outside the loop) */}
      <div>
        <h3 className="text-lg font-semibold mb-3 font-quantum text-quantum-light-purple">
          Adjust Problem Size (N)
        </h3>
        <div className="flex items-center space-x-2 mb-2">
          <input
            type="range"
            min={0}
            max={100}
            value={sizeToSliderPosition(problemSize)}
            onChange={(e) =>
              setProblemSize(sliderPositionToSize(Number(e.target.value)))
            }
            className="w-full h-2 bg-black/40 rounded-lg appearance-none cursor-pointer"
            step={1}
          />
          <span className="text-quantum-cyan font-tech whitespace-nowrap w-24 text-right">
            {formatNumber(problemSize)}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map((size) => (
            <button
              key={size}
              onClick={() => setProblemSize(size)}
              className={`text-xs px-2 py-1 rounded font-tech ${
                size === problemSize
                  ? "bg-quantum-purple text-white"
                  : "bg-black/20 text-white/70 hover:text-white hover:bg-black/30"
              }`}
            >
              {formatNumber(size)}
            </button>
          ))}
        </div>
      </div>

      {/* Loop through each estimation and render its details */}
      {estimations.map((estimation, index) => {
        // Check if this is a combined estimate (has algorithmsInvolved array)
        const isCombined =
          estimation.algorithmsInvolved &&
          Array.isArray(estimation.algorithmsInvolved) &&
          estimation.algorithmsInvolved.length > 1;

        return (
          <div
            key={index}
            className="border-t border-quantum-purple/30 pt-6"
          >
            <h3 className="text-xl font-semibold mb-2 font-quantum text-quantum-light-purple">
              Quantum Analysis
            </h3>

            {/* Show algorithm badges if this is a combined estimate */}
            {isCombined && (
              <div className="flex flex-wrap gap-2 mb-4">
                {estimation.algorithmsInvolved.map((algo) => (
                  <span
                    key={algo}
                    className={`text-xs px-2 py-1 rounded ${getAlgorithmBadgeColor(
                      algo
                    )}`}
                  >
                    {algo}
                  </span>
                ))}
              </div>
            )}

            {/* Information (Existing structure adapted for loop) */}
            <div className="space-y-4 text-white/80 font-tech">
              {/* Resource Requirements */}
              <div className="bg-black/20 p-3 rounded-md">
                <h4 className="text-sm font-semibold mb-2 text-quantum-light-purple">
                  Resource Requirements
                </h4>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="bg-black/30 p-2 rounded text-center">
                    <div className="text-xs text-white/50">Qubits</div>
                    <div className="text-lg text-quantum-cyan font-bold">
                      {estimation.resources.qubits}
                    </div>
                  </div>
                  <div className="bg-black/30 p-2 rounded text-center">
                    <div className="text-xs text-white/50">Gates</div>
                    <div className="text-lg text-quantum-cyan font-bold">
                      {formatNumber(estimation.resources.gates)}
                    </div>
                  </div>
                  <div className="bg-black/30 p-2 rounded text-center">
                    <div className="text-xs text-white/50">Iterations</div>
                    <div className="text-lg text-quantum-cyan font-bold">
                      {formatNumber(Math.round(estimation.quantumIterations))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Speedup Information */}
              <div className="pt-3 border-t border-quantum-purple/20">
                <div className="flex justify-between items-center mb-2">
                  <span>Speedup factor:</span>
                  <div className="flex items-center">
                    <span
                      className={`text-lg font-bold ${
                        estimation.speedupFactor > 10
                          ? "text-green-400"
                          : estimation.speedupFactor > 1
                          ? "text-quantum-cyan"
                          : "text-red-400"
                      }`}
                    >
                      {estimation.speedupFactor > 1000000
                        ? estimation.speedupFactor.toExponential(2)
                        : estimation.speedupFactor.toFixed(1)}
                      x
                    </span>
                    <span
                      className={`ml-2 text-xs px-2 py-0.5 rounded ${
                        estimation.speedupFactor > 1
                          ? "bg-green-900/30 text-green-400"
                          : "bg-red-900/30 text-red-400"
                      }`}
                    >
                      {estimation.speedupFactor > 1 ? "FASTER" : "SLOWER"}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-white/60 mb-1">
                  Classical iterations:{" "}
                  {formatNumber(Math.round(estimation.classicalIterations))} vs.
                  Quantum iterations:{" "}
                  {formatNumber(Math.round(estimation.quantumIterations))}
                </div>
              </div>

              {/* Cost Analysis */}
              <div className="pt-3 border-t border-quantum-purple/20">
                <h4 className="text-sm font-semibold mb-2 text-quantum-light-purple">
                  Cost Analysis on {estimation.provider}
                </h4>
                <div className="mb-2">
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Classical cost:</span>
                    <span className="text-quantum-cyan">
                      ${formatSmallNumber(estimation.classicalCost)}
                    </span>
                  </div>
                  <div className="flex justify-between mb-1 text-sm">
                    <span>Quantum cost:</span>
                    <span className="text-quantum-cyan">
                      ${formatSmallNumber(estimation.estimatedQuantumCost)}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-sm mt-2 pt-2 border-t border-quantum-purple/10">
                    <span>Cost savings:</span>
                    <span
                      className={
                        estimation.costSavings >= 0
                          ? "text-green-400"
                          : "text-red-400"
                      }
                    >
                      {estimation.costSavings < 0 ? "-" : ""}$
                      {formatSmallNumber(Math.abs(estimation.costSavings))}
                    </span>
                  </div>
                </div>

                {/* Final Worth it indicator */}
                <div
                  className={`p-2 mt-3 rounded-md text-center font-bold text-sm ${
                    estimation.isWorthIt
                      ? "bg-green-900/30 text-green-400"
                      : "bg-red-900/30 text-red-400"
                  }`}
                >
                  {estimation.isWorthIt
                    ? `✓ QUANTUM ADVANTAGE POSSIBLE`
                    : `✗ QUANTUM ADVANTAGE NOT LIKELY YET`}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default QuantumAnalysisPanel;
