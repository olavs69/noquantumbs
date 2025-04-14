import pricingData from "../config/quantumPricing.json";

/**
 * Calculates classical iteration count for a given algorithm and problem size.
 * @param {string} algorithm - The algorithm name.
 * @param {number} n - Problem size.
 * @returns {number} Estimated classical iterations.
 */
function getClassicalIterations(algorithm, n) {
  switch (algorithm) {
    case "Grover":
      return n; // Linear search
    case "Shor":
      // Approximation of GNFS algorithm complexity
      if (n <= 1) return 1; // Avoid log(0) or negative logs
      const logN = Math.log(n);
      const logLogN = Math.log(logN > 0 ? logN : 1); // Ensure logLogN is not NaN
      return Math.pow(
        Math.exp(1),
        Math.pow(logN, 1 / 3) * (logLogN > 0 ? logLogN : 1) * 1.9
      );
    case "QFT":
      if (n <= 1) return 1; // Avoid log2(0) or negative logs
      return n * Math.log2(n); // Classical FFT is O(n log n)
    default:
      return n; // Default to linear
  }
}

/**
 * Estimate quantum requirements by algorithm type or a combination.
 * @param {string | string[]} algorithmOrAlgorithms - The quantum algorithm(s) (e.g., 'Grover' or ['Grover', 'Shor'])
 * @param {number} n - Problem size
 * @returns {Object} Estimated qubits, gates, and iterations required
 */
function getAlgorithmRequirements(algorithmOrAlgorithms, n) {
  const logN = Math.log2(n > 1 ? n : 2); // Ensure logN is calculated for n >= 2

  const calculateReqs = (algo) => {
    switch (algo) {
      case "Grover":
        return {
          qubits: Math.ceil(logN + 3),
          gates: Math.ceil(2.5 * Math.sqrt(n) * logN),
          expectedIterations: Math.ceil((Math.PI / 4) * Math.sqrt(n)),
        };
      case "Shor":
        return {
          qubits: Math.ceil(2 * logN + 2),
          gates: Math.ceil(9 * logN * logN * logN),
          expectedIterations: 1,
        };
      case "QFT":
        return {
          qubits: Math.ceil(logN),
          gates: Math.ceil(logN * logN),
          expectedIterations: 1,
        };
      default:
        return {
          qubits: Math.ceil(logN + 2),
          gates: Math.ceil(n),
          expectedIterations: Math.sqrt(n),
        };
    }
  };

  if (Array.isArray(algorithmOrAlgorithms)) {
    if (algorithmOrAlgorithms.length === 0) {
      return calculateReqs("default");
    }
    if (algorithmOrAlgorithms.length === 1) {
      return calculateReqs(algorithmOrAlgorithms[0]);
    }

    // Average requirements for multiple algorithms
    const totalReqs = { qubits: 0, gates: 0, expectedIterations: 0 };
    algorithmOrAlgorithms.forEach((algo) => {
      const reqs = calculateReqs(algo);
      totalReqs.qubits += reqs.qubits;
      totalReqs.gates += reqs.gates;
      totalReqs.expectedIterations += reqs.expectedIterations;
    });

    const numAlgos = algorithmOrAlgorithms.length;
    return {
      qubits: Math.ceil(totalReqs.qubits / numAlgos),
      gates: Math.ceil(totalReqs.gates / numAlgos),
      expectedIterations: Math.ceil(totalReqs.expectedIterations / numAlgos),
    };
  } else {
    // Single algorithm case
    return calculateReqs(algorithmOrAlgorithms);
  }
}

/**
 * Estimate cost and speedup for a quantum candidate routine or combination.
 * @param {Object} params
 * @param {string | string[]} params.algorithm - e.g., 'Grover' or ['Grover', 'Shor']
 * @param {number} params.n - problem size
 * @param {string} params.provider - e.g., 'Quantinuum'
 * @param {number} params.overheadMultiplier - default 1.5, accounts for extra quantum overhead
 * @param {number} params.shots - default 50, number of circuit runs/shots
 * @returns {Object} estimation results
 */
export function estimateQuantumSavings({
  algorithm, // Can be string or array
  n,
  provider,
  overheadMultiplier = 1.5,
  shots = 50,
}) {
  // Get quantum resource estimates based on algorithm(s) and problem size
  const resources = getAlgorithmRequirements(algorithm, n);

  // Calculate average classical iterations if multiple algorithms are involved
  let classicalIterations;
  let algorithmsInvolved = [];

  if (Array.isArray(algorithm)) {
    if (algorithm.length === 0) {
      classicalIterations = n; // Default if empty array
      algorithmsInvolved = ["None"];
    } else {
      classicalIterations =
        algorithm.reduce(
          (sum, algo) => sum + getClassicalIterations(algo, n),
          0
        ) / algorithm.length;
      algorithmsInvolved = algorithm;
    }
  } else {
    classicalIterations = getClassicalIterations(algorithm, n);
    algorithmsInvolved = [algorithm];
  }
  // Ensure classical iterations is at least 1
  classicalIterations = Math.max(1, classicalIterations);

  // Account for quantum overhead
  const quantumIterations = Math.max(
    1,
    resources.expectedIterations * overheadMultiplier
  ); // Ensure at least 1 iteration

  // Calculate the speedup factor
  const speedupFactor = classicalIterations / quantumIterations;

  // Get provider pricing info from the config file
  const providerInfo = pricingData[provider];
  if (!providerInfo) {
    throw new Error(`Provider ${provider} not found in pricing configuration.`);
  }

  // Calculate quantum costs based on resources needed
  const qubitCost = resources.qubits * providerInfo.pricePerQubit;
  const gateCost = resources.gates * providerInfo.pricePerGate;
  // const shotCost = shots * providerInfo.pricePerShot; // shotCost is often per execution, not per component

  // Total quantum cost - often calculated per shot/execution run
  const costPerShot = qubitCost + gateCost; // Basic cost excluding per-shot fee for now
  const estimatedQuantumCost =
    costPerShot * shots + shots * (providerInfo.pricePerShot || 0); // Add per-shot fee if defined

  // Classical computation cost (simplified)
  const classicalCostPerIteration = 0.00001; // Example cost factor
  const classicalCost = classicalIterations * classicalCostPerIteration;

  // Cost savings (could be negative if quantum is more expensive)
  const costSavings = classicalCost - estimatedQuantumCost;

  // Is it worth it? (Consider speedup > 1 AND positive savings)
  const isWorthIt = speedupFactor > 1 && costSavings > 0;

  // Return an object with all the details
  return {
    algorithm: Array.isArray(algorithm)
      ? `Combined (${algorithm.join(", ")})`
      : algorithm,
    algorithmsInvolved, // Array of actual algorithms considered
    classicalIterations,
    quantumIterations,
    speedupFactor,
    resources, // Averaged if combined
    estimatedQuantumCost,
    classicalCost,
    costSavings,
    isWorthIt,
    provider,
    providerInfo,
    detailedCosts: {
      qubitCost: resources.qubits * providerInfo.pricePerQubit,
      gateCost: resources.gates * providerInfo.pricePerGate,
      shotCost: shots * (providerInfo.pricePerShot || 0),
      costPerShot: costPerShot + (providerInfo.pricePerShot || 0),
    },
    parameters: {
      n,
      provider,
      overheadMultiplier,
      shots,
    },
  };
}

/**
 * Get cost estimation for various problem sizes
 * @param {Object} params Base parameters
 * @param {Array<number>} sizes Array of problem sizes to estimate
 * @returns {Array<Object>} Array of estimations for each size
 */
export function getBatchEstimates(params, sizes) {
  return sizes.map((size) => {
    return estimateQuantumSavings({
      ...params,
      n: size,
    });
  });
}
