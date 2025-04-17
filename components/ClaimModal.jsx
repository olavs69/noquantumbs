"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitClaimForm } from "@/app/api/actions/claim";
import { AlertCircle, CheckCircle, Loader2, X } from "lucide-react";

function ClaimModal({ isOpen, onClose, companyName }) {
  const [formData, setFormData] = useState({
    company: companyName || "",
    verificationMethod: "",
    note: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Update company name when prop changes
  useEffect(() => {
    if (companyName) {
      setFormData((prev) => ({
        ...prev,
        company: companyName,
      }));
    }
  }, [companyName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error message when user types
    if (errorMessage) setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");
    setErrorMessage("");

    try {
      // Create FormData for server action
      const formDataObj = new FormData();
      formDataObj.append("company", formData.company);
      formDataObj.append("verificationMethod", formData.verificationMethod);
      formDataObj.append("note", formData.note);

      // Submit form
      const result = await submitClaimForm(formDataObj);
      console.log("Claim submission result:", result);

      if (result.success) {
        setSubmitStatus("success");

        // Reset form after successful submission
        setTimeout(() => {
          onClose();
        }, 3000);
      } else {
        setSubmitStatus("error");
        setErrorMessage(
          result.error || "Failed to submit claim. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting claim:", error);
      setSubmitStatus("error");
      setErrorMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
          {/* Backdrop with animation */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal with animation */}
          <motion.div
            className="relative bg-quantum-darker rounded-xl border border-quantum-blue/30 shadow-lg w-full max-w-md mx-4 z-10 overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
              duration: 0.3,
            }}
          >
            {/* Quantum glow effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-quantum-blue/5 to-transparent opacity-70 pointer-events-none" />

            {/* Close button with hover animation */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
              aria-label="Close"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <X size={20} />
            </motion.button>

            <div className="p-6">
              <motion.h2
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-bold text-quantum-cyan mb-2"
              >
                Claim This Solution
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-300 mb-6"
              >
                Complete this form to claim and verify your solution. Our team
                will review your request.
              </motion.p>

              {submitStatus === "success" ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", damping: 25 }}
                >
                  <motion.div
                    className="bg-green-500/20 rounded-full p-3 mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.1, duration: 0.5 }}
                  >
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Claim Submitted Successfully!
                  </h3>
                  <p className="text-gray-300 text-center">
                    We've received your claim request and will review it
                    shortly. Thank you!
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-gray-200 mb-1"
                    >
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-black/30 border border-quantum-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-quantum-cyan/50 transition-all duration-200"
                      placeholder="Enter company name"
                      required
                      disabled={isSubmitting}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label
                      htmlFor="verificationMethod"
                      className="block text-sm font-medium text-gray-200 mb-1"
                    >
                      Method of Verification
                    </label>
                    <textarea
                      id="verificationMethod"
                      name="verificationMethod"
                      value={formData.verificationMethod}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-black/30 border border-quantum-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-quantum-cyan/50 min-h-[80px] transition-all duration-200"
                      placeholder="Describe how we can verify your ownership (e.g., official email, website admin access)"
                      required
                      disabled={isSubmitting}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label
                      htmlFor="note"
                      className="block text-sm font-medium text-gray-200 mb-1"
                    >
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      id="note"
                      name="note"
                      value={formData.note}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-black/30 border border-quantum-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-quantum-cyan/50 min-h-[80px] transition-all duration-200"
                      placeholder="Any additional information that might help with verification"
                      disabled={isSubmitting}
                    />
                  </motion.div>

                  {errorMessage && (
                    <motion.div
                      className="text-red-400 text-sm flex items-center mt-1"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <AlertCircle className="h-4 w-4 mr-1" />
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    className="w-full bg-quantum-blue hover:bg-quantum-blue/80 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
                    disabled={isSubmitting}
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "rgba(0, 180, 216, 0.9)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      opacity: { delay: 0.5 },
                      y: { delay: 0.5, type: "spring" },
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>Submit Claim</>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ClaimModal;
