import * as React from "react";
import { Sparkles, Shield, Layers, Users } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 select-none">
      {/* Top Banner Card */}
      <div className="relative overflow-hidden rounded-[0.625rem] bg-white/30 dark:bg-black/40 backdrop-blur-2xl border border-white/70 dark:border-white/10 p-8 shadow-xl">
        <div className="relative z-10 flex flex-col gap-2 max-w-2xl text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[0.625rem] bg-amber-500/15 border border-amber-500/30 w-fit">
            <Sparkles size={14} className="text-amber-600 dark:text-amber-400" />
            <span className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
              TaleemOne ERP • Architecture Ready
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Institutional Command Cockpit
          </h2>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Powered by Barkat Tech. Built with Liquid Crystal Glassmorphism, Feature-Sliced Design (FSD), and 3-Tier Internal RBAC.
          </p>
        </div>
      </div>

      {/* Overview Stat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-[0.625rem] bg-white/30 dark:bg-black/30 backdrop-blur-2xl border border-white/70 dark:border-white/10 p-6 shadow-md transition-all hover:bg-white/40 dark:hover:bg-black/40 text-left">
          <div className="w-10 h-10 rounded-[0.625rem] bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mb-4 text-amber-600 dark:text-amber-400">
            <Shield size={20} />
          </div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Role-Based Access</h3>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">
            Strict 3 internal roles (Super Admin, Admin, Staff). Zero student/parent access.
          </p>
        </div>

        <div className="rounded-[0.625rem] bg-white/30 dark:bg-black/30 backdrop-blur-2xl border border-white/70 dark:border-white/10 p-6 shadow-md transition-all hover:bg-white/40 dark:hover:bg-black/40 text-left">
          <div className="w-10 h-10 rounded-[0.625rem] bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mb-4 text-amber-600 dark:text-amber-400">
            <Layers size={20} />
          </div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white">Liquid Glassmorphism</h3>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">
            Universal backdrop blur, translucent glass, and dynamic pastel aurora mesh.
          </p>
        </div>

        <div className="rounded-[0.625rem] bg-white/30 dark:bg-black/30 backdrop-blur-2xl border border-white/70 dark:border-white/10 p-6 shadow-md transition-all hover:bg-white/40 dark:hover:bg-black/40 text-left">
          <div className="w-10 h-10 rounded-[0.625rem] bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mb-4 text-amber-600 dark:text-amber-400">
            <Users size={20} />
          </div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white">FSD Architecture</h3>
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">
            Clean layers (app, widgets, features, entities, shared) with strict line limits.
          </p>
        </div>
      </div>
    </div>
  );
}
