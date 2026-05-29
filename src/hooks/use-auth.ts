import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { endpoints } from "@/lib/api/endpoints";
import { useAuthStore } from "@/stores/auth-store";
import type { AuthUser, LoginPayload, RegisterPayload } from "@/types";

interface AuthResponse {
  user: AuthUser;
  token: string;
  error?: string;
}

export function useLoginMutation() {
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials: LoginPayload) => {
      const { data } = await apiClient.post<AuthResponse>(endpoints.auth.login, credentials);
      return data;
    },
    onSuccess: (data) => {
      setUser(data.user, data.token);
      // Invalidate only auth-dependent queries, not public data (movies, search)
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

export function useRegisterMutation() {
  const setUser = useAuthStore((state) => state.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: RegisterPayload) => {
      const { data } = await apiClient.post<AuthResponse>(endpoints.auth.register, userData);
      return data;
    },
    onSuccess: (data) => {
      setUser(data.user, data.token);
      // Invalidate only auth-dependent queries, not public data (movies, search)
      queryClient.invalidateQueries({ queryKey: ['feed'] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
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
