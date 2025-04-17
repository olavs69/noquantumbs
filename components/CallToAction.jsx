"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Vortex } from "@/components/ui/vortex";
import { submitSubscribeForm } from "@/app/api/actions/subscribe";

const CallToAction = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const ctaRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => {
      if (ctaRef.current) {
        observer.unobserve(ctaRef.current);
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic email validation
    if (!email || !email.includes("@") || !email.includes(".")) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("");
    setErrorMessage("");

    try {
      // Create a FormData object for server actions
      const formData = new FormData();
      formData.append("email", email);

      // Alternative approach just to be safe
      const result = await submitSubscribeForm(formData);
      console.log("Form submission result:", result);

      if (result.success) {
        // Clear form
        setEmail("");
        setSubmitStatus("success");

        // Reset form after 3 seconds
        setTimeout(() => {
          setSubmitStatus("");
        }, 3000);
      } else {
        setSubmitStatus("error");
        setErrorMessage(
          result.error || "Failed to subscribe. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setErrorMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 relative overflow-hidden"
    >
      {/* Vortex background - moved to the top with lower z-index */}
      <Vortex
        baseHue={150}
        particleCount={800}
        baseSpeed={0.1}
        rangeSpeed={1.0}
        baseRadius={1.2}
        rangeRadius={2.5}
        backgroundColor="rgba(0, 0, 0, 0.02)"
        containerClassName="absolute inset-0 z-0"
      />
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-quantum-darker to-quantum-dark opacity-80 z-1"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-quantum-blue/30 to-transparent z-2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div
          ref={ctaRef}
          className="max-w-4xl mx-auto bg-quantum-darker/80 rounded-xl quantum-border p-8 md:p-12 backdrop-blur-sm reveal"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-quantum tracking-wider">
              Ready to{" "}
              <span className="quantum-glow text-quantum-cyan">
                Quantum Leap
              </span>
              ?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Stay updated on our latest releases, to know when you're
              quantum-ready to quantum-go.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="max-w-lg mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    // Clear error when user starts typing again
                    if (errorMessage) setErrorMessage("");
                  }}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg bg-quantum-darker border border-quantum-blue/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-quantum-cyan/50"
                  required
                />
                {submitStatus === "success" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-quantum-darker/90 rounded-lg">
                    <div className="flex items-center text-quantum-cyan">
                      <CheckCircle className="mr-2 h-5 w-5" />
                      <span>Thank you!</span>
                    </div>
                  </div>
                )}
              </div>
              <Button
                type="submit"
                className="bg-quantum-blue hover:bg-quantum-cyan text-black font-semibold font-quantum flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
            {errorMessage && (
              <p className="text-red-400 text-sm flex items-center mt-2 justify-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errorMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
