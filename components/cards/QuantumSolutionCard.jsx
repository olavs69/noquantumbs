"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const QuantumSolutionCard = ({
  name,
  logo,
  category,
  price,
  isVerified = false,
  commentCount = 0,
}) => {
  // Generate a fallback from the first letter of the name
  const fallback = name.charAt(0).toUpperCase();

  // Generate a deterministic hue based on the name string
  // This ensures consistent colors between server and client rendering
  const getHueFromString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash % 360;
  };

  const hue = getHueFromString(name);

  // Create a URL-friendly slug from the name
  const slug = name.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link href={`/solutions/${slug}`}>
      <motion.div
        className="bg-quantum-darker/60 border border-quantum-blue/30 hover:bg-quantum-blue/10 hover:border-quantum-cyan/60 transition-all duration-300 rounded-md overflow-hidden shadow-lg relative group cursor-pointer"
        whileHover={{
          scale: 1.02,
          boxShadow: "0 0 15px rgba(0, 255, 255, 0.2)",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 17,
        }}
      >
        {/* Quantum glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-quantum-cyan/5 to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-quantum-cyan/80 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-quantum-cyan/80 to-transparent"></div>
        </div>

        <div className="p-4 relative z-10">
          <div className="flex items-start gap-3">
            <motion.div
              className="h-10 w-10 rounded-md overflow-hidden shrink-0"
              whileHover={{ scale: 1.1 }}
            >
              {logo ? (
                <img
                  src={logo}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  className="h-full w-full flex items-center justify-center text-white font-quantum relative"
                  style={{ backgroundColor: `hsl(${hue}, 70%, 30%)` }}
                >
                  {fallback}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/30"></div>
                </div>
              )}
            </motion.div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <h3 className="font-medium text-sm font-quantum text-quantum-cyan truncate group-hover:text-quantum-glow transition-colors duration-300">
                  {name}
                </h3>
                {isVerified && (
                  <motion.span
                    className="inline-flex items-center text-quantum-glow"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </motion.span>
                )}
              </div>

              <div className="flex items-center mt-1.5 gap-2">
                <motion.div
                  className="text-xs px-1.5 py-0 h-5 font-normal border border-quantum-blue/30 bg-quantum-darker/80 rounded text-gray-400 group-hover:border-quantum-cyan/50 group-hover:text-gray-300 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  {category}
                </motion.div>

                {price && (
                  <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                    {price}
                  </span>
                )}

                {commentCount > 0 && (
                  <motion.div
                    className="ml-auto flex items-center text-gray-500 group-hover:text-gray-400 transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-3.5 h-3.5"
                    >
                      <path d="M3.505 2.365A41.369 41.369 0 019 2c1.863 0 3.697.124 5.495.365 1.247.167 2.18 1.108 2.435 2.268a4.45 4.45 0 00-.577-.069 43.141 43.141 0 00-4.706 0C9.229 4.696 7.5 6.727 7.5 9.25v.5c0 .225.026.45.076.666A41.23 41.23 0 012 11.5a.5.5 0 01-.5-.45V5.103a.75.75 0 01.75-.738z" />
                      <path d="M3.75 7.5a.75.75 0 000 1.5h11.5a.75.75 0 000-1.5H3.75z" />
                    </svg>
                    <span className="text-xs ml-1">{commentCount}</span>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default QuantumSolutionCard;
