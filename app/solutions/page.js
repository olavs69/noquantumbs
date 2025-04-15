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
      <SolutionSidebar />
      <Navbar />
      <div className="pt-16 relative">
        <SolutionHero />
        <SolutionContent
          newSolutions={newSolutions}
          featuredSolutions={featuredSolutions}
        />
      </div>
    </div>
  );
};

export default SolutionPage;
