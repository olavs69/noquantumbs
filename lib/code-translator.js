import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Converts code from a given language to JavaScript using OpenAI.
 * @param {string} code The code snippet to convert.
 * @param {string} language The detected language of the input code (or 'unknown').
 * @returns {Promise<string>} The converted JavaScript code.
 * @throws {Error} Throws an error if the OpenAI API call fails or returns an error message (indicating non-code input or conversion failure).
 */
export async function convertToJavaScript(code, language) {
  if (!process.env.OPENAI_API_KEY) {
    console.error("OpenAI API key is missing.");
    throw new Error(
      "OpenAI API key is not configured. Please set OPENAI_API_KEY environment variable."
    );
  }

  const systemMessage = `You are JSConverterGPT, a helpful assistant that converts any given code into Javascript, perfectly capturing its functionality and essence. You only output the converted code, nothing else.`;

  // Construct the user prompt using simple concatenation
  const languageDescription =
    language === "unknown"
      ? "potentially non-JavaScript or pseudocode"
      : language;
  const codeBlockLanguage = language === "unknown" ? "text" : language;
  const userPrompt =
    "Convert this " +
    languageDescription +
    " code into Javascript:\n\n```" +
    codeBlockLanguage +
    "\n" +
    code +
    "\n```\n\n" +
    'If by mistake the code is actually Javascript already, do not make any changes, just output the code as is. If what is given is not code or cannot be reasonably converted (e.g., just plain text), output an error message starting EXACTLY with "Error: Not code.", nothing else. If given pseudocode, convert it into Javascript code that best reflects its essence. ONLY output the JavaScript code block (within ```js ... ```) or the specific error message "Error: Not code.".';

  console.log(`Attempting to convert ${language} code to JavaScript...`);

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemMessage,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      model: "gpt-4o-mini",
      temperature: 0.2,
      max_tokens: 4000,
    });

    let result = completion.choices[0]?.message?.content?.trim();

    if (!result) {
      throw new Error("OpenAI returned an empty response.");
    }

    // Check if OpenAI returned the specific "Not code" error message
    if (result === "Error: Not code.") {
      console.error("OpenAI determined input is not convertible code.");
      // Throw specific error to be caught by the API route
      throw new Error("Input does not appear to be valid code or pseudocode.");
    }

    console.log("Code conversion successful.");

    // Attempt to remove markdown code fences if present
    // Handles optional language specifier and optional newlines around the code block
    // Regex: Matches optional ```js, ```javascript or ```, captures content, ends with ```
    result = result.replace(
      /^```(?:javascript|js)?\r?\n?([\s\S]*?)\r?\n?```$/,
      "$1"
    );

    return result;
  } catch (error) {
    // Re-throw specific "Not code" errors, otherwise wrap generic errors
    if (
      error.message === "Input does not appear to be valid code or pseudocode."
    ) {
      throw error;
    }
    console.error("Error calling OpenAI API:", error);
    // Use string concatenation here too for safety
    throw new Error("Failed to convert code via OpenAI: " + error.message);
  }
}
