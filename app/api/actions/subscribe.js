"use server";

import { z } from "zod";

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_REQUESTS_PER_WINDOW = 5;

// In-memory store for rate limiting (in production, use Redis or similar)
const rateLimitStore = new Map();

// Form validation schema
const subscribeFormSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// Google Forms field IDs
const GOOGLE_FORM_ID = "1WHmXU-MES_ZNsIRpMZDSdOlj1TTdXhPK-eeeB1z0iUQ";
const FORM_FIELDS = {
  email: "entry.456582441",
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

export async function submitSubscribeForm(formData) {
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

    // Extract email from form data
    const email = formData.get ? formData.get("email") : formData.email;

    // Validate form data
    const validatedData = subscribeFormSchema.parse({ email });

    // Create form data object for Google Forms
    const formDataForGoogle = new URLSearchParams();
    formDataForGoogle.append(FORM_FIELDS.email, validatedData.email);

    // Google Forms URL - try direct form URL format (removing the 'e/' part)
    const formUrl = `https://docs.google.com/forms/d/${GOOGLE_FORM_ID}/formResponse`;

    try {
      // Submit to Google Forms
      const response = await fetch(formUrl, {
        method: "POST",
        mode: "no-cors", // This is required for cross-domain form submission
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formDataForGoogle,
      });

      // Note: Due to CORS restrictions, we won't get a proper response from Google Forms
      // The response will be "opaque" because of no-cors mode
      // We'll assume success if no error is thrown

      return {
        success: true,
        message: "Successfully subscribed to our newsletter!",
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
          message: "Successfully subscribed to our newsletter!",
        };
      } catch (altError) {
        console.error("Alternative fetch error:", altError);
        throw new Error("Failed to submit to Google Forms");
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
      error: "Failed to subscribe. Please try again later.",
    };
  }
}
