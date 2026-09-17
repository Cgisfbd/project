"use client";

import * as React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export interface BrandIdentityProps {
  variant?: "sidebar" | "sidebar-collapsed" | "login";
  name?: string;
  logoUrl?: string;
}

export function BrandIdentity({
  variant = "sidebar",
  name = "TaleemOne ERP",
  logoUrl = "/logo.png",
}: BrandIdentityProps) {
  const displayName = name || "TaleemOne ERP";
  const displayLogo = logoUrl || "/logo.png";

  if (variant === "sidebar-collapsed") {
    return (
      <div className="relative group flex items-center justify-center mx-auto">
        <div className="w-[60px] h-[60px] rounded-[0.625rem] bg-white/20 dark:bg-black/50 backdrop-blur-2xl border border-white/60 dark:border-white/30 shadow-[0_8px_24px_-4px_rgba(167,139,250,0.35)] flex items-center justify-center p-2 transition-all duration-300 group-hover:scale-110 group-hover:border-purple-400 group-hover:shadow-[0_12px_28px_-4px_rgba(167,139,250,0.45)]">
          <Image
            src={displayLogo}
            alt={displayName}
            width={44}
            height={44}
            className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 p-2 bg-white/18 dark:bg-black/40 backdrop-blur-2xl border border-white/60 dark:border-white/15 rounded-[0.625rem] shadow-[0_6px_20px_-4px_rgba(167,139,250,0.25)] w-full overflow-hidden transition-all duration-300 hover:border-purple-300">
      <div className="relative w-12 h-12 rounded-[0.625rem] bg-white/30 dark:bg-black/50 backdrop-blur-xl border border-white/60 shadow-xs flex items-center justify-center p-1.5 shrink-0 overflow-hidden">
        <Image
          src={displayLogo}
          alt={displayName}
          width={36}
          height={36}
          className="w-full h-full object-contain filter drop-shadow-xs"
        />
      </div>
      <div className="flex flex-col justify-center overflow-hidden text-left">
        <div className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-purple-600 fill-purple-600 shrink-0" />
          <span className="text-[9px] font-black uppercase tracking-wider text-purple-700 dark:text-purple-300 truncate">
            Enterprise ERP
          </span>
        </div>
        <h2 className="text-sm font-black text-gray-900 dark:text-white tracking-tight leading-tight truncate">
          {displayName}
        </h2>
        <span className="text-[9.5px] font-semibold text-gray-500 dark:text-gray-400 tracking-tight leading-none truncate">
          Powered by Barkat Tech
        </span>
      </div>
    </div>
  );
}

export default BrandIdentity;
