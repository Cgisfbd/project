import * as React from "react";
import { cn } from "@/shared/lib/utils";

export interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const GlassInput = React.forwardRef<HTMLInputElement, GlassInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full h-10 px-4 py-2 rounded-[0.625rem] bg-white/40 dark:bg-black/30 backdrop-blur-2xl border border-white/70 dark:border-white/10 outline-none text-gray-900 dark:text-white transition-all font-medium text-xs placeholder:text-gray-400 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/60",
          className
        )}
        {...props}
      />
    );
  }
);

GlassInput.displayName = "GlassInput";

export default GlassInput;
