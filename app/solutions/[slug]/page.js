"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
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
import Navbar from "@/components/Navbar";
import SolutionSidebar from "@/components/SolutionSidebar";
import { getSolutionBySlug } from "../solutionData";
import SolutionHero from "@/components/SolutionHero";

const SolutionDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  // Get solution data based on slug
  const solution = getSolutionBySlug(slug);

  // Handle if solution not found
  useEffect(() => {
    if (!solution && slug) {
      router.push("/solutions");
    }
  }, [solution, slug, router]);

  if (!solution) {
    return (
      <div className="min-h-screen bg-quantum-dark text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-quantum text-quantum-cyan mb-4">
            Solution not found
          </h1>
          <p className="text-gray-400 mb-6">
            The solution you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <Link
            href="/solutions"
            className="inline-flex items-center px-4 py-2 bg-quantum-blue/30 hover:bg-quantum-blue/50 text-quantum-cyan rounded-md transition-colors"
          >
            <ArrowLeft
              size={16}
              className="mr-2"
            />
            Back to Solutions
          </Link>
        </div>
      </div>
    );
  }

  // Render rating stars
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

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

    const emptyStars = 5 - stars.length;
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
      <SolutionHero />
      <div
        className={`transition-all duration-300 ${
          isSidebarOpen && !isMobile ? "pl-[250px]" : "pl-0"
        }`}
      >
        <div className="pt-4 pb-20 px-4 max-w-6xl mx-auto">
          {/* Dark overlay when mobile sidebar is open */}
          {isMobile && isSidebarOpen && (
            <div
              className="fixed inset-0 bg-black/70 z-30"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* Back button */}
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

          {/* Header */}
          <div className="relative mb-10">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#020024] via-quantum-blue/20 to-transparent rounded-xl opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.8 }}
            />

            <div className="relative flex flex-col md:flex-row items-start md:items-center p-6 md:p-8 rounded-xl border border-quantum-blue/30 overflow-hidden">
              {/* Logo/Icon */}
              <div
                className="h-16 w-16 md:h-20 md:w-20 rounded-lg flex items-center justify-center text-2xl font-bold text-white mr-6 mb-4 md:mb-0"
                style={{ backgroundColor: solution.logoColor }}
              >
                {solution.name.charAt(0)}
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold font-quantum text-quantum-cyan">
                    {solution.name}
                  </h1>
                  {solution.isVerified && (
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
                  {solution.commentCount > 0 && (
                    <span className="text-gray-400 text-sm flex items-center">
                      <MessageSquare
                        size={14}
                        className="mr-1"
                      />
                      {solution.commentCount} comments
                    </span>
                  )}
                </div>

                <div className="flex items-center">
                  <div className="flex mr-2">
                    {renderRating(solution.rating)}
                  </div>
                  <span className="text-quantum-glow font-medium">
                    {solution.rating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column (Overview & Description) */}
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

              {/* Applications */}
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
                  {solution.applications.map((application, index) => (
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

                {solution.testimonial && (
                  <div className="mt-6 border-l-2 border-quantum-blue pl-4 py-1">
                    <p className="text-gray-300 italic">
                      &ldquo;{solution.testimonial}&rdquo;
                    </p>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Right column (Pros, Cons) */}
            <div className="space-y-6">
              {/* Pros */}
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
                  {solution.pros.map((pro, index) => (
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

              {/* Cons */}
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
                  {solution.cons.map((con, index) => (
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionDetailPage;
