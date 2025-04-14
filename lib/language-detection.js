import { ModelOperations } from "@vscode/vscode-languagedetection";
import fs from "fs"; // Node.js file system module
import path from "path"; // Node.js path module

// --- Custom Model Loading Functions ---
const modelPath = path.join(
  process.cwd(),
  "node_modules",
  "@vscode",
  "vscode-languagedetection",
  "dist",
  "lib",
  "model.json"
);
const weightsPath = path.join(
  process.cwd(),
  "node_modules",
  "@vscode",
  "vscode-languagedetection",
  "dist",
  "lib",
  "group1-shard1of1.bin"
);

async function loadModelJson() {
  const modelJsonContent = await fs.promises.readFile(modelPath, "utf8");
  return JSON.parse(modelJsonContent);
}

async function loadWeights() {
  const weightsArrayBuffer = await fs.promises.readFile(weightsPath);
  return weightsArrayBuffer;
}

// Instantiate ModelOperations with custom loaders
const modelOperations = new ModelOperations(loadModelJson, loadWeights);

/**
 * Detects the programming language of the given code snippet.
 * @param {string} code The code snippet to analyze.
 * @returns {Promise<string>} The detected language ID (e.g., 'js', 'jsx', 'python') or 'unknown'.
 */
export async function detectLanguage(code) {
  try {
    const languageDetectionResults = await modelOperations.runModel(code);
    return languageDetectionResults.length > 0
      ? languageDetectionResults[0].languageId
      : "unknown";
  } catch (error) {
    console.error("Language detection error:", error);
    // Optionally re-throw or handle the error differently
    return "unknown"; // Return 'unknown' on error
  }
}
