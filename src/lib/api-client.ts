import axios from "axios";
import { useAuthStore } from "@/stores/auth-store";

const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// ──── Request interceptor ─────────────────────────────────────
// Inject Bearer Token from Zustand auth store
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ──── Response interceptor ────────────────────────────────────
// Unwrap the data envelope so callers get the payload directly.
// On 401 the auth store will be cleared by the AuthProvider.
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Re-throw so React Query / caller can handle it
    return Promise.reject(error);
  }
);

export default apiClient;
