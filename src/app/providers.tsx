"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster, toast } from "sonner";
import { getQueryClient } from "@/shared/api/queryClient";

export interface ProvidersProps {
  children: React.ReactNode;
}

interface CustomErrorDetail {
  message?: string | string[];
}

function isCustomEventWithDetail(e: Event): e is CustomEvent<CustomErrorDetail> {
  return (
    typeof window !== "undefined" &&
    e instanceof CustomEvent &&
    typeof e.detail === "object" &&
    e.detail !== null
  );
}

export function Providers({ children }: ProvidersProps) {
  const queryClient = getQueryClient();
  const router = useRouter();

  React.useEffect(() => {
    const handleUnauthorized = () => {
      queryClient.clear();
      router.replace("/login");
      toast.error("Session expired. Please sign in again.");
    };

    const handleForbidden = (e: Event) => {
      if (isCustomEventWithDetail(e)) {
        const detail = e.detail;
        const msg = Array.isArray(detail.message)
          ? detail.message.join(", ")
          : detail.message || "Access denied. Insufficient institutional permissions.";
        toast.error(msg);
      } else {
        toast.error("Access denied. Insufficient institutional permissions.");
      }
    };

    const handleServerError = (e: Event) => {
      if (isCustomEventWithDetail(e)) {
        const detail = e.detail;
        const msg =
          typeof detail.message === "string"
            ? detail.message
            : "Internal server error. Please retry later.";
        toast.error(msg);
      } else {
        toast.error("Internal server error. Please retry later.");
      }
    };

    window.addEventListener("unauthorized", handleUnauthorized);
    window.addEventListener("forbidden", handleForbidden);
    window.addEventListener("server-error", handleServerError);

    return () => {
      window.removeEventListener("unauthorized", handleUnauthorized);
      window.removeEventListener("forbidden", handleForbidden);
      window.removeEventListener("server-error", handleServerError);
    };
  }, [router, queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="top-right"
        richColors
        closeButton
        className="toaster"
        toastOptions={{
          className:
            "backdrop-blur-2xl bg-white/85 dark:bg-[#151210]/85 border border-white/80 dark:border-white/15 shadow-2xl rounded-[0.625rem] text-xs font-bold text-gray-900 dark:text-white",
          style: {
            borderRadius: "0.625rem",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default Providers;
