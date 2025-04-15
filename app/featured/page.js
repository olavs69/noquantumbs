"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import SolutionHero from "@/components/SolutionHero";
import SolutionSidebar from "@/components/SolutionSidebar";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import QuantumSolutionCard from "@/components/cards/QuantumSolutionCard";
import useSWR from "swr";

// Create a fetcher function for SWR
const fetcher = (url) => fetch(url).then((res) => res.json());

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

const FeaturedPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Use SWR for data fetching
  const { data: featuredSolutions = [], error: featuredError } = useSWR(
    "/api/solutions/verified?limit=10",
    fetcher
  );

  const isLoading = !featuredSolutions.length && !featuredError;

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-quantum-dark text-white">
      <Navbar />

      {/* Mobile sidebar toggle */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-20 left-4 z-50 bg-quantum-darker/80 p-2 rounded-md border border-quantum-blue/30 text-quantum-cyan"
        >
          <Menu size={20} />
        </button>
      )}

      {/* Sidebar (hidden on mobile unless toggled) */}
      <SolutionSidebar
        className={`transition-transform duration-300 z-40 ${
          isMobile
            ? isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        }`}
      />

      {/* Main content */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen && !isMobile ? "pl-[250px]" : "pl-0"
        }`}
      >
        <div className="pt-16 relative">
          {/* Dark overlay when mobile sidebar is open */}
          {isMobile && isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/70 z-30"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          <SolutionHero />
        </div>
        {/* Featured Solutions Section */}
        <div className="w-full px-4 pb-20 max-w-[1200px] mx-auto mt-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="bg-quantum-darker/30 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-quantum-blue/20 hover:border-quantum-blue/40 transition-colors shadow-lg w-full overflow-hidden"
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
              className="grid gap-3 w-full"
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
                      className="w-full"
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
      </div>
    </div>
  );
};

export default FeaturedPage;
