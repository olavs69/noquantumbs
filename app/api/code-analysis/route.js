// Dynamically import traverse to avoid SSR issues
// traverse is a CommonJS module which causes issues in Next.js server components
import { NextResponse } from "next/server";
import { detectLanguage } from "@/lib/language-detection";
import { analyzeCodeForQuantumPotential } from "@/lib/quantum-analysis";
import { convertToJavaScript } from "@/lib/code-translator";
import { estimateQuantumSavings } from "@/utils/costEstimator";

export async function POST(request) {
  try {
    const { code: originalCode } = await request.json();

    if (!originalCode || !originalCode.trim() || originalCode.length < 20) {
      return NextResponse.json(
        {
          error:
            "No code provided or code too short for analysis (min 20 chars)",
        },
        { status: 400 }
      );
    }

    // 1. Detect Language using the imported helper
    const detectedLanguage = await detectLanguage(originalCode);
    let codeToAnalyze = originalCode;
    let conversionRequired = false;
    let conversionError = null;

    // 2. Check if conversion to JavaScript is needed
    // Convert if not JS/JSX (this includes 'unknown')
    if (detectedLanguage !== "js" && detectedLanguage !== "jsx") {
      conversionRequired = true;
      console.log(
        `Detected language: ${detectedLanguage}. Attempting conversion to JavaScript.`
      );
      try {
        codeToAnalyze = await convertToJavaScript(
          originalCode,
          detectedLanguage
        );
        console.log("Conversion successful. Proceeding with analysis.");
      } catch (err) {
        console.error("Conversion failed:", err);
        conversionError =
          err.message || "Failed to convert code to JavaScript.";

        // Handle specific "Not code" error from converter
        if (
          err.message ===
          "Input does not appear to be valid code or pseudocode."
        ) {
          return NextResponse.json(
            {
              error: "Input is not valid code",
              details: err.message,
              detectedLanguage: detectedLanguage,
            },
            { status: 400 }
          );
        }

        // Handle other conversion errors (e.g., API key missing, OpenAI service error)
        return NextResponse.json(
          {
            error: "Code conversion failed.",
            details: conversionError,
            detectedLanguage: detectedLanguage,
          },
          { status: 500 } // Use 500 for internal/service errors
        );
      }
    } else {
      console.log(
        `Detected language: ${detectedLanguage}. No conversion needed.`
      );
      // It's already JS/JSX
    }

    // 3. Proceed with analysis using the potentially converted code
    // Try a simple syntax validation before full parsing
    try {
      // Basic syntax check using Function constructor
      // This won't execute the code, just checks syntax
      new Function(codeToAnalyze);
    } catch (syntaxError) {
      const errorDetails = conversionRequired
        ? `Syntax error in code converted from ${detectedLanguage}: ${syntaxError.message}`
        : `Invalid JavaScript syntax: ${syntaxError.message}`;
      return NextResponse.json(
        {
          error: "Syntax error in code",
          details: errorDetails,
          detectedLanguage: detectedLanguage,
          converted: conversionRequired,
        },
        { status: 400 }
      );
    }

    // Dynamically import traverse to avoid SSR issues
    // Moved dynamic import closer to where it's needed
    const traverseModule = await import("@babel/traverse");
    const traverse = traverseModule.default;

    // Perform the analysis using the imported helper and potentially converted code
    const analysisResults = analyzeCodeForQuantumPotential(
      codeToAnalyze,
      traverse
    );

    // Calculate cost estimates for potential algorithms
    const costEstimates = [];
    const defaultProblemSize = 1000000; // Use a larger, more realistic default N
    const defaultProvider = "Quantinuum"; // Example default provider
    const detectedAlgos = [];

    if (analysisResults.groverPotential) detectedAlgos.push("Grover");
    if (analysisResults.shorPotential) detectedAlgos.push("Shor");
    if (analysisResults.qftPotential) detectedAlgos.push("QFT");

    try {
      // If any algorithms are detected, calculate a single combined estimate
      if (detectedAlgos.length > 0) {
        const combinedEstimate = estimateQuantumSavings({
          algorithm: detectedAlgos, // Pass the array of detected algorithms
          n: defaultProblemSize,
          provider: defaultProvider,
          shots: 1000, // Example: Increase shots for potentially complex combined runs
          overheadMultiplier: 1.8, // Example: Slightly higher overhead for combined potential
        });
        // Store the single combined estimate
        costEstimates.push(combinedEstimate);
      } else {
        // Optional: Handle case where no algorithms are detected (e.g., return empty array or a default message)
        console.log(
          "No specific quantum algorithms detected for cost estimation."
        );
      }
    } catch (estimationError) {
      console.error("Error during combined cost estimation:", estimationError);
      // Log and continue, returning analysis without estimates if estimation fails
    }

    // Calculate a "quantum advantage score" (mocked for now)
    const score = Math.floor(Math.random() * 100);
    const quantumAdvantage = score > 50;

    return NextResponse.json({
      quantumAdvantage,
      score,
      detectedLanguage,
      conversionRequired,
      ...analysisResults,
      costEstimates,
    });
  } catch (error) {
    console.error("Error analyzing code:", error);

    if (
      error.name === "SyntaxError" ||
      error.code === "BABEL_PARSER_SYNTAX_ERROR"
    ) {
      return NextResponse.json(
        {
          error: "Syntax error encountered during analysis",
          details: error.message,
        },
        { status: 400 }
      );
    }

    if (error.message.includes("Failed to convert code")) {
      return NextResponse.json(
        { error: "Code conversion process failed", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to analyze code due to an internal error" },
      { status: 500 }
    );
  }
}
