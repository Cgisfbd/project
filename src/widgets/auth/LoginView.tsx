"use client";

import * as React from "react";
import Image from "next/image";
import { GlassCard } from "@/shared/ui/glass-card";
import { LoginForm } from "@/features/auth/ui/LoginForm";
import { ShieldCheck, Sparkles, Quote, Headphones, ChevronRight } from "lucide-react";

export function LoginView() {
  return (
    <div className="relative min-h-screen w-screen overflow-hidden exact-pastel-mesh-bg flex flex-col justify-between p-4 sm:p-6 lg:p-8 select-none">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-300/15 via-orange-200/10 to-transparent pointer-events-none" />

      {/* Top Right Need Support Glass Pill */}
      <div className="absolute top-4 right-6 sm:top-6 sm:right-8 z-20">
        <a
          href="#"
          className="inline-flex items-center gap-3 px-4 py-2 bg-white/20 dark:bg-black/15 hover:bg-white/40 backdrop-blur-2xl border border-white/80 rounded-[0.625rem] text-xs shadow-sm transition-all group"
        >
          <div className="w-7 h-7 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600">
            <Headphones className="w-3.5 h-3.5" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-gray-800 dark:text-gray-200 text-xs">Need Help?</p>
            <p className="text-[10px] text-amber-600 font-semibold">Contact Support</p>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400 transition-transform group-hover:translate-x-1 ml-1" />
        </a>
      </div>

      {/* Main Grid: Left Branding + Right Glass Login Card */}
      <div className="relative z-10 my-auto w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 px-4 sm:px-8 md:px-12 pt-4">
        {/* Left Side: Logo & Branding Section */}
        <div className="flex flex-col items-start justify-center space-y-4 max-w-md">
          {/* Lucid Crystal Glass Logo Box */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-[0.625rem] bg-white/20 dark:bg-black/10 backdrop-blur-2xl border border-white/80 shadow-[0_8px_32px_0_rgba(245,158,11,0.12)] flex items-center justify-center p-0 overflow-hidden transition-all duration-300 hover:scale-105">
            <Image
              src="/logo.png"
              alt="TaleemOne ERP Logo"
              width={128}
              height={128}
              priority
              className="w-full h-full object-cover rounded-[0.625rem]"
            />
          </div>

          {/* Glass Badge + ERP System + TaleemOne ERP */}
          <div className="space-y-3 text-left">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-white/20 dark:bg-black/15 backdrop-blur-2xl border border-white/80 shadow-[0_6px_28px_rgba(0,0,0,0.05)] text-gray-900 dark:text-white text-sm sm:text-base font-extrabold tracking-wide">
              <Sparkles className="w-4.5 h-4.5 sm:w-5 sm:h-5 fill-amber-500 text-amber-500 shrink-0" />
              School & College Management Portal
            </div>

            <div className="space-y-0.5 pt-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                ERP System <br />
                <span className="text-amber-600 dark:text-amber-400 font-black">
                  TaleemOne ERP
                </span>
              </h1>
              <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 font-bold pt-1">
                Powered by Barkat Tech
              </p>
            </div>
          </div>

          {/* Hadith Mubarak Glass Card */}
          <div className="w-full max-w-sm bg-white/20 dark:bg-black/10 backdrop-blur-2xl border border-white/70 shadow-[0_4px_24px_rgba(0,0,0,0.04)] rounded-[0.625rem] p-4 space-y-2 text-left mt-3 sm:mt-5">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs">
              <Quote className="w-4 h-4 text-amber-500 rotate-180 shrink-0" />
              <span>حدیثِ مبارکہ</span>
            </div>
            <p className="text-base sm:text-lg font-serif font-black text-gray-900 dark:text-white leading-relaxed text-right tracking-wide" dir="rtl">
              &quot; طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ &quot;
            </p>
            <p className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 text-right leading-relaxed font-serif" dir="rtl">
              طلبِ علم ہر مسلمان (مرد و عورت) پر فرض ہے۔
            </p>
          </div>
        </div>

        {/* Right Side: Glass Login Card Container */}
        <div className="flex justify-end w-full max-w-[400px] ml-auto pt-6 lg:pt-0">
          <GlassCard className="w-full p-5 sm:p-6">
            <LoginForm />
          </GlassCard>
        </div>
      </div>

      {/* Bottom Security Pill */}
      <div className="relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/40 dark:bg-black/30 backdrop-blur-xl border border-white/60 text-[10px] sm:text-[11px] text-gray-600 dark:text-gray-300 font-medium shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span className="font-bold text-gray-800 dark:text-white">Secure Login</span>
          <span>•</span>
          <span>All data is protected and encrypted</span>
        </div>
      </div>
    </div>
  );
}

export default LoginView;
