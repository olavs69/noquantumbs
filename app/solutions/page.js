import React from "react";
import Navbar from "@/components/Navbar";
import SolutionHero from "@/components/SolutionHero";
import SolutionContent from "@/components/SolutionContent";
import SolutionSidebar from "@/components/SolutionSidebar";

const SolutionPage = async () => {
  return (
    <div className="min-h-screen bg-quantum-dark text-white">
      <Navbar />
      <div className="flex max-w-screen overflow-hidden">
        {/* Sidebar - hidden on mobile, shown on desktop */}
        <div className="hidden lg:block lg:w-[280px] flex-shrink-0">
          <SolutionSidebar />
        </div>

        {/* Main content area */}
        <div className="flex-grow w-full max-w-full overflow-x-hidden">
          <div className="pt-16 relative">
            <SolutionHero />
            <SolutionContent />
          </div>
        </div>

        {/* Mobile sidebar implementation is now handled with proper media queries in the SolutionSidebar component itself */}
      </div>
    </div>
  );
};

export default SolutionPage;
