"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  StarHalf,
  CheckCircle,
  XCircle,
  MessageSquare,
  Menu,
} from "lucide-react";
import Navbar from "@/components/Navbar.jsx";
import { getSolutionBySlug } from "@/lib/solutions";
import SolutionHero from "@/components/SolutionHero.jsx";
import SolutionSidebar from "@/components/SolutionSidebar";
import ClaimModal from "@/components/ClaimModal";
import Image from "next/image";

const SolutionDetailPage = () => {
  const params = useParams();
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // Keep sidebar open by default on desktop, closed on mobile
      setIsSidebarOpen(!mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    const fetchSolution = async () => {
      if (params?.slug) {
        setLoading(true);
        const data = await getSolutionBySlug(params.slug);
        setSolution(data);
        setLoading(false);
      }
    };

    fetchSolution();
  }, [params?.slug]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openClaimModal = () => {
    setIsClaimModalOpen(true);
  };

  const closeClaimModal = () => {
    setIsClaimModalOpen(false);
  };

  const renderRating = (rating) => {
    const numericRating = Number(rating) || 0;
    const stars = [];
    const fullStars = Math.floor(numericRating);
    const hasHalfStar = numericRating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`star-${i}`}
          className="fill-quantum-cyan text-quantum-cyan"
          size={18}
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half-star"
          className="fill-quantum-cyan text-quantum-cyan"
          size={18}
        />
      );
    }

    const emptyStars = 5 - Math.ceil(numericRating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          className="text-gray-600"
          size={18}
        />
      );
    }

    return stars;
  };

  // Helper function to generate fallback color (can be placed inside or outside component)
  const generateFallbackColor = (name) => {
    if (!name) return "hsl(210, 70%, 30%)"; // Default color if no name
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 30%)`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-quantum-dark text-white flex items-center justify-center">
        <div className="text-quantum-cyan">Loading...</div>
      </div>
    );
  }

  if (!solution) {
    return (
      <div className="min-h-screen bg-quantum-dark text-white flex items-center justify-center">
        <div className="text-quantum-cyan">Solution not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-quantum-dark text-white">
      <Navbar />

      {/* Mobile sidebar toggle */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-20 left-4 z-50 bg-quantum-darker/80 p-2 rounded-md border border-quantum-blue/30 text-quantum-cyan"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
      )}

      {/* Sidebar (conditionally rendered based on state) */}
      <SolutionSidebar
        className={`transition-transform duration-300 z-40 fixed top-0 left-0 h-full ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } ${isMobile ? "w-64" : "lg:translate-x-0"}`}
      />

      {/* Dark overlay when mobile sidebar is open */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Claim Modal */}
      <ClaimModal
        isOpen={isClaimModalOpen}
        onClose={closeClaimModal}
        companyName={solution.name}
      />

      {/* Main content area with dynamic padding */}
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen && !isMobile ? "lg:pl-[250px]" : "pl-0"
        }`}
      >
        <SolutionHero />
        <div className="pt-4 pb-20 px-4 max-w-6xl mx-auto">
          <Link
            href="/solutions"
            className="inline-flex items-center text-sm text-quantum-cyan hover:text-quantum-glow mb-6 transition-colors"
          >
            <ArrowLeft
              size={16}
              className="mr-1"
            />
            Back to Solutions
          </Link>

          <div className="relative mb-10">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#020024] via-quantum-blue/20 to-transparent rounded-xl opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.8 }}
            />

            <div className="relative flex flex-col md:flex-row items-start md:items-center p-6 md:p-8 rounded-xl border border-quantum-blue/30 overflow-hidden">
              {/* Logo Image or Fallback */}
              <div
                className="h-16 w-16 md:h-20 md:w-20 rounded-lg flex items-center justify-center text-2xl font-bold text-white mr-6 mb-4 md:mb-0 shrink-0 relative overflow-hidden bg-quantum-darker"
                // Apply fallback background only if logo_url is missing
                style={
                  !solution.logo_url
                    ? { backgroundColor: generateFallbackColor(solution.name) }
                    : {}
                }
              >
                {solution.logo_url ? (
                  <Image
                    src={solution.logo_url}
                    alt={`${solution.name || "Solution"} logo`}
                    width={80} // Use larger dimensions for detail page
                    height={80}
                    className="object-cover h-full w-full"
                    priority // Prioritize loading the main logo on the detail page
                  />
                ) : (
                  // Fallback Initial
                  <>
                    {solution.name ? solution.name.charAt(0).toUpperCase() : ""}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30"></div>
                  </>
                )}
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold font-quantum text-quantum-cyan">
                    {solution.name}
                  </h1>
                  {solution.is_verified && (
                    <span className="bg-quantum-blue/40 px-2 py-0.5 rounded text-xs font-medium text-quantum-glow flex items-center">
                      <CheckCircle
                        size={12}
                        className="mr-1"
                      />
                      Verified
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="bg-quantum-darker px-2 py-1 rounded text-sm border border-quantum-blue/20">
                    {solution.category}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {solution.price}
                  </span>
                  {solution.comment_count > 0 && (
                    <span className="text-gray-400 text-sm flex items-center">
                      <MessageSquare
                        size={14}
                        className="mr-1"
                      />
                      {solution.comment_count} comments
                    </span>
                  )}
                </div>

                <div className="flex items-center">
                  <div className="flex mr-2">
                    {renderRating(solution.rating)}
                  </div>
                  <span className="text-quantum-glow font-medium">
                    {Number(solution.rating).toFixed(1)}
                  </span>
                </div>

                {solution.website && (
                  <a
                    href={solution.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-6 right-6 bg-quantum-blue/30 hover:bg-quantum-blue/50 text-quantum-cyan font-medium px-4 py-2 rounded-lg flex items-center transition-colors"
                  >
                    <span>Visit Website</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <motion.div
                className="bg-quantum-darker/30 backdrop-blur-sm rounded-xl p-6 border border-quantum-blue/20 hover:border-quantum-blue/40 transition-colors shadow-lg mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h2 className="text-xl font-bold text-quantum-cyan mb-4">
                  Overview
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  {solution.overview}
                </p>
              </motion.div>

              <motion.div
                className="bg-quantum-darker/30 backdrop-blur-sm rounded-xl p-6 border border-quantum-blue/20 hover:border-quantum-blue/40 transition-colors shadow-lg mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <h2 className="text-xl font-bold text-quantum-cyan mb-4">
                  Applications
                </h2>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(solution.applications) &&
                    solution.applications.map((application, index) => (
                      <motion.div
                        key={index}
                        className="px-3 py-1.5 rounded-full bg-quantum-blue/20 border border-quantum-blue/30 text-quantum-cyan hover:bg-quantum-blue/30 transition-colors cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {application}
                      </motion.div>
                    ))}
                </div>
              </motion.div>

              <motion.div
                className="bg-quantum-darker/30 backdrop-blur-sm rounded-xl p-6 border border-quantum-blue/20 hover:border-quantum-blue/40 transition-colors shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <h2 className="text-xl font-bold text-quantum-cyan mb-4">
                  Description
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  {solution.description}
                </p>
              </motion.div>
            </div>

            <div className="space-y-6">
              <motion.div
                className="bg-quantum-darker/30 backdrop-blur-sm rounded-xl p-6 border border-quantum-blue/20 hover:border-quantum-blue/40 transition-colors shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <h2 className="text-xl font-bold text-quantum-cyan mb-4">
                  Pros
                </h2>
                <ul className="space-y-2">
                  {Array.isArray(solution.pros) &&
                    solution.pros.map((pro, index) => (
                      <li
                        key={index}
                        className="flex items-start"
                      >
                        <CheckCircle
                          className="text-green-400 shrink-0 mt-0.5 mr-2"
                          size={16}
                        />
                        <span className="text-gray-300">{pro}</span>
                      </li>
                    ))}
                </ul>
              </motion.div>

              <motion.div
                className="bg-quantum-darker/30 backdrop-blur-sm rounded-xl p-6 border border-quantum-blue/20 hover:border-quantum-blue/40 transition-colors shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <h2 className="text-xl font-bold text-quantum-cyan mb-4">
                  Cons
                </h2>
                <ul className="space-y-2">
                  {Array.isArray(solution.cons) &&
                    solution.cons.map((con, index) => (
                      <li
                        key={index}
                        className="flex items-start"
                      >
                        <XCircle
                          className="text-red-400 shrink-0 mt-0.5 mr-2"
                          size={16}
                        />
                        <span className="text-gray-300">{con}</span>
                      </li>
                    ))}
                </ul>
              </motion.div>

              {!solution.is_verified && (
                <motion.div
                  className="bg-quantum-darker/30 backdrop-blur-sm rounded-xl p-6 border border-quantum-blue/20 border-dashed hover:border-quantum-blue/40 transition-colors shadow-lg mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  <h2 className="text-xl font-bold text-quantum-cyan mb-3">
                    Claim This Solution
                  </h2>
                  <p className="text-gray-300 mb-4">
                    Are you the owner or representative of {solution.name}?
                    Claim this solution to verify your listing and gain access
                    to enhanced features.
                  </p>
                  <motion.button
                    className="w-full bg-quantum-blue hover:bg-quantum-blue/80 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300"
                    onClick={openClaimModal}
                    whileHover={{
                      scale: 1.02,
                      backgroundColor: "rgba(0, 180, 216, 0.9)",
                      boxShadow: "0 0 15px rgba(0, 180, 216, 0.5)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.span
                      className="flex items-center"
                      initial={{ gap: "0.5rem" }}
                      whileHover={{ gap: "0.75rem" }}
                    >
                      <CheckCircle size={18} />
                      <span>Claim Solution</span>
                    </motion.span>
                  </motion.button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionDetailPage;
