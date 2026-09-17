import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "@/shared/stores/authStore";
import { getCookie, handleSilentRefreshToken } from "./httpAuthHelpers";

declare module "axios" {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

export interface ApiErrorResponse {
  statusCode: number;
  message: string | string[];
  error?: string;
  errors?: Record<string, string[]>;
}

export const httpClient: AxiosInstance = axios.create({
  baseURL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Inject Bearer Token & CSRF
httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;
    const isRelativeOrInternal =
      !config.url || !config.url.startsWith("http") || config.url.startsWith(baseURL);
    if (token && config.headers && isRelativeOrInternal) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const mutatingMethods = ["post", "put", "patch", "delete"];
    if (config.method && mutatingMethods.includes(config.method.toLowerCase())) {
      const csrfToken = getCookie("csrf_token");
      if (csrfToken && config.headers) {
        config.headers["x-csrf-token"] = csrfToken;
      }
    }

    return config;
  },
  (error: unknown) => Promise.reject(error)
);

// Response Interceptor: Silent Token Refresh Mutex Queue
httpClient.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (axios.isAxiosError<ApiErrorResponse>(error)) {
      const status = error.response?.status;
      const originalRequest = error.config;

      if (status === 401 && originalRequest && !originalRequest._retry && !originalRequest.url?.includes("/auth/")) {
        return handleSilentRefreshToken(originalRequest, baseURL, httpClient);
      }
      if (typeof window !== "undefined") {
        if (status === 403) {
          window.dispatchEvent(new CustomEvent("forbidden", { detail: error.response?.data }));
        } else if (status === 422 || status === 400) {
          window.dispatchEvent(new CustomEvent("validation-error", { detail: error.response?.data }));
        } else if (status && status >= 500) {
          window.dispatchEvent(new CustomEvent("server-error", { detail: error.response?.data }));
        }
      }
    }
    return Promise.reject(error);
  }
);

export default httpClient;
