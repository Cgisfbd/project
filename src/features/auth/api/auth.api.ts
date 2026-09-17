import { useMutation, useQueryClient } from "@tanstack/react-query";
import { httpClient } from "@/shared/api/httpClient";
import { LoginRequest, LoginResponseDto } from "../types/auth.types";
import { useAuthStore } from "@/shared/stores/authStore";

export const useLoginMutation = () => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const setTempAuth = useAuthStore((state) => state.setTempAuth);

  return useMutation({
    mutationFn: async ({
      data,
      signal,
    }: {
      data: LoginRequest;
      signal?: AbortSignal;
    }) => {
      // Generate unique idempotency key for this login attempt
      const idempotencyKey = crypto.randomUUID();
      
      const response = await httpClient.post<LoginResponseDto>(
        "/auth/login",
        data,
        {
          signal,
          headers: {
            "X-Idempotency-Key": idempotencyKey,
          },
        }
      );
      return response.data;
    },
    onSuccess: (response) => {
      if (response.success && response.data.requiresPasswordChange) {
        // First login — store temp token, redirect to force-change-password
        setTempAuth(response.data.accessToken ?? "", true);
      } else if (response.success && response.data.accessToken) {
        setAuth(response.data.accessToken, response.data.user);
      }
    },
  });
};

export const useLogoutMutation = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ signal }: { signal?: AbortSignal }) => {
      const idempotencyKey = crypto.randomUUID();
      await httpClient.post(
        "/auth/logout",
        {},
        {
          signal,
          headers: {
            "X-Idempotency-Key": idempotencyKey,
          },
        }
      );
    },
    onSettled: () => {
      // Regardless of API success, clear local state and cache
      clearAuth();
      queryClient.clear();
      window.location.href = "/login";
    },
  });
};

export const useForceChangePasswordMutation = () => {
  const clearTempToken = useAuthStore((state) => state.clearTempToken);

  return useMutation({
    mutationFn: async ({
      newPassword,
      confirmPassword,
    }: {
      newPassword: string;
      confirmPassword: string;
    }) => {
      const tempToken = useAuthStore.getState().tempToken;
      const idempotencyKey = crypto.randomUUID();

      const response = await httpClient.post(
        "/auth/force-change-password",
        { newPassword, confirmPassword },
        {
          headers: {
            Authorization: `Bearer ${tempToken}`,
            "X-Idempotency-Key": idempotencyKey,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      clearTempToken();
    },
  });
};
