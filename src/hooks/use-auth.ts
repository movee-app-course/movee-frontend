import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { endpoints } from "@/lib/api/endpoints";
import { useAuthStore } from "@/stores/auth-store";
import type { AuthUser } from "@/types";

interface AuthResponse {
  user: AuthUser;
  token: string;
  error?: string;
}

export function useLoginMutation() {
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: Record<string, string>) => {
      const { data } = await apiClient.post<AuthResponse>(endpoints.auth.login, credentials);
      return data;
    },
    onSuccess: (data) => {
      setUser(data.user, data.token);
      // Invalidate queries that depend on auth state, like feed
      queryClient.invalidateQueries();
    },
  });
}

export function useRegisterMutation() {
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: Record<string, string>) => {
      const { data } = await apiClient.post<AuthResponse>(endpoints.auth.register, userData);
      return data;
    },
    onSuccess: (data) => {
      setUser(data.user, data.token);
      queryClient.invalidateQueries();
    },
  });
}

export function useLogoutMutation() {
  const logout = useAuthStore((state) => state.logout);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await apiClient.post(endpoints.auth.logout);
    },
    onSuccess: () => {
      logout();
      // Clear queries on logout so user specific data is wiped from cache
      queryClient.clear();
    },
  });
}
