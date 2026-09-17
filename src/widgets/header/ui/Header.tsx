"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Search, Bell } from "lucide-react";
import { menuItems } from "@/shared/config/navigation";
import { GlassInput } from "@/shared/ui/glass-input";
import { Button } from "@/shared/ui/button";
import { ProfileDropdown } from "./ProfileDropdown";

export function Header() {
  const pathname = usePathname();
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getPageTitle = () => {
    const exactMatch = menuItems.find((item) => item.path === pathname);
    if (exactMatch) return exactMatch.name;

    const partialMatch = menuItems.find(
      (item) => item.path !== "/dashboard" && pathname?.startsWith(item.path)
    );
    if (partialMatch) return partialMatch.name;

    if (pathname === "/dashboard") return "Dashboard Overview";

    if (pathname) {
      const parts = pathname.split("/").filter(Boolean);
      const page = parts[parts.length - 1];
      return page.charAt(0).toUpperCase() + page.slice(1).replace("-", " ");
    }
    return "Dashboard Overview";
  };

  return (
    <header className="h-[88px] w-full relative grid grid-cols-3 items-center px-8 z-40 sticky top-0 gap-4 transition-all duration-300 select-none">
      {/* Left: Dynamic Page Title */}
      <div className="flex flex-col justify-center relative z-10 justify-self-start">
        <h1 className="text-[24px] sm:text-[26px] font-black text-gray-900 dark:text-white tracking-tight drop-shadow-xs">
          {getPageTitle()}
        </h1>
      </div>

      {/* Center: Omni-Search Bar (Ctrl + K) */}
      <div className="relative group flex items-center justify-self-center z-10">
        <Search
          size={20}
          className="absolute left-5 text-amber-600 group-focus-within:text-amber-700 transition-colors z-10 pointer-events-none"
        />

        <GlassInput
          ref={searchInputRef}
          type="text"
          placeholder="Search anywhere... (Ctrl + K)"
          className="w-[450px] sm:w-[500px] h-[52px] pl-14 pr-20 bg-white/30 dark:bg-black/40 border border-white/70 dark:border-white/15 rounded-[0.625rem] text-[15px] font-medium text-gray-900 dark:text-white placeholder:text-gray-500 outline-none focus:outline-none focus-visible:outline-none focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 focus:bg-white/45 focus:w-[540px] shadow-xs backdrop-blur-2xl transition-all duration-500"
        />
      </div>

      {/* Right: Notification Bell & Profile Dropdown */}
      <div className="flex items-center gap-4 justify-self-end relative z-10">
        <Button
          variant="ghost"
          size="icon"
          className="relative h-10 w-10 text-gray-700 dark:text-gray-200 hover:text-amber-600 rounded-full hover:bg-white/30 cursor-pointer"
          title="Notifications"
        >
          <Bell size={22} />
          <span className="absolute top-1.5 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-[1.5px] border-white/80 shadow-xs animate-pulse" />
        </Button>

        <ProfileDropdown />
      </div>
    </header>
  );
}

export default Header;
