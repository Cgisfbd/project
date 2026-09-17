"use client";

import * as React from "react";
import { ShieldCheck, LogOut, User, Sliders } from "lucide-react";
import { Button } from "@/shared/ui/button";

export interface ProfileDropdownMenuProps {
  isOpen: boolean;
  displayName: string;
  displayEmail: string;
  roleLabel: string;
  onProfile?: () => void;
  onAdminConsole?: () => void;
  onLogout: () => void;
}

export function ProfileDropdownMenu({
  isOpen,
  displayName,
  displayEmail,
  roleLabel,
  onProfile,
  onAdminConsole,
  onLogout,
}: ProfileDropdownMenuProps) {
  return (
    <div
      role="menu"
      aria-orientation="vertical"
      className={`absolute top-[calc(100%+12px)] right-0 w-[280px] bg-white/80 dark:bg-black/80 rounded-[0.625rem] shadow-2xl transition-all duration-300 origin-top-right overflow-hidden border border-white/80 dark:border-white/15 backdrop-blur-3xl z-50 ${
        isOpen
          ? "opacity-100 scale-100 translate-y-0 visible"
          : "opacity-0 scale-95 -translate-y-2 invisible pointer-events-none"
      }`}
    >
      <div className="p-4 border-b border-gray-200/50 dark:border-white/10 bg-amber-500/15 dark:bg-amber-950/40 relative z-10 text-left">
        <p className="text-sm text-gray-900 dark:text-white font-extrabold truncate">
          {displayName}
        </p>
        <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold truncate">
          {displayEmail}
        </p>
        <div className="inline-flex items-center gap-1.5 px-2 py-1 mt-2 rounded-[0.625rem] bg-amber-500/15 border border-amber-500/30">
          <ShieldCheck size={12} className="text-amber-600" />
          <span className="text-[9px] uppercase tracking-wider text-amber-900 dark:text-amber-300 font-bold">
            {roleLabel}
          </span>
        </div>
      </div>

      <div className="p-2 flex flex-col gap-1 relative z-10 text-left">
        <Button
          variant="ghost"
          type="button"
          role="menuitem"
          onClick={onProfile}
          className="h-auto justify-start flex items-center gap-3 px-3 py-2.5 rounded-[0.625rem] hover:bg-amber-500/10 text-gray-700 dark:text-gray-200 hover:text-amber-600 transition-colors text-xs font-bold w-full text-left cursor-pointer"
        >
          <User size={16} className="text-amber-600 dark:text-amber-400" />
          <span>My Profile</span>
        </Button>

        {onAdminConsole && (
          <Button
            variant="ghost"
            type="button"
            role="menuitem"
            onClick={onAdminConsole}
            className="h-auto justify-start flex items-center gap-3 px-3 py-2.5 rounded-[0.625rem] hover:bg-amber-500/10 text-gray-700 dark:text-gray-200 hover:text-amber-600 transition-colors text-xs font-bold w-full text-left cursor-pointer"
          >
            <Sliders size={16} className="text-amber-600 dark:text-amber-400" />
            <span>Administration Console</span>
          </Button>
        )}

        <Button
          variant="ghost"
          type="button"
          role="menuitem"
          onClick={onLogout}
          className="h-auto justify-start flex items-center gap-3 px-3 py-2.5 rounded-[0.625rem] hover:bg-red-500/10 text-gray-700 dark:text-gray-200 hover:text-red-600 transition-colors text-xs font-bold w-full text-left cursor-pointer"
        >
          <LogOut size={16} className="text-gray-500" />
          <span>Secure Logout</span>
        </Button>
      </div>
    </div>
  );
}

export default ProfileDropdownMenu;
