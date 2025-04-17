"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import SolutionHero from "@/components/SolutionHero";
import SolutionSidebar from "@/components/SolutionSidebar";
import QuantumSolutionCard from "@/components/cards/QuantumSolutionCard";
import {
  Menu,
  ExternalLink,
  Filter,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
} from "lucide-react";
import { motion } from "framer-motion";

const ITEMS_PER_PAGE = 15;

const ExplorePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [filteredSolutions, setFilteredSolutions] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableApplications, setAvailableApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showApplicationDropdown, setShowApplicationDropdown] = useState(false);
  const categoryButtonRef = useRef(null);
  const applicationButtonRef = useRef(null);
  const [categoryDropdownPosition, setCategoryDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const [applicationDropdownPosition, setApplicationDropdownPosition] =
    useState({ top: 0, left: 0, width: 0 });

  // Animation variants
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

  // Fetch solutions data
  useEffect(() => {
    const fetchSolutions = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/solutions");
        const data = await response.json();

        setSolutions(data);
        setFilteredSolutions(data);
        setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));

        // Extract unique categories and applications and sort them alphabetically
        const categories = [
          ...new Set(data.map((solution) => solution.category)),
        ]
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b));

        // Extract all applications across solutions and flatten the array
        const applicationsArr = data.flatMap((solution) =>
          Array.isArray(solution.applications) ? solution.applications : []
        );
        // Remove duplicates and sort alphabetically
        const applications = [...new Set(applicationsArr)]
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b));

        setAvailableCategories(categories);
        setAvailableApplications(applications);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching solutions:", error);
        setIsLoading(false);
      }
    };

    fetchSolutions();
  }, []);

  // Apply filters whenever selected filters change
  useEffect(() => {
    if (solutions.length === 0) return;

    let filtered = [...solutions];

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((solution) =>
        selectedCategories.includes(solution.category)
      );
    }

    // Filter by applications
    if (selectedApplications.length > 0) {
      filtered = filtered.filter((solution) => {
        // Check if solution has applications property and it's an array
        if (!Array.isArray(solution.applications)) return false;
        // Check if at least one of the selected applications exists in this solution
        return solution.applications.some((app) =>
          selectedApplications.includes(app)
        );
      });
    }

    setFilteredSolutions(filtered);
    setTotalPages(Math.ceil(filtered.length / ITEMS_PER_PAGE));
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedCategories, selectedApplications, solutions]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleCategoryFilter = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setShowCategoryDropdown(false);
  };

  const toggleApplicationFilter = (application) => {
    setSelectedApplications((prev) =>
      prev.includes(application)
        ? prev.filter((a) => a !== application)
        : [...prev, application]
    );
    setShowApplicationDropdown(false);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedApplications([]);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  // Get current page items
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = filteredSolutions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Update dropdown positions when toggled
  const updateCategoryDropdownPosition = () => {
    if (categoryButtonRef.current) {
      const rect = categoryButtonRef.current.getBoundingClientRect();
      setCategoryDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  };

  const updateApplicationDropdownPosition = () => {
    if (applicationButtonRef.current) {
      const rect = applicationButtonRef.current.getBoundingClientRect();
      setApplicationDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showCategoryDropdown &&
        !event.target.closest(".category-dropdown") &&
        categoryButtonRef.current &&
        !categoryButtonRef.current.contains(event.target)
      ) {
        setShowCategoryDropdown(false);
      }
      if (
        showApplicationDropdown &&
        !event.target.closest(".application-dropdown") &&
        applicationButtonRef.current &&
        !applicationButtonRef.current.contains(event.target)
      ) {
        setShowApplicationDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCategoryDropdown, showApplicationDropdown]);

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

          {/* Solutions list with filters applied */}
          <div className="container mx-auto px-4 py-8">
            {/* Filter bar */}
            <div className="relative z-20 bg-quantum-darker/80 backdrop-blur-sm rounded-lg p-4 mb-8 border border-quantum-blue/20">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="text-quantum-cyan flex items-center gap-2">
                  <Filter size={18} />
                  <span className="font-medium">Filters</span>
                </div>

                {/* Category filter dropdown */}
                <div
                  className="relative"
                  style={{ zIndex: 50 }}
                >
                  <button
                    ref={categoryButtonRef}
                    onClick={() => {
                      setShowCategoryDropdown(!showCategoryDropdown);
                      setShowApplicationDropdown(false);
                    }}
                    className="bg-quantum-blue/20 hover:bg-quantum-blue/30 text-quantum-cyan px-3 py-2 rounded-md flex items-center justify-between w-full md:w-44 transition-colors"
                  >
                    <span>
                      {selectedCategories.length > 0
                        ? `Categories (${selectedCategories.length})`
                        : "Category"}
                    </span>
                    <ChevronRight
                      size={16}
                      className={`transition-transform ${
                        showCategoryDropdown ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {showCategoryDropdown && (
                    <div
                      className="category-dropdown absolute top-full left-0 mt-1 bg-quantum-darker border border-quantum-blue/30 rounded-md shadow-lg w-full md:w-64 max-h-60 overflow-y-auto"
                      style={{ zIndex: 100 }}
                    >
                      {availableCategories.map((category) => (
                        <div
                          key={category}
                          onClick={() => toggleCategoryFilter(category)}
                          className="px-3 py-2 hover:bg-quantum-blue/10 cursor-pointer flex items-center"
                        >
                          <div className="w-5 mr-2">
                            {selectedCategories.includes(category) && (
                              <Check
                                size={16}
                                className="text-quantum-cyan"
                              />
                            )}
                          </div>
                          <span>{category}</span>
                        </div>
                      ))}
                      {availableCategories.length === 0 && (
                        <div className="px-3 py-2 text-gray-400">
                          No categories available
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Application filter dropdown */}
                <div
                  className="relative"
                  style={{ zIndex: 50 }}
                >
                  <button
                    ref={applicationButtonRef}
                    onClick={() => {
                      setShowApplicationDropdown(!showApplicationDropdown);
                      setShowCategoryDropdown(false);
                    }}
                    className="bg-quantum-blue/20 hover:bg-quantum-blue/30 text-quantum-cyan px-3 py-2 rounded-md flex items-center justify-between w-full md:w-44 transition-colors"
                  >
                    <span>
                      {selectedApplications.length > 0
                        ? `Applications (${selectedApplications.length})`
                        : "Application"}
                    </span>
                    <ChevronRight
                      size={16}
                      className={`transition-transform ${
                        showApplicationDropdown ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {showApplicationDropdown && (
                    <div
                      className="application-dropdown absolute top-full left-0 mt-1 bg-quantum-darker border border-quantum-blue/30 rounded-md shadow-lg w-full md:w-64 max-h-60 overflow-y-auto"
                      style={{ zIndex: 100 }}
                    >
                      {availableApplications.map((application) => (
                        <div
                          key={application}
                          onClick={() => toggleApplicationFilter(application)}
                          className="px-3 py-2 hover:bg-quantum-blue/10 cursor-pointer flex items-center"
                        >
                          <div className="w-5 mr-2">
                            {selectedApplications.includes(application) && (
                              <Check
                                size={16}
                                className="text-quantum-cyan"
                              />
                            )}
                          </div>
                          <span>{application}</span>
                        </div>
                      ))}
                      {availableApplications.length === 0 && (
                        <div className="px-3 py-2 text-gray-400">
                          No applications available
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Clear filters button */}
                {(selectedCategories.length > 0 ||
                  selectedApplications.length > 0) && (
                  <button
                    onClick={clearFilters}
                    className="bg-quantum-blue/20 hover:bg-quantum-blue/30 px-3 py-2 rounded-md text-quantum-cyan flex items-center gap-2 transition-colors"
                  >
                    <X size={16} />
                    Clear filters
                  </button>
                )}
              </div>

              {/* Active filters display */}
              {(selectedCategories.length > 0 ||
                selectedApplications.length > 0) && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedCategories.map((category) => (
                    <span
                      key={category}
                      className="bg-quantum-blue/30 text-quantum-cyan px-2 py-1 rounded-full text-sm flex items-center"
                    >
                      {category}
                      <button
                        className="ml-2"
                        onClick={() => toggleCategoryFilter(category)}
                        aria-label="Remove filter"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}

                  {selectedApplications.map((app) => (
                    <span
                      key={app}
                      className="bg-quantum-blue/30 text-quantum-cyan px-2 py-1 rounded-full text-sm flex items-center"
                    >
                      {app}
                      <button
                        className="ml-2"
                        onClick={() => toggleApplicationFilter(app)}
                        aria-label="Remove filter"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Cards section */}
            <div
              className="relative"
              style={{ zIndex: 10 }}
            >
              {/* Loading state */}
              {isLoading ? (
                <div className="text-center py-20">
                  <div className="text-quantum-cyan text-xl">
                    Loading solutions...
                  </div>
                </div>
              ) : (
                <>
                  {/* Results count and pagination info */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="text-gray-400">
                      Showing{" "}
                      <span className="text-quantum-cyan">
                        {filteredSolutions.length > 0
                          ? indexOfFirstItem + 1
                          : 0}
                      </span>{" "}
                      -{" "}
                      <span className="text-quantum-cyan">
                        {Math.min(indexOfLastItem, filteredSolutions.length)}
                      </span>{" "}
                      of{" "}
                      <span className="text-quantum-cyan">
                        {filteredSolutions.length}
                      </span>{" "}
                      solutions
                    </div>

                    {totalPages > 1 && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={goToPreviousPage}
                          disabled={currentPage === 1}
                          className={`p-1 rounded ${
                            currentPage === 1
                              ? "text-gray-600 cursor-not-allowed"
                              : "text-quantum-cyan hover:bg-quantum-blue/20"
                          }`}
                          aria-label="Previous page"
                        >
                          <ChevronLeft size={20} />
                        </button>

                        <div className="text-quantum-cyan">
                          Page {currentPage} of {totalPages}
                        </div>

                        <button
                          onClick={goToNextPage}
                          disabled={currentPage === totalPages}
                          className={`p-1 rounded ${
                            currentPage === totalPages
                              ? "text-gray-600 cursor-not-allowed"
                              : "text-quantum-cyan hover:bg-quantum-blue/20"
                          }`}
                          aria-label="Next page"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Cards grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentItems.map((solution) => (
                      <motion.div
                        key={solution.id || solution.slug}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
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
                  </div>

                  {/* No results message */}
                  {filteredSolutions.length === 0 && (
                    <div className="text-center py-20">
                      <p className="text-quantum-cyan text-xl mb-2">
                        No solutions found
                      </p>
                      <p className="text-gray-400">
                        Try adjusting your filters
                      </p>
                      <button
                        onClick={clearFilters}
                        className="mt-4 bg-quantum-blue/30 hover:bg-quantum-blue/50 text-quantum-cyan px-4 py-2 rounded-lg transition-colors"
                      >
                        Clear all filters
                      </button>
                    </div>
                  )}

                  {/* Pagination controls - bottom */}
                  {totalPages > 1 && (
                    <div className="mt-8 flex justify-center">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={goToPreviousPage}
                          disabled={currentPage === 1}
                          className={`px-3 py-2 rounded ${
                            currentPage === 1
                              ? "text-gray-600 cursor-not-allowed"
                              : "text-quantum-cyan hover:bg-quantum-blue/20"
                          }`}
                          aria-label="Previous page"
                        >
                          <ChevronLeft size={16} />
                        </button>

                        {/* Page numbers */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                          .filter(
                            (page) =>
                              // Show current page, first, last and pages around current
                              page === 1 ||
                              page === totalPages ||
                              (page >= currentPage - 1 &&
                                page <= currentPage + 1)
                          )
                          .map((page, index, array) => (
                            <React.Fragment key={page}>
                              {index > 0 && array[index - 1] !== page - 1 && (
                                <span className="px-2 text-gray-600">...</span>
                              )}
                              <button
                                onClick={() => goToPage(page)}
                                className={`px-3 py-1 rounded-md ${
                                  currentPage === page
                                    ? "bg-quantum-blue/30 text-quantum-cyan"
                                    : "hover:bg-quantum-blue/10 text-gray-300"
                                }`}
                              >
                                {page}
                              </button>
                            </React.Fragment>
                          ))}

                        <button
                          onClick={goToNextPage}
                          disabled={currentPage === totalPages}
                          className={`px-3 py-2 rounded ${
                            currentPage === totalPages
                              ? "text-gray-600 cursor-not-allowed"
                              : "text-quantum-cyan hover:bg-quantum-blue/20"
                          }`}
                          aria-label="Next page"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
