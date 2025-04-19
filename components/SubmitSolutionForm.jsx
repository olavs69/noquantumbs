"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { submitSolutionForm } from "@/app/api/actions/submit";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";

function SubmitSolutionForm() {
  const [formData, setFormData] = useState({
    company: "",
    verificationMethod: "",
    note: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      const result = await submitSolutionForm(formDataObj);
      console.log("Solution submission result:", result);

      if (result.success) {
        setSubmitStatus("success");

        // Reset form after successful submission
        setFormData({
          company: "",
          verificationMethod: "",
          note: "",
        });
      } else {
        setSubmitStatus("error");
        setErrorMessage(
          result.error || "Failed to submit solution. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting solution:", error);
      setSubmitStatus("error");
      setErrorMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-quantum-darker rounded-xl border border-quantum-blue/30 shadow-lg overflow-hidden relative">
      {/* Quantum glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-quantum-blue/5 to-transparent opacity-70 pointer-events-none" />

      <div className="p-8 relative z-10">
        {submitStatus === "success" ? (
          <motion.div
            className="flex flex-col items-center justify-center py-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 25 }}
          >
            <motion.div
              className="bg-green-500/20 rounded-full p-5 mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.1, duration: 0.5 }}
            >
              <CheckCircle className="h-12 w-12 text-green-500" />
            </motion.div>
            <h3 className="text-2xl font-semibold text-white mb-3">
              Solution Submitted Successfully!
            </h3>
            <p className="text-gray-300 text-center text-lg max-w-lg">
              Thank you for submitting your quantum computing solution! Our team
              will review it shortly and add it to our directory if approved.
            </p>
            <motion.button
              onClick={() => setSubmitStatus("")}
              className="mt-8 bg-quantum-blue hover:bg-quantum-blue/80 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Submit Another Solution
            </motion.button>
          </motion.div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label
                htmlFor="company"
                className="block text-base font-medium text-gray-200 mb-2"
              >
                Company Name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/30 border border-quantum-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-quantum-cyan/50 transition-all duration-200"
                placeholder="Enter your company or solution name"
                required
                disabled={isSubmitting}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label
                htmlFor="verificationMethod"
                className="block text-base font-medium text-gray-200 mb-2"
              >
                Method of Verification
              </label>
              <textarea
                id="verificationMethod"
                name="verificationMethod"
                value={formData.verificationMethod}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/30 border border-quantum-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-quantum-cyan/50 min-h-[120px] transition-all duration-200"
                placeholder="Describe how we can verify your solution and your authority to submit it (e.g., official email, website admin access)"
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
                htmlFor="note"
                className="block text-base font-medium text-gray-200 mb-2"
              >
                Additional Notes (Optional)
              </label>
              <textarea
                id="note"
                name="note"
                value={formData.note}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-black/30 border border-quantum-blue/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-quantum-cyan/50 min-h-[120px] transition-all duration-200"
                placeholder="Provide additional information about your solution, such as a brief description, its advantages, or any other relevant details"
                disabled={isSubmitting}
              />
            </motion.div>

            {errorMessage && (
              <motion.div
                className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm flex items-center"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            <motion.button
              type="submit"
              className="w-full bg-quantum-blue hover:bg-quantum-blue/80 text-white font-medium py-4 px-6 rounded-lg flex items-center justify-center transition-colors text-lg"
              disabled={isSubmitting}
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(0, 180, 216, 0.9)",
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                opacity: { delay: 0.4 },
                y: { delay: 0.4, type: "spring" },
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>Submit Solution</>
              )}
            </motion.button>
          </form>
        )}
      </div>
    </div>
  );
}

export default SubmitSolutionForm;
