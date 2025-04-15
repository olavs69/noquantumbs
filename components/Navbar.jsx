"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-quantum-darker/90 backdrop-blur-lg shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a
              href="/"
              className="flex items-center space-x-2 text-quantum-cyan"
            >
              <Image
                src="/logo.png"
                alt="NoQuantumBS Logo"
                width={320}
                height={320}
                className="h-8 w-8"
              />
              <span className="text-xl font-bold font-quantum tracking-wider">
                No<span className="text-quantum-glow">QuantumBS</span>
              </span>
            </a>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a
              href="/#contact"
              className="font-quantum text-gray-300 hover:text-quantum-cyan transition-colors duration-300"
            >
              Contact
            </a>
            <a
              href="/solutions"
              className="font-quantum text-gray-300 hover:text-quantum-cyan transition-colors duration-300"
            >
              Solutions
            </a>
            <Button
              className="bg-quantum-blue hover:bg-quantum-cyan font-quantum text-black"
              onClick={() => {
                window.location.href = "/#quantum-assessment";
              }}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-quantum-glow focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-quantum-darker/90 backdrop-blur-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="/#contact"
              className="block px-3 py-2 rounded-md text-base font-medium font-quantum text-gray-300 hover:text-quantum-cyan hover:bg-quantum-blue/10 transition-colors duration-300"
            >
              Contact
            </a>
            <a
              href="/solutions"
              className="block px-3 py-2 rounded-md text-base font-medium font-quantum text-gray-300 hover:text-quantum-cyan hover:bg-quantum-blue/10 transition-colors duration-300"
            >
              Solutions
            </a>
            <div className="px-3 py-2">
              <Button
                className="w-full bg-quantum-blue hover:bg-quantum-cyan font-quantum text-black"
                onClick={() => {
                  window.location.href = "/#quantum-assessment";
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
