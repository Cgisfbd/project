"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/widgets/sidebar/ui/Sidebar";
import { Header } from "@/widgets/header/ui/Header";
import { useSidebarStore } from "@/shared/stores/sidebarStore";
import { useAuthStore } from "@/shared/stores/authStore";

export interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const router = useRouter();
  const { token, isAuthenticated, hasHydrated } = useAuthStore();
  const { collapsed } = useSidebarStore();
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    if (!hasHydrated) return;
    const currentToken = useAuthStore.getState().token;
    if (!currentToken && !isAuthenticated) {
      router.replace("/login");
    } else {
      setIsReady(true);
    }
  }, [hasHydrated, isAuthenticated, router]);

  if (!hasHydrated && !isReady) {
    // Initial render / SSR hydration fallback
  }

  return (
    <div className="flex h-screen w-full relative overflow-hidden exact-pastel-mesh-bg text-gray-900 dark:text-white select-none">
      {/* L-SHAPE SEAMLESS GLASS BASE */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div
          className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-2xl transition-all duration-500 ease-smooth-cockpit pointer-events-auto overflow-hidden shadow-xs border border-white/60 dark:border-white/10"
          style={{
            willChange: "clip-path",
            clipPath: collapsed
              ? "polygon(0 0, 100% 0, 100% 56px, calc(100% - 2px) 68px, calc(100% - 9px) 79px, calc(100% - 20px) 86px, calc(100% - 32px) 88px, 132px 88px, 120px 90px, 109px 97px, 102px 108px, 100px 120px, 100px calc(100% - 32px), 98px calc(100% - 20px), 91px calc(100% - 9px), 80px calc(100% - 2px), 68px 100%, 0 100%)"
              : "polygon(0 0, 100% 0, 100% 56px, calc(100% - 2px) 68px, calc(100% - 9px) 79px, calc(100% - 20px) 86px, calc(100% - 32px) 88px, 320px 88px, 308px 90px, 297px 97px, 290px 108px, 288px 120px, 288px calc(100% - 32px), 286px calc(100% - 20px), 279px calc(100% - 9px), 268px calc(100% - 2px), 256px 100%, 0 100%)",
          }}
        />
      </div>

      {/* L-SHAPE GOLD ACCENT OUTLINE */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-amber-500/25 dark:bg-amber-400/25" />
        <div className="absolute top-0 left-0 bottom-0 w-[1px] bg-amber-500/25 dark:bg-amber-400/25" />
        <div className="absolute top-0 right-0 h-[56px] w-[1px] bg-amber-500/25 dark:bg-amber-400/25" />
        <div
          className={`absolute bottom-0 left-0 h-[1px] bg-amber-500/25 dark:bg-amber-400/25 transition-all duration-500 ease-smooth-cockpit ${
            collapsed ? "w-[68px]" : "w-[256px]"
          }`}
        />
        <div
          className={`absolute top-[120px] bottom-[32px] w-[1px] bg-amber-500/25 dark:bg-amber-400/25 transition-all duration-500 ease-smooth-cockpit ${
            collapsed ? "left-[100px]" : "left-[288px]"
          }`}
        />
        <div
          className={`absolute top-[88px] right-[32px] h-[1px] bg-amber-500/25 dark:bg-amber-400/25 transition-all duration-500 ease-smooth-cockpit ${
            collapsed ? "left-[132px]" : "left-[320px]"
          }`}
        />
        <div className="absolute top-[56px] right-0 w-[32px] h-[32px] border-b border-r border-amber-500/25 dark:border-amber-400/25 rounded-br-[32px]" />
        <div
          className={`absolute bottom-0 w-[32px] h-[32px] border-b border-r border-amber-500/25 dark:border-amber-400/25 rounded-br-[32px] transition-all duration-500 ease-smooth-cockpit ${
            collapsed ? "left-[68px]" : "left-[256px]"
          }`}
        />
        <div
          className={`absolute top-[88px] w-[32px] h-[32px] border-t border-l border-amber-500/25 dark:border-amber-400/25 rounded-tl-[32px] transition-all duration-500 ease-smooth-cockpit ${
            collapsed ? "left-[100px]" : "left-[288px]"
          }`}
        />
      </div>

      {/* FOREGROUND COCKPIT CONTENT */}
      <div className="absolute inset-0 z-30 flex w-full">
        <Sidebar />
        <div className="flex-1 flex flex-col relative min-w-0 overflow-hidden">
          <Header />
          <main className="flex-1 w-full p-4 md:p-6 lg:p-8 overflow-y-auto relative z-10 flex flex-col">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashboardShell;
