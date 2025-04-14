// Dynamically import traverse to avoid SSR issues
// traverse is a CommonJS module which causes issues in Next.js server components
import { NextResponse } from "next/server";
import { detectLanguage } from "@/lib/language-detection";
import { analyzeCodeForQuantumPotential } from "@/lib/quantum-analysis";

export async function POST(request) {
  try {
    const { code } = await request.json();

    if (!code || !code.trim() || code.length < 20) {
      return NextResponse.json(
        {
          error:
            "No code provided or code too short for analysis (min 20 chars)",
        },
        { status: 400 }
      );
    }

    // 1. Detect Language using the imported helper
    const detectedLanguage = await detectLanguage(code);

    // 2. Check if JavaScript/JSX
    if (detectedLanguage !== "js" && detectedLanguage !== "jsx") {
      return NextResponse.json(
        {
          error: "Code analysis requires JavaScript or JSX.",
          detectedLanguage: detectedLanguage,
        },
        { status: 400 }
      );
    }

    // 3. Proceed with analysis only if JS/JSX
    // Try a simple syntax validation before full parsing
    try {
      // Basic syntax check using Function constructor
      // This won't execute the code, just checks syntax
      new Function(code);
    } catch (syntaxError) {
      return NextResponse.json(
        {
          error: "Invalid JavaScript syntax",
          details: syntaxError.message,
        },
        { status: 400 }
      );
    }

    // Dynamically import traverse to avoid SSR issues
    // Moved dynamic import closer to where it's needed
    const traverseModule = await import("@babel/traverse");
    const traverse = traverseModule.default;

    // Perform the analysis using the imported helper
    const analysisResults = analyzeCodeForQuantumPotential(code, traverse);

    // Calculate a "quantum advantage score" (mocked for now)
    const score = Math.floor(Math.random() * 100);
    const quantumAdvantage = score > 50;

    return NextResponse.json({
      quantumAdvantage,
      score,
      detectedLanguage,
      ...analysisResults,
    });
  } catch (error) {
    console.error("Error analyzing code:", error);

    // Provide more specific error messages based on error type
    if (
      error.name === "SyntaxError" ||
      error.code === "BABEL_PARSER_SYNTAX_ERROR"
    ) {
      return NextResponse.json(
        {
          error: "Syntax error in submitted code",
          details: error.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to analyze code" },
      { status: 500 }
    );
  }
}
