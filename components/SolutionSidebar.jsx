"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  Star,
  Users,
  Mail,
  Heart,
  MessageSquarePlus,
  Cpu,
  Menu,
  X,
} from "lucide-react";

// Sidebar item component
const SidebarItem = ({
  icon,
  label,
  isActive = false,
  badge,
  href,
  onClick,
}) => (
  <Link
    href={href || "/404"}
    onClick={onClick}
  >
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-md cursor-pointer transition-colors ${
        isActive
          ? "bg-quantum-blue/30 text-quantum-cyan"
          : "hover:bg-quantum-darker/80 hover:text-quantum-cyan"
      }`}
    >
      <div className={isActive ? "text-quantum-cyan" : "text-gray-500"}>
        {icon}
      </div>
      <span
        className={`text-sm font-quantum whitespace-normal ${
          isActive ? "font-medium" : "font-normal"
        }`}
      >
        {label}
      </span>
      {badge && (
        <div className="ml-auto px-1.5 py-0.5 rounded-md text-xs bg-quantum-darker text-quantum-cyan">
          {badge}
        </div>
      )}
    </div>
  </Link>
);

const SolutionSidebar = ({ className = "" }) => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile sidebar when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  // Close sidebar when clicking a link on mobile
  const handleItemClick = () => {
    if (isMobile) {
      setIsMobileOpen(false);
    }
  };

  // Disable body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobile && isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobile, isMobileOpen]);

  // Sidebar content
  const sidebarContent = (
    <>
      <div className="p-2 flex flex-col gap-1">
        <SidebarItem
          icon={<Home size={18} />}
          label="Dashboard"
          isActive={pathname === "/solutions"}
          href="/solutions"
          onClick={handleItemClick}
        />
        <SidebarItem
          icon={<Search size={18} />}
          label="Explore"
          isActive={pathname === "/explore"}
          href="/explore"
          onClick={handleItemClick}
        />
        <SidebarItem
          icon={<Star size={18} />}
          label="Featured"
          isActive={pathname === "/featured"}
          href="/featured"
          onClick={handleItemClick}
        />
        <SidebarItem
          icon={<Cpu size={18} />}
          label="Hardware"
          isActive={pathname === "/hardware"}
          href="/404"
          onClick={handleItemClick}
        />
      </div>

      <div className="mt-4 border-t border-quantum-blue/20 pt-4 px-2">
        <div className="text-xs text-gray-500 font-medium font-quantum px-3 pb-2">
          RESOURCES
        </div>
        <SidebarItem
          icon={<Heart size={18} />}
          label="Donate/Support"
          isActive={pathname === "/donate"}
          href="/404"
          onClick={handleItemClick}
        />
        <SidebarItem
          icon={<MessageSquarePlus size={18} />}
          label="Submit/Advertise"
          isActive={pathname === "/submit"}
          href="/404"
          onClick={handleItemClick}
        />
        <SidebarItem
          icon={<Users size={18} />}
          label="Community"
          isActive={pathname === "/community"}
          href="/404"
          onClick={handleItemClick}
        />
        <SidebarItem
          icon={<Mail size={18} />}
          label="Newsletter"
          isActive={pathname === "/newsletter"}
          href="/newsletter"
          onClick={handleItemClick}
        />
      </div>
    </>
  );

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="fixed bottom-4 right-4 z-50 bg-quantum-blue text-black p-3 rounded-full shadow-lg hover:bg-quantum-cyan transition-colors"
          aria-label={isMobileOpen ? "Close sidebar" : "Open sidebar"}
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      )}

      {/* Desktop sidebar */}
      {!isMobile && (
        <div
          className={`w-[280px] h-screen fixed left-0 top-0 border-r border-quantum-blue/30 bg-black/60 backdrop-blur-md flex flex-col pt-16 ${className}`}
        >
          {sidebarContent}
        </div>
      )}

      {/* Mobile sidebar - slide in from left */}
      {isMobile && (
        <div
          className={`fixed inset-0 z-40 transition-all duration-300 ${
            isMobileOpen ? "visible" : "invisible"
          }`}
          onClick={() => setIsMobileOpen(false)}
        >
          {/* Backdrop */}
          <div
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
              isMobileOpen ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Sidebar */}
          <div
            className={`w-[280px] h-screen fixed left-0 top-0 border-r border-quantum-blue/30 bg-black/80 backdrop-blur-md flex flex-col pt-16 z-50 transition-transform duration-300 transform ${
              isMobileOpen ? "translate-x-0" : "-translate-x-full"
            } overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

export default SolutionSidebar;
