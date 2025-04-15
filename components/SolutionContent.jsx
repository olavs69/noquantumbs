"use client";

import React, { useEffect, useState } from "react";
import QuantumSolutionCard from "@/components/cards/QuantumSolutionCard";
import { motion } from "framer-motion";
import useSWR from "swr";

// Create a fetcher function for SWR
const fetcher = (url) => fetch(url).then((res) => res.json());

const SolutionContent = () => {
  // Use SWR for data fetching
  const { data: newSolutions = [], error: newError } = useSWR(
    "/api/solutions/latest?limit=10",
    fetcher
  );
  const { data: featuredSolutions = [], error: featuredError } = useSWR(
    "/api/solutions/verified?limit=10",
    fetcher
  );

  const isLoading =
    (!newSolutions.length && !newError) ||
    (!featuredSolutions.length && !featuredError);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        when: "beforeChildren",
      },
    },
  };
  const [activeTab, setActiveTab] = React.useState("overview");
  return (
    <div className="w-full px-4 pb-20">
      <div className="flex justify-center mb-6">
        <div className="w-full max-w-xs">
          <div className="grid grid-cols-2 bg-quantum-darker/50 p-1 rounded-full">
            <button
              onClick={() => setActiveTab("overview")}
              className={`rounded-full py-2 text-sm font-quantum transition-colors ${
                activeTab === "overview"
                  ? "bg-quantum-blue text-black"
                  : "text-gray-400 hover:text-quantum-cyan"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("customized")}
              className={`rounded-full py-2 text-sm font-quantum transition-colors ${
                activeTab === "customized"
                  ? "bg-quantum-blue text-black"
                  : "text-gray-400 hover:text-quantum-cyan"
              }`}
            >
              Customized
            </button>
          </div>
        </div>
      </div>
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          {/* New Solutions Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="bg-quantum-darker/30 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-quantum-blue/20 hover:border-quantum-blue/40 transition-colors shadow-lg"
          >
            <div className="flex items-baseline mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold font-quantum text-quantum-cyan relative">
                New Solutions
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-quantum-cyan to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </h2>
            </div>
            <motion.div
              className="grid gap-3"
              variants={containerVariants}
            >
              {isLoading
                ? // Show loading state
                  Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="h-16 bg-quantum-darker/50 rounded-lg animate-pulse"
                      ></div>
                    ))
                : Array.isArray(newSolutions) &&
                  newSolutions.map((solution) => (
                    <motion.div
                      key={solution.slug}
                      variants={itemVariants}
                    >
                      <QuantumSolutionCard
                        name={solution.name}
                        category={solution.category}
                        price={solution.price}
                        commentCount={solution.comment_count}
                        isVerified={solution.is_verified}
                        slug={solution.slug}
                        logoUrl={solution.logo_url}
                      />
                    </motion.div>
                  ))}
            </motion.div>
          </motion.div>

          {/* Featured Solutions Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="bg-quantum-darker/30 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-quantum-blue/20 hover:border-quantum-blue/40 transition-colors shadow-lg"
          >
            <div className="flex items-baseline mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold font-quantum text-quantum-cyan relative">
                Featured
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-quantum-cyan to-transparent"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                />
              </h2>
              <sup className="ml-2 text-xs rounded-full bg-quantum-blue/30 px-1.5 py-0.5 text-quantum-glow">
                Q
              </sup>
            </div>
            <motion.div
              className="grid gap-3"
              variants={containerVariants}
            >
              {isLoading
                ? // Show loading state
                  Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="h-16 bg-quantum-darker/50 rounded-lg animate-pulse"
                      ></div>
                    ))
                : Array.isArray(featuredSolutions) &&
                  featuredSolutions.map((solution) => (
                    <motion.div
                      key={solution.slug}
                      variants={itemVariants}
                    >
                      <QuantumSolutionCard
                        name={solution.name}
                        category={solution.category}
                        price={solution.price}
                        commentCount={solution.comment_count}
                        isVerified={solution.is_verified}
                        slug={solution.slug}
                        logoUrl={solution.logo_url}
                      />
                    </motion.div>
                  ))}
            </motion.div>
          </motion.div>
        </div>
      )}
      {activeTab === "customized" && (
        <div className="text-center p-6 md:p-10 bg-quantum-darker/30 backdrop-blur-sm rounded-xl border border-quantum-blue/20">
          <h2 className="text-xl font-quantum text-quantum-cyan mb-4">
            Customized View
          </h2>
          <p className="text-gray-400">
            This section is under construction. Tailored solutions coming soon!
          </p>
        </div>
      )}
    </div>
  );
};

export default SolutionContent;
