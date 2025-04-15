"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { searchSolutions } from "@/lib/solutions";
import { useRouter } from "next/navigation";

const SolutionHero = ({
  solutionCount = 142,
  industryCount = 38,
  projectCount = 567,
  spotlight = "NoQuantumBS",
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);
  const router = useRouter();

  // Handle clicks outside of search dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Debounce search input
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchQuery.trim()) {
        setIsLoading(true);
        try {
          const results = await searchSolutions(searchQuery, 5);
          setSearchResults(results);
          setShowDropdown(true);
        } catch (error) {
          console.error("Error searching:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowDropdown(false);
      router.push(`/solutions/${searchResults[0]?.slug || ""}`);
    }
  };

  // Generate fallback color for logos
  const generateFallbackColor = (name) => {
    if (!name) return "hsl(210, 70%, 30%)";
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 30%)`;
  };

  return (
    <div className="flex flex-col items-center text-center pt-12 pb-12">
      <h1 className="text-4xl font-bold font-quantum tracking-wider mb-2 uppercase text-quantum-cyan">
        Quantum Solutions
      </h1>

      <div className="text-sm text-gray-400 mb-4">
        <span className="text-quantum-glow">
          {solutionCount.toLocaleString()}
        </span>{" "}
        quantum solutions for{" "}
        <span className="text-quantum-glow">
          {industryCount.toLocaleString()}
        </span>{" "}
        industries and{" "}
        <span className="text-quantum-glow">
          {projectCount.toLocaleString()}
        </span>{" "}
        projects.
      </div>

      {spotlight && (
        <div className="text-sm mb-6">
          Spotlight:{" "}
          <a
            href="/spotlight"
            className="text-quantum-cyan underline underline-offset-4 hover:text-quantum-glow"
          >
            {spotlight}
          </a>
        </div>
      )}

      <div
        className="relative w-full max-w-md"
        ref={searchRef}
      >
        <form onSubmit={handleSearch}>
          <input
            className="w-full pl-10 pr-4 py-2 h-10 bg-quantum-darker/70 border border-quantum-blue/40 rounded-md placeholder:text-gray-500 text-gray-300 focus:outline-none focus:border-quantum-cyan"
            placeholder="Find quantum solutions"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Search size={16} />
          </div>
          <Button
            type="submit"
            size="sm"
            className="absolute right-1 top-1 h-8 bg-quantum-blue hover:bg-quantum-cyan text-black font-quantum"
          >
            <Search size={14} />
          </Button>
        </form>

        {/* Search Results Dropdown */}
        {showDropdown && searchResults.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-quantum-darker border border-quantum-blue/30 rounded-md shadow-lg max-h-80 overflow-y-auto">
            {searchResults.map((result) => (
              <Link
                href={`/solutions/${result.slug}`}
                key={result.id}
                onClick={() => setShowDropdown(false)}
                className="block px-4 py-3 hover:bg-quantum-blue/20 transition-colors border-b border-quantum-blue/10 last:border-b-0"
              >
                <div className="flex items-center">
                  <div
                    className="h-8 w-8 rounded mr-3 flex items-center justify-center text-sm font-bold text-white relative overflow-hidden"
                    style={
                      !result.logo_url
                        ? {
                            backgroundColor: generateFallbackColor(result.name),
                          }
                        : {}
                    }
                  >
                    {result.logo_url ? (
                      <Image
                        src={result.logo_url}
                        alt={result.name}
                        width={32}
                        height={32}
                        className="object-cover h-full w-full"
                      />
                    ) : (
                      result.name?.charAt(0).toUpperCase() || "S"
                    )}
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-quantum-cyan">
                      {result.name}
                    </div>
                    <div className="text-xs text-gray-400 truncate">
                      {result.category}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {isLoading && (
          <div className="absolute z-50 w-full mt-1 bg-quantum-darker border border-quantum-blue/30 rounded-md shadow-lg p-4 text-center">
            <div className="text-quantum-cyan">Searching...</div>
          </div>
        )}

        {showDropdown &&
          searchQuery &&
          !isLoading &&
          searchResults.length === 0 && (
            <div className="absolute z-50 w-full mt-1 bg-quantum-darker border border-quantum-blue/30 rounded-md shadow-lg p-4 text-center">
              <div className="text-gray-400">No results found</div>
            </div>
          )}
      </div>

      <div className="text-xs text-gray-500 mt-2">
        #1 quantum solutions provider. Trusted by 1000+ global companies.
      </div>
    </div>
  );
};

export default SolutionHero;
