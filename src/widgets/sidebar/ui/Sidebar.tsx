"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandIdentity } from "@/shared/ui/brand-identity";
import { menuItems } from "@/shared/config/navigation";
import { useSidebarStore } from "@/shared/stores/sidebarStore";
import { useInstituteSettings } from "@/entities/institute";

export function Sidebar() {
  const pathname = usePathname();
  const currentPath = pathname ?? "";
  const { collapsed, setCollapsed, isPinned, togglePinned } = useSidebarStore();
  const { data: institute } = useInstituteSettings();

  return (
    <aside
      onMouseEnter={() => {
        if (!isPinned) setCollapsed(false);
      }}
      onMouseLeave={() => {
        if (!isPinned) setCollapsed(true);
      }}
      className={`relative h-screen flex flex-col transition-all duration-500 ease-smooth-cockpit bg-black/[0.01] z-50 select-none ${
        collapsed ? "w-[100px]" : "w-72"
      }`}
    >
      {/* Header Area (Logo & Toggle Pin) */}
      <div
        onClick={togglePinned}
        className="relative flex items-center justify-center w-full h-[88px] shrink-0 z-10 pt-2 cursor-pointer group"
        title={isPinned ? "Unpin Sidebar" : "Pin Sidebar"}
      >
        <div
          className={`absolute w-[240px] transition-all duration-500 ease-smooth-cockpit ${
            collapsed ? "opacity-0 -translate-x-10 scale-95 pointer-events-none" : "opacity-100 translate-x-0 scale-100"
          }`}
          style={{ left: "16px" }}
        >
          <BrandIdentity
            variant="sidebar"
            name={institute?.name}
            logoUrl={institute?.logoUrl}
          />
        </div>
        <div
          className={`absolute transition-all duration-500 ease-smooth-cockpit ${
            collapsed ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-10 scale-90 pointer-events-none"
          }`}
        >
          <BrandIdentity
            variant="sidebar-collapsed"
            name={institute?.name}
            logoUrl={institute?.logoUrl}
          />
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {menuItems.map((item) => {
          const isActive = currentPath === item.path || (currentPath.startsWith(item.path) && item.path !== "/dashboard");
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center h-[52px] rounded-[0.625rem] transition-all duration-500 ease-smooth-cockpit group relative overflow-hidden ${
                isActive
                  ? "bg-amber-500/15 dark:bg-amber-500/20 backdrop-blur-md border-l-4 border-amber-500 text-amber-950 dark:text-amber-200 font-extrabold shadow-xs"
                  : "text-gray-700 dark:text-gray-300 border-l-4 border-transparent hover:text-amber-700 dark:hover:text-amber-300 hover:bg-white/30"
              }`}
            >
              <div className="w-[76px] h-full flex items-center justify-center shrink-0">
                <Icon
                  size={22}
                  className={`transition-all duration-500 ease-smooth-cockpit ${
                    isActive ? "text-amber-600 dark:text-amber-400" : "text-gray-500 group-hover:text-amber-600 dark:group-hover:text-amber-400"
                  }`}
                />
              </div>

              <div
                className={`flex items-center overflow-hidden transition-all duration-500 ease-smooth-cockpit ${
                  collapsed ? "w-0 opacity-0" : "w-[140px] opacity-100"
                }`}
              >
                <span className={`font-semibold tracking-wide text-[15px] whitespace-nowrap ${isActive ? "font-extrabold" : ""}`}>
                  {item.name}
                </span>
              </div>

              {collapsed && (
                <div className="absolute left-16 bg-white/50 dark:bg-black/50 backdrop-blur-2xl border border-amber-500/30 text-amber-950 dark:text-amber-200 px-3 py-1.5 rounded-[0.625rem] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 text-xs font-bold shadow-lg">
                  {item.name}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Powered By Badge */}
      <div className="mt-auto p-3 z-10">
        <div
          className={`flex items-center justify-center w-full rounded-full bg-white/25 dark:bg-black/40 border border-white/60 dark:border-white/10 backdrop-blur-md shadow-2xs transition-all duration-500 ease-smooth-cockpit ${
            collapsed ? "h-0 opacity-0 overflow-hidden" : "h-[24px] px-3 py-1.5"
          }`}
        >
          <div className="text-[7px] text-gray-700 dark:text-white/70 font-bold tracking-widest flex items-center whitespace-nowrap">
            POWERED BY
            <span className="text-amber-600 dark:text-amber-400 font-black tracking-widest ml-1">
              BARKAT TECH
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
