import React from "react";
import Navbar from "@/components/Navbar";
import SolutionHero from "@/components/SolutionHero";
import SolutionContent from "@/components/SolutionContent";
import { getNewSolutions, getFeaturedSolutions } from "@/lib/solutions";
import SolutionSidebar from "@/components/SolutionSidebar";

const SolutionPage = async () => {
  const [newSolutions, featuredSolutions] = await Promise.all([
    getNewSolutions(),
    getFeaturedSolutions(),
  ]);

  return (
    <div className="min-h-screen bg-quantum-dark text-white">
      <Navbar />
      <div className="flex">
        {/* Sidebar - hidden on mobile, shown on desktop */}
        <div className="hidden lg:block lg:w-[280px] flex-shrink-0">
          <SolutionSidebar />
        </div>

        {/* Main content area */}
        <div className="flex-grow">
          <div className="pt-16 relative">
            <SolutionHero />
            <SolutionContent
              newSolutions={newSolutions}
              featuredSolutions={featuredSolutions}
            />
          </div>
        </div>

        {/* Mobile sidebar - rendered in the component itself */}
        <div className="lg:hidden">
          <SolutionSidebar />
        </div>
      </div>
    </div>
  );
};

export default SolutionPage;
