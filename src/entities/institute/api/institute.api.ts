import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@/shared/api/httpClient";
import {
  type InstituteSettings,
  DEFAULT_INSTITUTE_SETTINGS,
} from "../model/institute.types";

/**
 * Query Key Factory for Institute Entity
 */
export const instituteKeys = {
  all: ["institute"] as const,
  settings: () => [...instituteKeys.all, "settings"] as const,
};

interface InstituteApiResponse {
  success: boolean;
  data: InstituteSettings;
  message?: string;
}

/**
 * Hook to dynamically fetch Institute Settings from backend.
 * AbortSignal bound to avoid memory leaks.
 * Stale time 5 minutes (rarely changing settings).
 */
export function useInstituteSettings() {
  return useQuery({
    queryKey: instituteKeys.settings(),
    queryFn: async ({ signal }) => {
      try {
        const response = await httpClient.get<InstituteApiResponse | InstituteSettings>(
          "/institute/settings",
          { signal }
        );

        if ("data" in response.data && typeof response.data.data === "object" && response.data.data !== null) {
          return response.data.data as InstituteSettings;
        }

        return response.data as InstituteSettings;
      } catch (error) {
        // Fallback to default institute profile if API offline
        return DEFAULT_INSTITUTE_SETTINGS;
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    placeholderData: DEFAULT_INSTITUTE_SETTINGS,
  });
}
