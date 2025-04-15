"use client";

import React from "react";
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
} from "lucide-react";

// Sidebar item component
const SidebarItem = ({ icon, label, isActive = false, badge, href }) => (
  <Link href={href || "/404"}>
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

  return (
    <div
      className={`w-[280px] h-screen fixed left-0 top-0 border-r border-quantum-blue/30 bg-black/60 backdrop-blur-md flex flex-col pt-16 ${className}`}
    >
      <div className="p-2 flex flex-col gap-1">
        <SidebarItem
          icon={<Home size={18} />}
          label="Dashboard"
          isActive={pathname === "/solutions"}
          href="/solutions"
        />
        <SidebarItem
          icon={<Search size={18} />}
          label="Explore"
          isActive={pathname === "/explore"}
          href="/explore"
        />
        <SidebarItem
          icon={<Star size={18} />}
          label="Featured"
          isActive={pathname === "/featured"}
          href="/featured"
        />
        <SidebarItem
          icon={<Cpu size={18} />}
          label="Hardware"
          isActive={pathname === "/hardware"}
          href="/404"
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
        />
        <SidebarItem
          icon={<MessageSquarePlus size={18} />}
          label="Submit/Advertise"
          isActive={pathname === "/submit"}
          href="/404"
        />
        <SidebarItem
          icon={<Users size={18} />}
          label="Community"
          isActive={pathname === "/community"}
          href="/404"
        />
        <SidebarItem
          icon={<Mail size={18} />}
          label="Newsletter"
          isActive={pathname === "/newsletter"}
          href="/newsletter"
        />
      </div>
    </div>
  );
};

export default SolutionSidebar;
