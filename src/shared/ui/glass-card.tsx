import * as React from "react";
import { cn } from "@/shared/lib/utils";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative z-10 w-full bg-white/35 dark:bg-black/30 backdrop-blur-[24px] rounded-[0.625rem] border border-white/70 dark:border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-6 sm:p-7 transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default GlassCard;
