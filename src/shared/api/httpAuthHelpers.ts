import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/shared/stores/authStore";

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

interface QueuedPromise {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}

let isRefreshing = false;
let failedQueue: QueuedPromise[] = [];

export const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export async function handleSilentRefreshToken(
  originalRequest: InternalAxiosRequestConfig,
  baseURL: string,
  client: AxiosInstance
): Promise<unknown> {
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    }).then((token) => {
      if (originalRequest.headers && token) {
        originalRequest.headers.Authorization = `Bearer ${token}`;
      }
      return client(originalRequest);
    });
  }

  originalRequest._retry = true;
  isRefreshing = true;

  try {
    const refreshRes = await axios.post<{ data: { accessToken: string } }>(
      `${baseURL}/auth/refresh`,
      {},
      { withCredentials: true }
    );
    const newToken = refreshRes.data.data.accessToken;
    useAuthStore.getState().setToken(newToken);
    processQueue(null, newToken);
    if (originalRequest.headers) {
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
    }
    return client(originalRequest);
  } catch (refreshErr) {
    useAuthStore.getState().clearAuth();
    processQueue(refreshErr, null);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("unauthorized"));
    }
    return Promise.reject(refreshErr);
  } finally {
    isRefreshing = false;
  }
}
