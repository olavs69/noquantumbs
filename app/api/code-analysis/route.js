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
          "ForStatement|WhileStatement"(loopPath) {
            loopPath.traverse({
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
                        loopPath.node.loc?.start.line || "unknown";
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
  }

  quantumSpeedupPotential = groverPotential || shorPotential;

  return {
    quantumSpeedupPotential,
    groverPotential,
    potentialFindings,
    shorPotential,
    shorFindings,
  };
}
