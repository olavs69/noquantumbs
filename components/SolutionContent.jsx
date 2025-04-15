"use client";

import React from "react";
import QuantumSolutionCard from "@/components/cards/QuantumSolutionCard";
import { motion } from "framer-motion";
import {
  getNewSolutions,
  getFeaturedSolutions,
} from "@/app/solutions/solutionData";

const SolutionContent = () => {
  // Get solutions from our data source
  const newSolutions = getNewSolutions();
  const featuredSolutions = getFeaturedSolutions();

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
    <div className="mx-auto max-w-6xl px-4 pb-20">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* New Solutions Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="bg-quantum-darker/30 backdrop-blur-sm rounded-xl p-5 border border-quantum-blue/20 hover:border-quantum-blue/40 transition-colors shadow-lg"
        >
          <div className="flex items-baseline mb-6">
            <h2 className="text-2xl font-bold font-quantum text-quantum-cyan relative">
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
            {newSolutions.map((solution, index) => (
              <motion.div
                key={solution.name}
                variants={itemVariants}
              >
                <QuantumSolutionCard
                  name={solution.name}
                  category={solution.category}
                  price={solution.price}
                  commentCount={solution.commentCount}
                  isVerified={solution.isVerified}
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
          className="bg-quantum-darker/30 backdrop-blur-sm rounded-xl p-5 border border-quantum-blue/20 hover:border-quantum-blue/40 transition-colors shadow-lg"
        >
          <div className="flex items-baseline mb-6">
            <h2 className="text-2xl font-bold font-quantum text-quantum-cyan relative">
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
            {featuredSolutions.map((solution, index) => (
              <motion.div
                key={solution.name}
                variants={itemVariants}
              >
                <QuantumSolutionCard
                  name={solution.name}
                  category={solution.category}
                  price={solution.price}
                  commentCount={solution.commentCount}
                  isVerified={solution.isVerified}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SolutionContent;
