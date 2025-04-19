"use server";

import { z } from "zod";

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_REQUESTS_PER_WINDOW = 5;

// In-memory store for rate limiting (in production, use Redis or similar)
const rateLimitStore = new Map();

// Form validation schema
const solutionFormSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  verificationMethod: z.string().min(1, "Verification method is required"),
  note: z.string().optional(),
});

// Google Forms field IDs for the solution submission form
// These should be updated with the actual Google Form IDs for the solution form
const GOOGLE_FORM_ID = "1c3KsjkZ7ymMxsI4or1waHhfgBpzLrZbkmYwAeO5g4xw";
const FORM_FIELDS = {
  company: "entry.1839501882",
  verificationMethod: "entry.724550747",
  note: "entry.133835912",
};

function getClientIP() {
  // In a real implementation, you'd get the IP from headers
  return "unknown";
}

function isRateLimited(ip) {
  const now = Date.now();
  const userRequests = rateLimitStore.get(ip) || { count: 0, timestamp: now };

  if (now - userRequests.timestamp > RATE_LIMIT_WINDOW) {
    // Reset if window has passed
    userRequests.count = 0;
    userRequests.timestamp = now;
  }

  if (userRequests.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  userRequests.count++;
  rateLimitStore.set(ip, userRequests);
  return false;
}

export async function submitSolutionForm(formData) {
  try {
    // Get client IP for rate limiting
    const clientIP = getClientIP();

    // Check rate limit
    if (isRateLimited(clientIP)) {
      return {
        success: false,
        error: "Too many requests. Please try again later.",
      };
    }

    // Extract data from form data
    const company = formData.get ? formData.get("company") : formData.company;
    const verificationMethod = formData.get
      ? formData.get("verificationMethod")
      : formData.verificationMethod;
    const note = formData.get ? formData.get("note") : formData.note || "";

    // Validate form data
    const validatedData = solutionFormSchema.parse({
      company,
      verificationMethod,
      note,
    });

    // Create form data object for Google Forms
    const formDataForGoogle = new URLSearchParams();
    formDataForGoogle.append(FORM_FIELDS.company, validatedData.company);
    formDataForGoogle.append(
      FORM_FIELDS.verificationMethod,
      validatedData.verificationMethod
    );
    formDataForGoogle.append(FORM_FIELDS.note, validatedData.note || "");

    // Google Forms URL
    const formUrl = `https://docs.google.com/forms/d/${GOOGLE_FORM_ID}/formResponse`;

    try {
      // Submit to Google Forms
      const response = await fetch(formUrl, {
        method: "POST",
        mode: "no-cors", // Required for cross-domain form submission
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formDataForGoogle,
      });

      return {
        success: true,
        message: "Solution submitted successfully!",
      };
    } catch (fetchError) {
      console.error("Fetch error:", fetchError);

      // Try alternative submission URL format as fallback
      try {
        const alternativeUrl = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;

        await fetch(alternativeUrl, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formDataForGoogle,
        });

        return {
          success: true,
          message: "Solution submitted successfully!",
        };
      } catch (altError) {
        console.error("Alternative fetch error:", altError);
        throw new Error("Failed to submit solution form");
      }
    }
  } catch (error) {
    console.error("Form submission error:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message,
      };
    }

    return {
      success: false,
      error: "Failed to submit solution. Please try again later.",
    };
  }
}
