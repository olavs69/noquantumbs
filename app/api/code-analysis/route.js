import * as parser from "@babel/parser";
// Dynamically import traverse to avoid SSR issues
// traverse is a CommonJS module which causes issues in Next.js server components
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { code } = await request.json();

    if (!code || !code.trim()) {
      return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

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
    const traverseModule = await import("@babel/traverse");
    const traverse = traverseModule.default;

    // Perform the analysis
    const analysisResults = analyzeCodeForQuantumPotential(code, traverse);

    // Calculate a "quantum advantage score" (mocked for now)
    const score = Math.floor(Math.random() * 100);
    const quantumAdvantage = score > 50;

    return NextResponse.json({
      quantumAdvantage,
      score,
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

/**
 * Analyzes code for quantum computing potential
 */
function analyzeCodeForQuantumPotential(code, traverse) {
  let quantumSpeedupPotential = false;
  let groverPotential = false;
  let potentialFindings = [];
  let shorPotential = false;
  let shorFindings = [];
  let qftPotential = false; // QFT: Initialize state
  let qftFindings = []; // QFT: Initialize findings array

  try {
    const ast = parser.parse(code, {
      sourceType: "module",
      plugins: ["jsx"],
      errorRecovery: true,
    });

    traverse(ast, {
      FunctionDeclaration(path) {
        const functionName = path.node.id ? path.node.id.name : "anonymous";
        const line = path.node.loc?.start.line || "unknown";
        const lowerName = functionName.toLowerCase();

        // QFT Check 1: Function Name
        if (
          lowerName.includes("fourier") ||
          lowerName.includes("fft") ||
          lowerName.includes("dft") ||
          lowerName.includes("qft")
        ) {
          if (!qftPotential) qftPotential = true; // Set flag only once if needed
          qftFindings.push(
            `Function name suggests Fourier transform: ${functionName} (line ${line})`
          );
        }

        if (
          lowerName.includes("factor") ||
          lowerName.includes("prime") ||
          lowerName.includes("divisor") ||
          lowerName.includes("gcd")
        ) {
          shorPotential = true;
          shorFindings.push(
            `Function name suggests factorization/primality testing: ${functionName} (line ${line})`
          );
        }

        path.traverse({
          "ForStatement|WhileStatement"(loopPath1) {
            // Outer loop check
            let isNestedLoop = false;
            // QFT Check 2 & 3: Nested Loop and Operation Patterns
            loopPath1.traverse({
              "ForStatement|WhileStatement"(loopPath2) {
                // Inner loop check
                isNestedLoop = true; // Flag that we found a nested loop
                loopPath2.traverse({
                  CallExpression(callPath) {
                    if (
                      callPath.node.callee.type === "MemberExpression" &&
                      callPath.node.callee.object.type === "Identifier" &&
                      callPath.node.callee.object.name === "Math" &&
                      ["exp", "cos", "sin"].includes(
                        callPath.node.callee.property.name
                      )
                    ) {
                      // Check if the argument contains '2 * Math.PI'
                      // Using toString() is a heuristic; deeper AST analysis could be more robust
                      const arg = callPath.get("arguments.0");
                      if (arg) {
                        const argSource = arg.toString(); // Get source code of the argument
                        if (argSource.includes("2 * Math.PI")) {
                          if (!qftPotential) qftPotential = true;
                          qftFindings.push(
                            `Potential QFT pattern (nested loop with Math.${
                              callPath.node.callee.property.name
                            } using 2*PI) in function: ${functionName} (around line ${
                              callPath.node.loc?.start.line || "unknown"
                            })`
                          );
                          // Optional: Add more specific checks on the structure of the '2 * Math.PI' multiplication if needed
                        }
                      }
                    }
                  },
                });
              }, // End inner loop visitor

              // --- Existing Shor/Grover Checks (ensure they still run) ---
              IfStatement(ifPath) {
                const test = ifPath.node.test;

                // Check for equality comparisons (potential for Grover or Shor)
                if (
                  test?.type === "BinaryExpression" &&
                  (test.operator === "===" || test.operator === "==")
                ) {
                  const left = test.left;
                  const right = test.right;

                  // --- Check 1: Shor's Potential (Modulo check) ---
                  let isShorPattern = false;
                  let moduloExpression = null;
                  if (
                    left?.type === "BinaryExpression" &&
                    left.operator === "%"
                  ) {
                    moduloExpression = left;
                  } else if (
                    right?.type === "BinaryExpression" &&
                    right.operator === "%"
                  ) {
                    moduloExpression = right;
                  }

                  if (moduloExpression) {
                    const otherSide = moduloExpression === left ? right : left;
                    if (
                      otherSide?.type === "NumericLiteral" &&
                      otherSide.value === 0
                    ) {
                      isShorPattern = true;
                      if (!shorPotential) shorPotential = true; // Set flag only once if needed
                      const loopLine =
                        loopPath1.node.loc?.start.line || "unknown";
                      shorFindings.push(
                        `Potential modulo-based factor check found in function: ${functionName} (around line ${loopLine})`
                      );
                    }
                  }

                  // --- Check 2: Grover's Potential (Loop-based search) ---
                  // Avoid flagging the same pattern as Shor's (e.g. `arr[i] % 2 === 0` shouldn't be Grover)
                  if (!isShorPattern) {
                    if (
                      left?.type === "MemberExpression" ||
                      right?.type === "MemberExpression"
                    ) {
                      // This looks like accessing an array/object element for comparison
                      if (!groverPotential) groverPotential = true; // Set flag only once if needed
                      potentialFindings.push(
                        `Potential search loop comparing element found in function: ${functionName} (line ${
                          ifPath.node.loc?.start.line || "unknown"
                        })`
                      );
                    }
                  }
                }
              },
            });
            // Reset nested loop flag if we exit the outer loop (though not strictly needed with current structure)
            // isNestedLoop = false;
          },
          CallExpression(callPath) {
            if (callPath.node.callee && callPath.node.callee.property) {
              const method = callPath.node.callee.property.name;
              if (["find", "filter", "indexOf", "includes"].includes(method)) {
                groverPotential = true;
                potentialFindings.push(
                  `Potential array search method (.${method}) in function: ${functionName} (line ${
                    callPath.node.loc?.start.line || "unknown"
                  })`
                );
              }
            }
          },
        });
      },
    });
  } catch (error) {
    console.error("AST Parsing/Traversal Error:", error);
    // Instead of swallowing the error, we'll throw it to be handled by the caller
    // This allows proper error response to be sent to the client
    throw error;
  }

  // Update overall potential based on all algorithm checks
  quantumSpeedupPotential = groverPotential || shorPotential || qftPotential;

  return {
    quantumSpeedupPotential,
    groverPotential,
    potentialFindings,
    shorPotential,
    shorFindings,
    qftPotential, // QFT: Return results
    qftFindings, // QFT: Return results
  };
}
