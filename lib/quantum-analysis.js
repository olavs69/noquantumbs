import * as parser from "@babel/parser";

/**
 * Analyzes JavaScript/JSX code for potential quantum computing speedups.
 * This function uses AST traversal to look for patterns related to Grover's,
 * Shor's, and Quantum Fourier Transform (QFT) algorithms.
 *
 * @param {string} code The JavaScript/JSX code string to analyze.
 * @param {function} traverse The `@babel/traverse` function.
 * @returns {object} An object containing boolean flags and findings arrays for each potential algorithm.
 * @throws {Error} Throws an error if AST parsing or traversal fails.
 */
export function analyzeCodeForQuantumPotential(code, traverse) {
  let quantumSpeedupPotential = false;
  let groverPotential = false;
  let potentialFindings = [];
  let shorPotential = false;
  let shorFindings = [];
  let qftPotential = false;
  let qftFindings = [];

  try {
    const ast = parser.parse(code, {
      sourceType: "module",
      plugins: ["jsx"],
      errorRecovery: true, // Attempt to parse even with minor errors
    });

    traverse(ast, {
      // Visitor for Function Declarations
      FunctionDeclaration(path) {
        const functionName = path.node.id ? path.node.id.name : "anonymous";
        const line = path.node.loc?.start.line || "unknown";
        const lowerName = functionName.toLowerCase();

        // QFT Check 1: Function Name heuristic
        if (
          lowerName.includes("fourier") ||
          lowerName.includes("fft") ||
          lowerName.includes("dft") ||
          lowerName.includes("qft")
        ) {
          if (!qftPotential) qftPotential = true;
          qftFindings.push(
            `Function name suggests Fourier transform: ${functionName} (line ${line})`
          );
        }

        // Shor Check 1: Function Name heuristic
        if (
          lowerName.includes("factor") ||
          lowerName.includes("prime") ||
          lowerName.includes("divisor") ||
          lowerName.includes("gcd")
        ) {
          if (!shorPotential) shorPotential = true;
          shorFindings.push(
            `Function name suggests factorization/primality testing: ${functionName} (line ${line})`
          );
        }

        // Traverse within the function body for more specific patterns
        path.traverse({
          // Visitor for Loops (For and While)
          "ForStatement|WhileStatement"(loopPath1) {
            // QFT Check 2 & 3: Nested loops with specific Math calls
            loopPath1.traverse({
              "ForStatement|WhileStatement"(loopPath2) {
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
                      const arg = callPath.get("arguments.0");
                      if (arg) {
                        const argSource = arg.toString(); // Heuristic: check source code
                        if (argSource.includes("2 * Math.PI")) {
                          if (!qftPotential) qftPotential = true;
                          qftFindings.push(
                            `Potential QFT pattern (nested loop with Math.${
                              callPath.node.callee.property.name
                            } using 2*PI) in function: ${functionName} (around line ${
                              callPath.node.loc?.start.line || "unknown"
                            })`
                          );
                        }
                      }
                    }
                  },
                });
              },

              // Visitor for If Statements within loops
              IfStatement(ifPath) {
                const test = ifPath.node.test;

                // Check for equality comparisons
                if (
                  test?.type === "BinaryExpression" &&
                  (test.operator === "===" || test.operator === "==")
                ) {
                  const left = test.left;
                  const right = test.right;

                  // Shor Check 2: Modulo operation check (e.g., x % N === 0)
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
                    // Check if comparing modulo result to 0
                    if (
                      otherSide?.type === "NumericLiteral" &&
                      otherSide.value === 0
                    ) {
                      isShorPattern = true;
                      if (!shorPotential) shorPotential = true;
                      const loopLine =
                        loopPath1.node.loc?.start.line || "unknown";
                      shorFindings.push(
                        `Potential modulo-based factor check found in function: ${functionName} (around line ${loopLine})`
                      );
                    }
                  }

                  // Grover Check 1: Loop-based search (if not already flagged as Shor)
                  if (!isShorPattern) {
                    if (
                      left?.type === "MemberExpression" ||
                      right?.type === "MemberExpression"
                    ) {
                      if (!groverPotential) groverPotential = true;
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
          // Visitor for Call Expressions outside specific loops (e.g., direct array methods)
          CallExpression(callPath) {
            // Grover Check 2: Use of array search methods
            if (callPath.node.callee?.property) {
              const method = callPath.node.callee.property.name;
              if (["find", "filter", "indexOf", "includes"].includes(method)) {
                if (!groverPotential) groverPotential = true;
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
    console.error("AST Parsing/Traversal Error in quantum analysis:", error);
    // Re-throw the error to be handled by the API route
    throw error;
  }

  // Update overall potential flag based on individual algorithm checks
  quantumSpeedupPotential = groverPotential || shorPotential || qftPotential;

  return {
    quantumSpeedupPotential,
    groverPotential,
    potentialFindings,
    shorPotential,
    shorFindings,
    qftPotential,
    qftFindings,
  };
}
