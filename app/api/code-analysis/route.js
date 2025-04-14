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

  try {
    const ast = parser.parse(code, {
      sourceType: "module",
      plugins: ["jsx"],
      errorRecovery: true,
    });

    traverse(ast, {
      FunctionDeclaration(path) {
        const functionName = path.node.id ? path.node.id.name : "anonymous";
        path.traverse({
          ForStatement(loopPath) {
            loopPath.traverse({
              IfStatement(ifPath) {
                const test = ifPath.node.test;
                if (
                  test.type === "BinaryExpression" &&
                  (test.operator === "===" || test.operator === "==")
                ) {
                  const left = test.left;
                  const right = test.right;
                  if (
                    left.type === "MemberExpression" ||
                    right.type === "MemberExpression"
                  ) {
                    groverPotential = true;
                    potentialFindings.push(
                      `Potential search loop found in function: ${functionName} (line ${
                        path.node.loc?.start.line || "unknown"
                      })`
                    );
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
                    path.node.loc?.start.line || "unknown"
                  })`
                );
              }
            }
          },
        });
      },
      // Add similar logic for FunctionExpression, ArrowFunctionExpression if needed
    });
  } catch (error) {
    console.error("AST Parsing/Traversal Error:", error);
  }

  // Set the general quantum speedup potential if any algorithm-specific potentials are true
  quantumSpeedupPotential = groverPotential;

  return {
    quantumSpeedupPotential,
    groverPotential,
    potentialFindings,
  };
}
