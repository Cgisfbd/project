"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/stores/authStore";
import { httpClient } from "@/shared/api/httpClient";
import { ChevronDown } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { isNode } from "@/shared/lib/typeGuards";
import { ProfileDropdownMenu } from "./ProfileDropdownMenu";

export function ProfileDropdown() {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, clearAuth } = useAuthStore();

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (dropdownRef.current && isNode(event.target) && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside, { passive: true });
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleLogout = async () => {
    setIsOpen(false);
    try {
      await httpClient.post("/auth/logout");
    } catch {
      // Best-effort server notification
    } finally {
      clearAuth();
      router.push("/login");
    }
  };

  const getInitials = (name?: string) =>
    name ? name.trim().split(/\s+/).slice(0, 2).map((p) => p[0]).join("").toUpperCase() : "SA";

  const role = user?.role || "SUPER_ADMIN";
  const roleLabel = role === "SUPER_ADMIN" ? "Super Admin" : role === "ADMIN" ? "Administrator" : "Staff Member";
  const displayName = user?.fullName || user?.email || "Super Administrator";
  const displayEmail = user?.email || "admin@taleemone.edu";

  const handleProfileClick = () => {
    setIsOpen(false);
    router.push("/dashboard/profile");
  };

  const handleAdminConsoleClick = () => {
    setIsOpen(false);
    router.push("/dashboard/admin-console");
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="h-auto p-0 hover:bg-transparent flex items-center gap-3 pl-2 cursor-pointer group outline-none"
      >
        <div
          className={`w-10 h-10 rounded-full border-2 border-amber-500 bg-amber-500/10 dark:bg-amber-950/40 p-[2px] shadow-sm shadow-amber-500/20 transition-all ${
            isOpen ? "ring-2 ring-amber-400" : ""
          }`}
        >
          <div className="w-full h-full rounded-full bg-white/60 dark:bg-black/40 backdrop-blur-md flex items-center justify-center overflow-hidden relative font-black text-amber-600 dark:text-amber-400 text-sm">
            {getInitials(displayName)}
          </div>
        </div>
        <div className="hidden md:flex flex-col items-start text-left">
          <span className="text-sm font-extrabold text-gray-900 dark:text-white group-hover:text-amber-600 transition-colors">
            {displayName}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-400 font-extrabold flex items-center gap-1">
            {roleLabel}{" "}
            <ChevronDown
              size={12}
              className={`transition-transform duration-300 ${isOpen ? "rotate-180 text-amber-600" : ""}`}
            />
          </span>
        </div>
      </Button>

      <ProfileDropdownMenu
        isOpen={isOpen}
        displayName={displayName}
        displayEmail={displayEmail}
        roleLabel={roleLabel}
        onProfile={handleProfileClick}
        onAdminConsole={role === "SUPER_ADMIN" || role === "ADMIN" ? handleAdminConsoleClick : undefined}
        onLogout={handleLogout}
      />
    </div>
  );
}

export default ProfileDropdown;
